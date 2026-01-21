"""
"""
from django.contrib import admin
from django.urls import path
from core import views as core

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core.index, name='index'),
    path('onePage/', core.onePage, name='onePage'),
    path('cvIsaacO/', core.cvIsaacO, name="cvIsaacO")
]