from rest_framework import serializers
from .models import User
from .models import Category, Expense, Income, Budget, Analysis, UserProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True, required=False)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'description', 'date', 'category', 'category_name']
    
    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        if category_name:
            category, created = Category.objects.get_or_create(name=category_name)
            validated_data['category'] = category
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        if category_name:
            category, created = Category.objects.get_or_create(name=category_name)
            validated_data['category'] = category
        return super().update(instance, validated_data)

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = '__all__'