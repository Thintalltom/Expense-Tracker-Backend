from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from ..serializers import CategorySerializer
from ..models import Category

@swagger_auto_schema(
    method='get',
    security=[{'Bearer': []}],
    responses={200: CategorySerializer(many=True)}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_Categorys(request):
    categories = Category.objects.filter(user=request.user)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(
    method='post', 
    request_body=CategorySerializer,
    security=[{'Bearer': []}],
    responses={201: CategorySerializer}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Category(request):
    serializer = CategorySerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    methods=['put', 'patch'],
    request_body=CategorySerializer,
    security=[{'Bearer': []}]
)
@swagger_auto_schema(
    methods=['get', 'delete'],
    security=[{'Bearer': []}]
)
@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk, user=request.user)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = CategorySerializer(category, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)