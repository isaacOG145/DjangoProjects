from django.shortcuts import render
from core import alumno
from core.forms import ContactoForm

def index(request):
    return render(request, 'core/index.html')

def onePage(request):
    return render(request, 'core/onePage.html')

def cvIsaacO(request):
    return render(request, 'core/isaac_og.html')

def nuevo(request): 
    std = alumno("Pablo", "Perez", 22)
    return render(request, 'core/nuevo.html', {"alumno": std})

from django.http import JsonResponse

def contacto_view(request):
    if request.method == 'POST':
        form = ContactoForm(request.POST)
        if form.is_valid():
            
            form.save()

            return JsonResponse({
                'status': 'ok',
                'mensaje': 'Registro exitoso!'
            })
        else:
            return JsonResponse({
                'status': 'error',
                'error': form.errors
            })
            #return render(request, 'core/formulario.html', {'form': form, 'success': True})
    else:
        form = ContactoForm()
    
    return render(request, 'core/formulario.html', {'form': form})