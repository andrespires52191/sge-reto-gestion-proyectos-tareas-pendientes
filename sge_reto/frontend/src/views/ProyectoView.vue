<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useProyectoStore} from '@/stores/proyectoStore'
import ProyectoCard from '@/components/ProyectoCard.vue'
import ProyectoEditCard from '@/components/ProyectoEditCard.vue'

const proyectoStore = useProyectoStore()
const proyectos = computed(() => proyectoStore.proyectos)

const editandoId = ref<number | null>(null)
const mostrandoCrear = ref(false)

const nuevoProyectoBase = (): Partial<Proyecto> => ({
  nombre: '',
  descripcion: '',
  estado: 0,
  responsable_principal: null,
  fecha_inicio: null,
  fecha_fin_prevista: null,
  tareas_asociadas: []
})

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
    <div class="d-flex align-items-center mb-4">
      <h1 class="mb-0">Proyectos</h1>
      <button @click="mostrandoCrear = true" class="btn btn-success btn-sm ms-3" v-if="!mostrandoCrear">
        + Añadir Proyecto
      </button>
    </div>

    <div v-if="proyectoStore.cargando" class="alert alert-info">Conectando con Django...</div>
    <div v-else-if="proyectoStore.error" class="alert alert-danger">
      <strong>Error:</strong> {{ proyectoStore.error }}
    </div>

    <div v-else>
      <ProyectoEditCard
        v-if="mostrandoCrear"
        :proyecto="(nuevoProyectoBase() as Proyecto)"
        @cancelar="mostrandoCrear = false"
        @guardado="mostrandoCrear = false"
      />

      <div v-if="proyectos.length === 0 && !mostrandoCrear" class="alert alert-info">No hay proyectos en la base de datos.</div>

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
