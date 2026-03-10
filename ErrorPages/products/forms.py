from django import forms
from .models import Producto


class ProductForm(forms.ModelForm):

    picture_for_db = forms.ImageField(
        required=False,
        label='Sube la foto de la base de datos a binario',
        widget=forms.ClearableFileInput(attrs={'class': 'form-control'})
    )

    class Meta: 

        model = Producto

        fields = ['nombre', 'precio', 'stock', 'categoria', 'descripcion', 'foto']

        labels = {
            #Etiquetaas personalizadas
        }

        widgets = {
            #Estilos
        }

        
        def save(self, commit=True):
            instacia = super().save(commit=False)

            archivo_db = self.cleaned_data.get('picture_for_db')

            if archivo_db:
                instacia.foto_binaria = archivo_db.read()
            
            if commit:
                instacia.save()

            return instacia

