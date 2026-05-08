from django.shortcuts import render

# Create your views here.
def proyecto(request):
    return render(request, 'proyecto/proyecto.html')
