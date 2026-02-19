from django.shortcuts import render
from django.http import JsonResponse
from .forms import ErrorReportForm
from .models import ErrorReport


def reportes(request):

    if request.method == "GET":
        form = ErrorReportForm()
        return render(request, "reporte_error.html", {"form": form})

    if request.method == "POST":
        form = ErrorReportForm(request.POST)

        if form.is_valid():
            form.save()
            return JsonResponse({
                "status": "ok",
                "mensaje": "registro exitoso"
            })

        else:
            return JsonResponse({
                "status": "error",
                "mensaje": "algo salio mal",
                "errors": form.errors
            }, status=400)


def obtener_reportes(request):

    return render(request, "Obtener_reportes.html")
