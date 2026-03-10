import base64
from django.db import models

class Producto(models.Model):
    
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    stock = models.IntegerField()
    categoria = models.CharField(max_length=20)
    descripcion = models.TextField(blank=True, null=True)
    foto = models.ImageField(upload_to='products/', blank=True, null=True)
    foto_binaria = models.BinaryField(blank=True, null=True)

    @property
    def foto_base64(self):
        if self.foto_binaria:

            codificado = base64.b64encode(self.foto_binaria).decode('utf-8')
            return f"data:image/jpeg;base64,{codificado}"
        
        return None

    def vender():
        pass

    def reabastecer():
        pass

