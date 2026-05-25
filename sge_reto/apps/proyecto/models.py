from django.db import models

"""
- Proyecto
• Código de proyecto
• Nombre
• Descripción
• Fecha de inicio
• Fecha fin prevista
• Estado
• Responsable principal
"""


# Create your models here.
class Proyecto(models.Model):
    nombre = models.CharField(max_length=200, null=False, blank=False)
    descripcion = models.TextField(null=False, default="")
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin_prevista = models.DateField(null=True, blank=True)
    estado = models.IntegerField(null=False, default=0)
    responsable_principal = models.ForeignKey(
        "empleado.Empleado",
        related_name="proyectos_asignados",  # empleado.proyectos_asignados.all()
        on_delete=models.PROTECT,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.nombre
