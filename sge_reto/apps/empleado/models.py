from django.db import models

"""
- Empleado
• DNI
• Nombre
• Apellidos
• Email
• Teléfono
• Rol
"""


# Create your models here.
class Empleado(models.Model):
    dni = models.CharField(max_length=9, unique=True)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)
    rol = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"
