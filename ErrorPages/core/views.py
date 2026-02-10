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

def contacto_view(request):
    if request.method == 'POST':
        form = ContactoForm(request.POST)
        if form.is_valid():
            # Los datos ya pasaron las validaciones de front y back
            nombre = form.cleaned_data['nombre']
            email = form.cleaned_data['email']
            mensaje = form.cleaned_data['mensaje']
            
            print(f"Nombre: {nombre}\nEmail: {email}\nMensaje: {mensaje}")
            
            return render(request, 'core/formulario.html', {'form': form, 'success': True})
    else:
        form = ContactoForm()
    
    return render(request, 'core/formulario.html', {'form': form})