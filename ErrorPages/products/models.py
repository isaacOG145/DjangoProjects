from django.db import models

class Producto(models.Model):
    
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    stock = models.IntegerField()
    categoria = models.CharField(max_length=20)
    descripcion = models.TextField(blank=True, null=True)

    def vender():
        pass

    def reabastecer():
        pass

