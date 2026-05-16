import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Proyecto} from '@/types'

const ENDPOINT = 'http://localhost:8000/api/proyecto/proyectos/'

export const useProyectoStore = defineStore('proyecto', () => {
    const proyectos = ref<Proyecto[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarProyectos = async () => {
        try {
            const response = await fetch(ENDPOINT)
            if (!response.ok) throw new Error('Error al conectar con la API de Django')
            proyectos.value = await response.json()
        } catch (err: any) {
            error.value = err.message
        } finally {
            cargando.value = false
        }
    }

    return {
        proyectos,
        cargando,
        error,
        cargarProyectos
    }
})
