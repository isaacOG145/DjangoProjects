from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(
        max_length=70,
        default=""
    )
    apellidos = models.CharField(
        max_length=70
    )
    edad = models.IntegerField()
    email = models.EmailField()
    sexo = models.BinaryField()
    tel = models.CharField(
        max_length=12,
        default=""
    )

class Contacto (models.Model):
    nombre = models.CharField(
        max_length=70,
        default=""
    )
    email = models.EmailField()
    mensaje = models.TextField()

