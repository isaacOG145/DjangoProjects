from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import RegistroSerializer 

User = get_user_model()

class RegistroView(generics.CreateAPIView):

    queryset = User.objects.all()
    
    permission_classes = (AllowAny,)
    
    serializer_class = RegistroSerializer