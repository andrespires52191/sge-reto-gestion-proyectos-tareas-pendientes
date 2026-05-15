<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type {Tarea} from './types' // <-- Aquí importamos el tipo que has creado

const tareas = ref<Tarea[]>([])
const cargando = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/tarea/api/tareas')
    if (!response.ok) throw new Error('Error al conectar con la API de Django')
    tareas.value = await response.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    cargando.value = false
  }
})

const formatearFecha = (fechaISO: string | null) => {
  if (fechaISO === null) return '';
  return new Date(fechaISO).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <main style="padding: 2rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
    <h1>Gestión de Tareas</h1>

    <div v-if="cargando">Conectando con Django...</div>
    <div v-else-if="error" style="color: red; padding: 1rem; border: 1px solid red;">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-else>
      <div v-if="tareas.length === 0">No hay tareas en la base de datos.</div>

      <div v-for="tarea in tareas" :key="tarea.id"
           style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem; border-radius: 8px;">

        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0 0 0.5rem 0;">#{{ tarea.id }} - {{ tarea.titulo }}</h2>
          <span style="background: #eee; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em;">
            Prioridad: <strong>{{ tarea.prioridad }}</strong>
          </span>
        </div>

        <p style="color: #555; margin-bottom: 1rem;">{{ tarea.descripcion }}</p>

        <div style="font-size: 0.9em; color: #666; display: flex; gap: 1rem;">
          <span><strong>Estado:</strong> {{ tarea.estado }}</span>
          <span><strong>Asignada a:</strong> {{ tarea.responsable_asignado || 'Sin asignar' }}</span>
          <span><strong>Inicio:</strong> {{ formatearFecha(tarea.fecha_inicio) }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
