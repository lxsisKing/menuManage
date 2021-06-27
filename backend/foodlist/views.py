from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from .models import FoodClass, Foods, HistoryMenu
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.conf import settings
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import functools

import json


from .func import func_list


serializer = Serializer(settings.SECRET_KEY, expires_in=10)




# Create your views here.



def authorization(func):
    @functools.wraps(func)
    def warpper(request, *args, **kwargs):
        try:
            token = request.headers['Authorization']
            serializer.loads(token)
            return func(request, *args, *kwargs)
        except:
            data = dict(
                code=401,
                message="未登录"
            )
            return JsonResponse(data)
    return warpper
        


def analysis_request_body(request_body):
    """
    将POST请求数据转换为字典
    """
    request_body_json = json.loads(request_body)
    return request_body_json


@require_http_methods(['POST'])
def ver(request):
    """
    登录接口
    """
    data = analysis_request_body(request.body)
    username = func_list.decrypt(data['username'])
    password = func_list.decrypt(data['password'])
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        login(request, user)
        token = serializer.dumps(username).decode()
        data = dict(
            code=200,
            message="登录成功",
            token=token
        )
        return JsonResponse(data)
    else:
        data = dict(
            code=403,
            message="账号或密码错误"
        )
        return JsonResponse(data)
    

@require_http_methods(['GET'])
@authorization
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
@authorization
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
@authorization
def get_history_menu(request):
    """
    请求历史菜单接口
    """
    data = analysis_request_body(request.body)
    selected_date = data['date']
    # menu = HistoryMenu.objects.filter(save_date=selected_date).values()[0]
    try:
        menu = HistoryMenu.objects.get(save_date=selected_date)
        menu_info = menu.menu_info
        res = dict(
            code=200,
            data=menu_info
        )
        return JsonResponse(res)
    except Exception as e:
        res = dict(
            code=404,
            data=[],
            message="{}没有菜单数据".format(selected_date)
        )
        return JsonResponse(res)


@require_http_methods(['POST'])
@authorization
def save_menu(request):
    """
    保存菜单接口
    """
    data = analysis_request_body(request.body)
    selected_date = data['date']
    content = json.loads(data['content'])
    try:
        today_menu = HistoryMenu.objects.get(save_date=selected_date)
        today_menu.menu_info = content
        today_menu.save()
    except Exception as e: 
        today_menu = HistoryMenu()
        today_menu.save_date = selected_date
        today_menu.menu_info = content
        today_menu.save()
    res = dict(
        code=200
    )
    return JsonResponse(res)

@require_http_methods(['POST'])
@authorization
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
    file_info = func_list.export_excel_file(selected_date, menu_dict)
    file_data = file_info['data']
    filename = file_info['filename']
    response = FileResponse(file_data, as_attachment=True, filename=filename)
    response['Access-Control-Expose-Headers'] = 'Content-Disposition'
    return response