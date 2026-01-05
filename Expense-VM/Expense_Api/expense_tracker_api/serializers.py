from rest_framework import serializers
from django.db.models import Sum
from .models import User
from .models import Category, Expense, Income, Budget, Analysis, UserProfile
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'limit']
        read_only_fields = ['user']
    
    def validate(self, attrs):
        user = self.context['request'].user
        limit = attrs.get('limit')
        
        if limit:
            # Get total income
            total_income = Income.objects.filter(user=user).aggregate(
                total=Sum('amount')
            )['total'] or 0
            
            # Get existing category limits (excluding current instance if updating)
            existing_limits = Category.objects.filter(user=user)
            if self.instance:
                existing_limits = existing_limits.exclude(id=self.instance.id)
            
            total_existing_limits = existing_limits.aggregate(
                total=Sum('limit')
            )['total'] or 0
            
            available_income = total_income - total_existing_limits
            
            if limit > available_income:
                raise serializers.ValidationError(
                    f"Limit cannot exceed available income. Available: ${available_income}"
                )
        
        return attrs
    
class ExpenseSerializer(serializers.ModelSerializer):
    category_color = serializers.CharField(source='category.color', read_only=True)
    category_name = serializers.CharField(write_only=True, required=True)
    category = CategorySerializer(read_only=True)
    category_limit = serializers.DecimalField(source='category.limit', max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Expense
        fields = ['id', 'amount', 'description', 'date', 'category', 'category_name', 'category_limit', 'category_color']
        read_only_fields = ['user' ]
        # this allows to add required fields
        extra_kwargs = {
        'amount': {'required': True},
        'description': {'required': True},
        'date': {'required': True},
        'category_name': {'required': True}}
    

    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        category_limit = validated_data.pop('category_limit', None)
        category_color = validated_data.pop('category_color', None)
        user = self.context['request'].user
        #if category exists, get it; else create it
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name, 
                limit=category_limit,
                color=category_color,
                user=user,
                defaults={'user': user}
            )
            validated_data['category'] = category
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        user = self.context['request'].user
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name,
                user=user,
                defaults={'user': user}
            )
            validated_data['category'] = category
        return super().update(instance, validated_data)

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ['id', 'amount', 'source', 'date']
        read_only_fields = ['user']


class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True, required=True)
    # category = CategorySerializer(read_only=True)
  
    class Meta:
        model = Budget
        category_name = serializers.CharField(write_only=True, required=True)
        # income_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
        fields = ['id', 'total_amount', 'start_date', 'end_date', 'category_name']
        read_only_fields = ['user']

    def validate(self, data):
        user = self.context['request'].user
        if not Income.objects.filter(user=user).exists():
            raise serializers.ValidationError("Budget can only be created when income records exist.")
        return data

    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        user = self.context['request'].user
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name,
                user=user,
                defaults={'user': user}
            )
            validated_data['category'] = category
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        category_name = validated_data.pop('category_name', None)
        user = self.context['request'].user
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name,
                user=user,
                defaults={'user': user}
            )
            validated_data['category'] = category
        return super().update(instance, validated_data)

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = '__all__'