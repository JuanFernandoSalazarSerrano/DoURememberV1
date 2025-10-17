from django.urls import path
from . import views  # assumes your api_view_example is in views.py

urlpatterns = [
    path('api/ai/v1', views.api_view_example)
]
