from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Producto


# 1. LISTAR (GET)
def api_lista_productos(request):
    mascotas = Producto.objects.all().values()
    return JsonResponse(list(mascotas), safe=False)

# 2. CREAR (POST)
@csrf_exempt
def api_crear_productos(request):
    if request.method == 'POST':
        
        nombre = request.POST.get('nombre')
        precio = request.POST.get('precio')
        stock = request.POST.get('stock')
        categoria = request.POST.get('categoria')
        descripcion = request.POST.get('descripcion')
        
        producto = Producto.objects.create(nombre=nombre, precio=precio, stock=stock, categoria=categoria,descripcion=descripcion)
        return JsonResponse({
            'mensaje': 'producto creado',
            'id': producto.id
        }, status=201)
    
# 3. ACTUALIZAR (PUT/POST)
@csrf_exempt
def api_editar_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == 'PUT':
        producto.nombre = request.PUT.get('nombre', producto.nombre)
        producto.precio = request.PUT.get('precio', producto.precio)
        producto.stock = request.PUT.get('stock', producto.stock)
        producto.categoria = request.PUT.get('categoria', producto.categoria)
        producto.descripcion = request.PUT.get('descripcion', producto.descripcion)
        producto.save()
        return JsonResponse({'mensaje': 'Producto actualizado'})

# 4. ELIMINAR (DELETE)
@csrf_exempt
def api_eliminar_producto(request, pk):
    if request.method == 'DELETE':
        producto = get_object_or_404(Producto, pk=pk)
        producto.delete()
        return JsonResponse({'mensaje': 'Producto eliminado'}, status=204)
