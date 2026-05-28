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
    titulo = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(null=False, default="")
    estado = models.IntegerField(null=False, default=0)
    prioridad = models.CharField(
        max_length=10,
        choices=(
            ("baja", "Baja"),
            ("media", "Media"),
            ("alta", "Alta"),
        ),
        null=False,
    )
    fecha_inicio = models.DateField(null=True, blank=True)  # null para db, blank para forms
    fecha_fin_prevista = models.DateField(null=True, blank=True)  # null para db, blank para forms
    proyecto_asociado = models.ForeignKey(
        "proyecto.Proyecto",
        related_name="tareas_asociadas",  # proyecto.tareas_asociadas.all()
        on_delete=models.PROTECT,
        null=False,
        blank=False,
    )
    responsable_asignado = models.ForeignKey(
        "empleado.Empleado",
        related_name="tareas_asignadas",  # empleado.tareas_asignadas.all()
        on_delete=models.PROTECT,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.titulo


class Dependencia(models.Model):
    tarea_origen = models.ForeignKey(
        Tarea,
        related_name='deps_antecesoras',  # tarea.deps_antecesoras.all()
        on_delete=models.PROTECT
    )
    tarea_dependiente = models.ForeignKey(
        Tarea,
        related_name='deps_sucesoras',  # tarea.deps_sucesoras.all()
        on_delete=models.PROTECT
    )
    tipo_dependencia = models.CharField(
        max_length=50,
        choices=(
            ("FIN_INI", "Fin → Inicio"),
            ("INI_INI", "Inicio → Inicio"),
            ("FIN_FIN", "Fin → Fin"),
        ),
        null=False,
    )

    class Meta:
        constraints = [models.UniqueConstraint(
            fields=["tarea_origen", "tarea_dependiente", "tipo_dependencia"],
            name="no_duplicados",
        )]

    def __str__(self):
        return f"{self.tarea_origen} -> {self.tarea_dependiente} ({self.tipo_dependencia})"
