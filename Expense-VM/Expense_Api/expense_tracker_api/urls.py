from django.urls import path 
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Expense Tracker API",
      default_version='v1',
      description="Expense Tracker API Documentation",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('categories/', views.get_Categorys, name='get_categories'),
    path('categories/create/', views.create_Category, name='create_category'),
    path('categories/<int:pk>/', views.category_detail, name='category_detail'),
    path('expenses/', views.get_Expenses, name='get_expenses'),
    path('expenses/create/', views.create_Expense, name='create_expense'),
    path('expenses/<int:pk>/', views.expense_detail, name='expense_detail'),
    path('budgets/', views.get_Budgets, name='get_budgets'),
    path('budgets/create/', views.create_Budget, name='create_budget'),
    # path('analysis/', views.get_Analysis, name='get_analysis'),
    # path('analysis/create/', views.create_Analysis, name='create_analysis'),
    # path('analysis/<int:pk>/', views.analysis_detail, name='analysis_detail'),
]