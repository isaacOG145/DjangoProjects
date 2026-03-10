from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):

    foto_para_binario = serializers.ImageField(write_only=True, required=False)
    foto_base64_display = serializers.ReadOnlyField(source='foto_base64')

    class Meta:
        model = Producto
        fields = '__all__'

    field = [
        'id', 'nombre', 'precio', 'stock', 'categoria', 'descripcion',
        'foto', 'foto_para_binario', 'foto_base64_display'
    ]

    def create (self, validated_data):

        archivo_binario = validated_data.pop('foto_para_binario', None)

        producto = Producto.objects.create(**validated_data)

        if archivo_binario: producto.foto_binaria = archivo_binario.read()
        producto.save()
    
        return producto