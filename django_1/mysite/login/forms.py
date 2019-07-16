from django import forms
from captcha.fields import CaptchaField

#verify
class UserForms(forms.Form):
    username = forms.CharField(label='用戶名', max_length=128, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label='密碼', max_length=256, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    captcha = CaptchaField(label='驗證碼')