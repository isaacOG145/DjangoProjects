from django import forms
from django.core.exceptions import ValidationError
from core.models import Contacto 

class ContactoForm(forms.ModelForm):

    class Meta:
        model = Contacto
        fields = ['nombre', 'email', 'mensaje']
    

    # Validación de Backend
    def clean_mensaje(self):
        data = self.cleaned_data['mensaje']
        if "spam" in data.lower():
            raise ValidationError("No se permite contenido publicitario.")
        return data
    
    def email(self):
        data = self.cleaned_data['email']
        if "@utez.edu.mx" not in data:
            raise ValidationError("Solo piuedes registrar correos de la utez")
        return data