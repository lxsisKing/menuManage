from django.shortcuts import render
from django.http import JsonResponse
from .models import FoodClass, Foods, HistoryMenu
from django.views.decorators.http import require_http_methods
from datetime import datetime

import json


from .func import func_list




# Create your views here.


def analysis_request_body(request_body):
    """
    将POST请求数据转换为字典
    """
    request_body_json = json.loads(request_body)
    return request_body_json

@require_http_methods(['GET'])
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

@require_http_methods(['POST'])
def get_history_menu(request):
    """
    请求历史菜单接口
    """
    pass


@require_http_methods(['POST'])
def save_menu(request):
    """
    保存菜单接口
    """
    data = analysis_request_body(request.body)
    content = json.loads(data['content'])
    now_date = datetime.now().strftime("%Y-%m-%d")
    try:
        today_menu = HistoryMenu.objects.get(save_date=now_date)
        today_menu.menu_info = content
        today_menu.save()
    except Exception as e: 
        today_menu = HistoryMenu()
        today_menu.save_date = now_date
        today_menu.menu_info = content
        today_menu.save()
    res = dict(
        code=200
    )
    return JsonResponse(res)

@require_http_methods(['POST'])
def export_menu(request):
    """
    导出菜单
    """
    data = analysis_request_body(request.body)
    selected_date = data['date']
    menu = HistoryMenu.objects.filter(save_date=selected_date).values()[0]
    menu_info = menu['menu_info']
    menu_dict = dict()
    for one in menu_info:
        class_id = one['classId']
        class_name = FoodClass.objects.get(id=class_id).food_class_name
        this_class = menu_dict.setdefault(class_name, [])
        this_class.append("{}({}元)".format(one['name'], one['price']))
    func_list.export_excel_file(menu_dict)
    return JsonResponse(dict(
        code=200
    ))
    