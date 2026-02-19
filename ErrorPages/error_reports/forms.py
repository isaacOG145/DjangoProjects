from django import forms
from .models import ErrorReport

class ErrorReportForm(forms.ModelForm):

    class Meta:
        model = ErrorReport
        exclude = ['fecha_reporte', 'activo']
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'tipo_error': forms.TextInput(attrs={'class': 'form-control'}),
            'url': forms.URLInput(attrs={'class': 'form-control'}),
            'metodo_http': forms.TextInput(attrs={'class': 'form-control'}),
            'ip_cliente': forms.TextInput(attrs={'class': 'form-control'}),
        }
