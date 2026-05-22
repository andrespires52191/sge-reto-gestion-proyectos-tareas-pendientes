<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useProyectoStore} from '@/stores/proyectoStore'
import ProyectoCard from '@/components/ProyectoCard.vue'
import ProyectoEditCard from '@/components/ProyectoEditCard.vue'

const proyectoStore = useProyectoStore()
const proyectos = computed(() => proyectoStore.proyectos)

const editandoId = ref<number | null>(null)

const handleBorrar = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas borrar este proyecto?')) {
    await proyectoStore.borrarProyecto(id)
  }
}

onMounted(() => {
  proyectoStore.cargarProyectos()
})
</script>

<template>
  <div>
    <h1 class="mb-4">Proyectos</h1>

    <div v-if="proyectoStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="proyectoStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ proyectoStore.error }}
    </div>

    <div v-else>
      <div v-if="proyectos.length === 0" class="alert alert-info">No hay proyectos en la base de datos.</div>

      <div class="row">
        <div class="col-12" v-for="proyecto in proyectos" :key="proyecto.id">
          <ProyectoEditCard
            v-if="editandoId === proyecto.id"
            :proyecto="proyecto"
            @cancelar="editandoId = null"
            @guardado="editandoId = null"
          />
          <ProyectoCard
            v-else
            :proyecto="proyecto"
            @editar="editandoId = proyecto.id"
            @borrar="handleBorrar(proyecto.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
