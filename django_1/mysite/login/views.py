from django.shortcuts import render
from django.shortcuts import redirect
from . import models
from . import forms
# Create your views here.

def index(request):
    pass
    return render(request, 'login/index.html')

def login(request):
    if request.method =='POST':
        login_form = forms.UserForms(request.POST)
        ##username = request.POST.get('username', None) #get 'name'
        ##password = request.POST.get('password', None)
        message = '所有的字段都必須填寫!'
        #if username and password:
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')
            # .... verify the input(could be any way)
            #check if the username is registered(in database)
            try:
                user = models.User.objects.get(name=username)
            #if not, need to login again
            except:
                message = "User doesn't exist!"
                return render(request, 'login/login.html', locals())
            #check if the password is right
            if user.password == password:    
                return redirect('/index/')
            else:
                message = 'Wrong password!'
                return render(request, 'login/login.html', locals()) 
                #locals() - return the local variable such as message,=={'message':message}
        else:
            return render(request, 'login/login.html', locals())
     #successfully login
    login_form = forms.UserForms()
    return render(request, 'login/login.html', locals())

def register(request):
    pass
    return render(request, 'login/register.html')

def logout(request):
    pass
    return redirect('/index/')