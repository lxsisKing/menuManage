from django.db import models

# Create your models here.


class FoodClass(models.Model):
    food_class_name = models.CharField(max_length=50, db_index=True, verbose_name='菜品分类名称')
    add_time = models.DateTimeField(verbose_name='添加时间')
    
    def __str__(self) -> str:
        return self.food_class_name
    
    class Meta:
        ordering = ['-add_time']
        db_table = 'FoodClass'
        verbose_name = '菜品分类'
        verbose_name_plural = '菜品分类'


class Foods(models.Model):
    food_class = models.ForeignKey('FoodClass', on_delete=models.CASCADE, related_query_name='f', verbose_name='菜品所属分类ID', )
    food_name = models.CharField(max_length=30, db_index=True, verbose_name='菜品名称')
    food_price = models.IntegerField(db_index=True, verbose_name='菜品价格')
    add_time = models.DateTimeField(verbose_name='添加时间')
    
    def __str__(self) -> str:
        return self.food_name
    
    class Meta:
        ordering = ['food_price']
        db_table = 'Food'
        verbose_name = '菜品'
        verbose_name_plural = '菜品'
        
        
class HistoryMenu(models.Model):
    save_date = models.DateField(db_index=True, verbose_name='菜单日期')
    menu_info = models.JSONField(verbose_name='菜单信息')
    
    def __str__(self) -> str:
        return self.save_date
    
    class Meta:
        ordering = ['-save_date']
        db_table = 'HistoryMenu'
        verbose_name = '历史菜单'
        verbose_name_plural = '历史菜单'