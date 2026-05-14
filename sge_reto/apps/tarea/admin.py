from django.contrib import admin

from apps.tarea.models import Dependencia, Tarea

# Register your models here.
admin.site.register(Tarea)
admin.site.register(Dependencia)
