from django.db import models

"""
- Tarea
• Código de tarea
• Título
• Descripción
• Estado
• Prioridad
• Fecha de inicio
• Fecha fin prevista
• Proyecto asociado
• Responsable asignado
"""
"""
- Dependencia
• Código de dependencia
• Tarea origen
• Tarea dependiente
• Tipo de dependencia
"""


# Create your models here.
class Tarea(models.Model):
    titulo = models.CharField(max_length=100)

    def __str__(self):
        return self.titulo
