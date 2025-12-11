from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view  
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.
from .serializers import CategorySerializer, ExpenseSerializer, BudgetSerializer, IncomeSerializer
from .models import Category, Expense, Budget, Income

@api_view(['GET'])
def get_Categorys(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=CategorySerializer)
@api_view(['POST'])
def create_Category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    methods=['put', 'patch'],
    request_body=CategorySerializer
)
@swagger_auto_schema(
    methods=['get', 'delete']
)
@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def get_Expenses(request):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=ExpenseSerializer)
@api_view(['POST'])
def create_Expense(request):
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    methods=['put', 'patch'],
    request_body=ExpenseSerializer
)
@swagger_auto_schema(
    methods=['get', 'delete']
)

@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
def expense_detail(request, pk):
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = ExpenseSerializer(expense, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('start_date', openapi.IN_QUERY, description="Filter by start date (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('end_date', openapi.IN_QUERY, description="Filter by end date (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
    ]
)
@api_view(['GET'])
def get_Budgets(request):
    budgets = Budget.objects.all()
    
    # Filter by start_date if provided
    start_date = request.query_params.get('start_date')
    if start_date:
        budgets = budgets.filter(start_date__gte=start_date)
    
    # Filter by end_date if provided
    end_date = request.query_params.get('end_date')
    if end_date:
        budgets = budgets.filter(end_date__lte=end_date)
    
    serializer = BudgetSerializer(budgets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=BudgetSerializer)
@api_view(['POST'])
def create_Budget(request):
    serializer = BudgetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@swagger_auto_schema(method='post', request_body=IncomeSerializer)
@api_view(['POST'])
def create_Income(request):
    serializer = IncomeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_Incomes(request):
    incomes = Income.objects.all()
    serializer = IncomeSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
