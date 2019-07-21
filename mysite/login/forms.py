from django import forms
from captcha.fields import CaptchaField

#verify
class UserForm(forms.Form):
    username = forms.CharField(label='用戶名', max_length=128, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label='密碼', max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    captcha = CaptchaField(label='驗證碼')

class RegisterForm(forms.Form):
    gender = (
        ('male','男'),
        ('female','女'),
    )
    username = forms.CharField(label='用戶名', max_length=128, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password1 = forms.CharField(label='密碼', max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(label='密碼', max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label='郵箱', widget = forms.EmailInput(attrs={'class': 'form-control'}))
    sex = forms.ChoiceField(label='性別', choices = gender)
    captcha = CaptchaField(label='驗證碼')