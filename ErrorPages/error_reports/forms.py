from django import forms
from .models import ErrorReport

class ErrorReportForm(forms.ModelForm):

    class Meta:
        model = ErrorReport
        exclude = ['fecha_reporte', 'activo']
