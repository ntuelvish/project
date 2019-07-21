import os
from django.core.mail import send_mail
os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'

if __name__ == '__main__':

    send_mail(
        'Test mail from Elvish ',
        'Welcome to visit ''. This is my site!',
        'akuelvish7@gmail.com',
        ['lucky503260@gmail.com'],
    )