from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..serializers import IncomeSerializer
from ..models import Income

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_Incomes(request):
    incomes = Income.objects.filter(user=request.user)
    serializer = IncomeSerializer(incomes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=IncomeSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Income(request):
    serializer = IncomeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)