from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.db.models import Sum
from datetime import date
from ..serializers import BudgetSerializer
from ..models import Budget, Expense

def check_budget_limit(user):
    """Check if current expenses exceed any active budgets"""
    today = date.today()
    active_budgets = Budget.objects.filter(user=user, start_date__lte=today, end_date__gte=today)
    
    notifications = []
    
    for budget in active_budgets:
        total_expenses = Expense.objects.filter(
            user=user,
            date__gte=budget.start_date,
            date__lte=budget.end_date
        ).aggregate(total=Sum('amount'))['total'] or 0
        
        if total_expenses > budget.total_amount:
            notifications.append({
                "type": "budget_exceeded",
                "message": f"Budget exceeded! Spent {total_expenses}, Budget: {budget.total_amount}",
                "budget_id": budget.id,
                "total_expenses": float(total_expenses),
                "budget_amount": float(budget.total_amount),
                "overspent": float(total_expenses - budget.total_amount)
            })
        elif total_expenses > (budget.total_amount * 0.8):
            notifications.append({
                "type": "budget_warning",
                "message": f"Budget warning! Spent {total_expenses}, Budget: {budget.total_amount} (80% reached)",
                "budget_id": budget.id,
                "total_expenses": float(total_expenses),
                "budget_amount": float(budget.total_amount)
            })
    
    return notifications

@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('start_date', openapi.IN_QUERY, description="Filter by start date (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('end_date', openapi.IN_QUERY, description="Filter by end date (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
    ]
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_Budgets(request):
    budgets = Budget.objects.filter(user=request.user)
    
    start_date = request.query_params.get('start_date')
    if start_date:
        budgets = budgets.filter(start_date__gte=start_date)
    
    end_date = request.query_params.get('end_date')
    if end_date:
        budgets = budgets.filter(end_date__lte=end_date)
    
    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=BudgetSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Budget(request):
    serializer = BudgetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_budget_status(request):
    """Endpoint to check current budget status and get notifications"""
    notifications = check_budget_limit(request.user)
    
    return Response({
        "status": "success",
        "notifications": notifications,
        "total_notifications": len(notifications)
    }, status=status.HTTP_200_OK)