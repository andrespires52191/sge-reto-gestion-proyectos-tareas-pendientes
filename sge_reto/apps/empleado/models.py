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
    dni = models.CharField(max_length=9, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellidos = models.CharField(max_length=200, null=False, blank=False)
    email = models.EmailField(unique=True, null=False, blank=False)
    telefono = models.CharField(max_length=20, null=False, blank=False)
    rol = models.CharField(max_length=50, null=False, blank=False)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"
