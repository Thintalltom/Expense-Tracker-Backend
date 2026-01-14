from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..serializers import   IncomeCategorySerializer
from ..models import  IncomeCategory

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_IncomeCategories(request):
    income_categories = IncomeCategory.objects.filter(user=request.user)
    serializer = IncomeCategorySerializer(income_categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@swagger_auto_schema(
    request_body=IncomeCategorySerializer,
    operation_description="Create a new income category",
    responses={201: IncomeCategorySerializer}
)
def create_IncomeCategory(request):
    serializer = IncomeCategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)