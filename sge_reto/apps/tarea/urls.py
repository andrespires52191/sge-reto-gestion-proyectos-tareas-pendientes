from django.urls import path
from . import views

app_name = 'tarea'

urlpatterns = [
    path('', views.tarea, name='tarea'),
    path('crear/', views.crear_tarea, name='crear_tarea'),
    path('mostrar/<int:id>/', views.mostrar_tarea, name='mostrar_tarea'),
    path('editar/<int:id>/', views.editar_tarea, name='editar_tarea'),
    path('borrar/<int:id>/', views.borrar_tarea, name='borrar_tarea'),
]
