from django.shortcuts import render, redirect

from .models import Tarea


# Create your views here.
def tarea(request):
    tareas = Tarea.objects.all().order_by('id')
    return render(request, 'tarea/tarea.html', {'tareas': tareas})

def mostrar_tarea(request, id):
    tarea = Tarea.objects.get(id=id)
    return render(request, 'tarea/mostrar_tarea.html', {'tarea': tarea})

def crear_tarea(request):
    mensaje_error = None
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        if titulo:
            Tarea.objects.create(titulo=titulo)
            return redirect('tarea:tarea')
        mensaje_error = 'El titulo de la tarea no puede estar vacío'
    return render(request, 'tarea/crear_tarea.html', {'mensaje_error': mensaje_error})

def editar_tarea(request, id):
    tarea = Tarea.objects.get(id=id)
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        if titulo:
            tarea.titulo = titulo
            tarea.save()
            return redirect('tarea:tarea')
    return render(request, 'tarea/editar_tarea.html', {'tarea': tarea})

def borrar_tarea(request, id):
    tarea = Tarea.objects.get(id=id)
    if request.method == 'POST':
        tarea.delete()
        return redirect('tarea:tarea')
    return render(request, 'tarea/borrar_tarea.html', {'tarea': tarea})
