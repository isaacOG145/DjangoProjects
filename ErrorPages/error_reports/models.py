from django.db import models

class ErrorReport(models.Model):

    titulo = models.CharField(
    max_length=150,
    blank=False,
    null=False
    )
    descripcion = models.TextField(
        blank=False,
        null=False
    )
    tipo_error = models.CharField(
        max_length=10,
        blank=False,
        null=False
    )
    url = models.URLField(
        blank=False,
        null=False
    )
    metodo_http = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    ip_cliente = models.GenericIPAddressField(
        blank=True,
        null=True
    )
    fecha_reporte = models.DateTimeField(
        auto_now_add=True
    )
    activo = models.BooleanField(
        default=True
    )


