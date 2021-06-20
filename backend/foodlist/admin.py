from django.contrib import admin
from .models import FoodClass, Foods, HistoryMenu

# Register your models here.

admin.site.register(FoodClass)
admin.site.register(Foods)
admin.site.register(HistoryMenu)
