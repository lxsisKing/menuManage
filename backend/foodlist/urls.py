from django.urls import path
from . import views

urlpatterns = [
    path('class', views.get_foot_class),
    path('foods', views.get_food)
]