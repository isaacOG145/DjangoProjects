from django.contrib import admin
from django.urls import path, include
from core import views as core
from error_reports import views as errors

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core.index, name='index'),
    path('onePage/', core.onePage, name='onePage'),
    path('cvIsaacO/', core.cvIsaacO, name="cvIsaacO"),
    path('formulario/', core.contacto_view, name='formulario'),
    path('reportes-error/', errors.reportes, name='errores' ),
    path('obtener-reportes/', errors.obtener_reportes, name='obtener_reportes'),
    path('', include('products.urls')),
]