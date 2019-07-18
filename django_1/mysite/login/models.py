from django.db import models

# Create your models here.

class User(models.Model):
    gender = (
        ('male','男'),
        ('female','女'),
    )
    name = models.CharField(max_length=128, unique=True, verbose_name='用戶名')
    #consider saving, need to set a larger max_length
    password = models.CharField(max_length=256, verbose_name='密碼')
    email = models.EmailField(unique=True, verbose_name='郵箱')
    sex = models.CharField(choices=gender, max_length=32, default='男', verbose_name='性別')
    c_time = models.DateTimeField(auto_now_add=True, verbose_name='創建時間')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-c_time'] #'-':inverse order
        verbose_name = '用戶'
        verbose_name_plural = '用戶'

class ConfirmString(models.Model):
    code = models.CharField(max_length=256, verbose_name='註冊碼')
    user = models.OneToOneField('User', verbose_name='關聯的用戶')
    c_time = models.DateTimeField(auto_now_add=True, verbose_name='創建時間')

    def __str__(self):
        return self.user.name + ": " + self.code
    
    class Meta:
        ordering = ['-c_time'] #'-':inverse order
        verbose_name = '確認碼'
        verbose_name_plural = '確認碼'