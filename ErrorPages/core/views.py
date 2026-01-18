from django.shortcuts import render

def index(request):
    return render(request, 'core/index.html')

def onePage(request):
    return render(request, 'core/onePage.html')