from django.urls import path
from . import views

urlpatterns = [
    path('class', views.get_foot_class),
    path('foods', views.get_food),
    path('save_menu', views.save_menu),
    path('export_menu', views.export_menu),
    path('get_history_menu', views.get_history_menu)
]