from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.description} - {self.amount}"
    
class Income(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    source = models.CharField(max_length=100)
    date = models.DateField()

    def __str__(self):
        return f"{self.source} - {self.amount}"

class Budget(models.Model):
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Budget from {self.start_date} to {self.end_date}: {self.total_amount}"
    

class Analysis(models.Model):
    month = models.CharField(max_length=20)
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2)
    total_income = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Analysis for {self.month}"