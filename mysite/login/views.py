from django.shortcuts import render
from django.shortcuts import redirect
from . import models
from . import forms
import datetime
from django.conf import settings
# Create your views here.

#encode password
import hashlib

def hash_code(s, salt='mysite'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()

def make_confirm_string(user):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    code = hash_code(user.name, now)
    models.ConfirmString.objects.create(code=code, user=user,)
    return code

def send_email(email, code):
    from django.core.mail import EmailMultiAlternatives

    subject = 'Confirm Email'
    text_content = '''Thank you for register the website!'''
    html_content = '''
                    <p>Thank you for register<a href="http://{}/confirm/?code={}" target=blank>www.github.com</a>，\
                    This is my site!</p>
                    <p>Please click the link to confirm!</p>
                    <p>The link is valid for {} days!</p>
                    '''.format('127.0.0.1:7000', code, settings.CONFIRM_DAYS)
    msg = EmailMultiAlternatives(subject, text_content, settings.EMAIL_HOST_USER, [email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()

def index(request):
    pass
    return render(request, 'login/index.html')

def login(request):
    #already login
    if request.session.get('is_login', None):
        return redirect('/index/')
    if request.method =='POST':
        login_form = forms.UserForm(request.POST)
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

            if not user.has_confirmed:
                message = 'User need to confirm！'
                return render(request, 'login/login.html', locals())

            #check if the password is right
            if user.password == hash_code(password):
                #set dictionary
                request.session['is_login'] = True
                request.session['user_id'] = user.id
                request.session['user_name'] = user.name
                return redirect('/index/')
            else:
                message = 'Wrong password!'
                return render(request, 'login/login.html', locals()) 
                #locals() - return the local variable such as message,=={'message':message}
        else:
            return render(request, 'login/login.html', locals())
     #successfully login
    login_form = forms.UserForm()
    return render(request, 'login/login.html', locals())

def register(request):
    if request.session.get('is_login', None):
        return redirect('/index/')

    if request.method =="POST":
        register_form = forms.RegisterForm(request.POST)
        message = 'Please check the content!'
        if register_form.is_valid():
            username = register_form.cleaned_data['username']
            password1 = register_form.cleaned_data['password1']
            password2 = register_form.cleaned_data['password2']
            email = register_form.cleaned_data['email']
            sex = register_form.cleaned_data['sex']

            if password1 != password2:
                message = 'Password2 is different form password1!'
                return render(request, 'login/register.html', locals())
            else:
                same_name_user = models.User.objects.filter(name=username)
                if same_name_user:
                    message = 'Username already exist!'
                    return render(request, 'login/register.html', locals())

                same_email_user =  models.User.objects.filter(email=email)
                if same_email_user:
                    message = 'Email already exist!'
                    return render(request, 'login/register.html', locals())
            #all pass, create new user
            new_user =  models.User.objects.create()
            new_user.name = username
            new_user.password = hash_code(password2)
            new_user.email = email
            new_user.sex = sex
            new_user.save()

            code = make_confirm_string(new_user)
            send_email(email, code)

            message = 'Please get the confirm email!'
            return render(request, 'login/confirm.html', locals())#redirect('/login/')

    register_form = forms.RegisterForm()
    return render(request, 'login/register.html', locals())

def logout(request):
    if not request.session.get('is_login', None):
        return redirect('/index/')
    request.session.flush() #clear/delete current session
    return redirect('/index/')

def user_confirm(request):
    code = request.GET.get('code', None)
    message = ''
    try:
        confirm = models.ConfirmString.objects.get(code=code)
    except:
        message = 'Invalid request!!'
        return render(request, 'login/confirm.html', locals())

    c_time = confirm.c_time
    now = datetime.datetime.now()
    if now > c_time + datetime.timedelta(settings.CONFIRM_DAYS):
        confirm.user.delete()
        message = 'Your mail is out of date!Confirm it again!'
        return render(request, 'login/confirm.html', locals())
    else:
        confirm.user.has_confirmed = True
        confirm.user.save()
        confirm.delete()
        message = 'Thank you for the confirm!Please login!'
        return render(request, 'login/confirm.html', locals())