from django.db import models
from django.contrib.auth.models import User
# Create your models here.

#model for User login
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    # Add other fields as needed

    def __str__(self):
        return self.user.username
    
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories', default=2)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=20, default='#3B82F6')  # Hex color code
    limit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.limit} - {self.color}"

class Expense(models.Model):
    #add this line to aknowledge user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses', default=1)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.description} - {self.amount}"
    
class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='incomes', default=1)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    source = models.CharField(max_length=100)
    date = models.DateField()
   

    def __str__(self):
        return f"{self.source} - {self.amount}"

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets', default=1)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Budget from {self.start_date} to {self.end_date}: {self.total_amount}"
    

class Analysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analyses', default=1)
    month = models.CharField(max_length=20)
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2)
    total_income = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Analysis for {self.month}"

class IncomeCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='income_categories', default=1)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name