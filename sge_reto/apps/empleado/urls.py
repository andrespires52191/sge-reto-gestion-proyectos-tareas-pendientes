from django.urls import path
from . import views

app_name = 'empleado'

urlpatterns = [
    path('', views.empleado, name='empleado'),
]
