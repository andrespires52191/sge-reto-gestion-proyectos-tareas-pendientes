<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useDependenciaStore } from '@/stores/dependenciaStore'
import DependenciaCard from '@/components/DependenciaCard.vue'

const dependenciaStore = useDependenciaStore()
const dependencias = computed(() => dependenciaStore.dependencias)

onMounted(() => {
  dependenciaStore.cargarDependencias()
})
</script>

<template>
  <div>
    <h1 class="mb-4">Dependencias</h1>

    <div v-if="dependenciaStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="dependenciaStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ dependenciaStore.error }}
    </div>

    <div v-else>
      <div v-if="dependencias.length === 0" class="alert alert-info">No hay dependencias en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="dependencia in dependencias" :key="dependencia.id">
          <DependenciaCard :dependencia="dependencia" />
        </div>
      </div>
    </div>
  </div>
</template>

