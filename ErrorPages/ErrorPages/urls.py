"""
"""
from django.contrib import admin
from django.urls import path
from core import views as core
from error_reports import views as errors
from products import views as productos

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core.index, name='index'),
    path('onePage/', core.onePage, name='onePage'),
    path('cvIsaacO/', core.cvIsaacO, name="cvIsaacO"),
    path('formulario/', core.contacto_view, name='formulario'),
    path('reportes-error/', errors.reportes, name='errores' ),
    path('obtener-reportes/', errors.obtener_reportes, name='obtener_reportes'),
    path('obtener-producto/', productos.api_lista_productos, name='obtener_productos'),
    path('agregar-productos/', productos.api_crear_productos, name='crear_productos'),
    path('editar-productos/', productos.api_editar_producto, name="editar_producto"),
    path('eliminar-producto/', productos.api_eliminar_producto, name="eliminar_producto")
]