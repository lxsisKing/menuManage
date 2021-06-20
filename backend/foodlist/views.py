from django.shortcuts import render
from django.http import JsonResponse
from .models import FoodClass, Foods
from django.views.decorators.http import require_http_methods

import json

# Create your views here.


def analysis_request_body(request_body):
    """
    将POST请求数据转换为字典
    """
    request_body_json = json.loads(request_body)
    return request_body_json


def get_foot_class(request):
    """
    获取全部菜品分类
    """
    classes = FoodClass.objects.all()
    food_classes = list()
    for x in classes:
        info = dict(
            id=x.id,
            name=x.food_class_name,
            selected=False,
        )
        food_classes.append(info)
    data = dict(
        code=200,
        data=food_classes
    )
    return JsonResponse(data=data)

@require_http_methods(['POST'])
def get_food(request):
    """
    单类菜品数据请求接口
    """
    data = analysis_request_body(request.body)
    class_id = data['id']
    foods_info = Foods.objects.filter(food_class=class_id)
    foods = list()
    for x in foods_info:
        info = dict(
            id=x.id,
            name=x.food_name,
            price=x.food_price
        )
        foods.append(info)
    data = dict(
        code=200,
        data=foods
    )
    return JsonResponse(data=data)