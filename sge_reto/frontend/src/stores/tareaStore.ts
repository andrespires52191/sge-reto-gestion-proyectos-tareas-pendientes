import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Tarea} from '@/types'

export const useTareaStore = defineStore('tarea', () => {
    const tareas = ref<Tarea[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const fetchTareas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tarea/tareas')
            if (!response.ok) throw new Error('Error al conectar con la API de Django')
            tareas.value = await response.json()
        } catch (err: any) {
            error.value = err.message
        } finally {
            cargando.value = false
        }
    }

    return {
        tareas,
        cargando,
        error,
        fetchTareas
    }
})
