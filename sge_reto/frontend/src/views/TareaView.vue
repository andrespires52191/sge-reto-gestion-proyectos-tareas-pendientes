<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useTareaStore} from '@/stores/tareaStore'
import TareaCard from '@/components/TareaCard.vue'

const tareaStore = useTareaStore()
const tareas = computed(() => tareaStore.tareas)

onMounted(() => {
  tareaStore.cargarTareas()
})
</script>

<template>
  <div>
    <h1 class="mb-4">Tareas</h1>

    <div v-if="tareaStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="tareaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ tareaStore.error }}
    </div>

    <div v-else>
      <div v-if="tareas.length === 0" class="alert alert-info">No hay tareas en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="tarea in tareas" :key="tarea.id">
          <TareaCard :tarea="tarea" />
        </div>
      </div>
    </div>
  </div>
</template>
