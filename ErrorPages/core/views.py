from django.shortcuts import render

def index(request):
    print("el usuario entro al sistema")
    return render(request, 'core/index.html')