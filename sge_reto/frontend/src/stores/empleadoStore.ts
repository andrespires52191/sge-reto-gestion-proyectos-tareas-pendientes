import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Empleado} from '@/types'

const ENDPOINT = 'http://localhost:8000/api/empleado/empleados/'

export const useEmpleadoStore = defineStore('empleado', () => {
    const empleados = ref<Empleado[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarEmpleados = async () => {
        try {
            const response = await fetch(ENDPOINT)
            if (!response.ok) throw new Error('Error al conectar con la API de Django')
            empleados.value = await response.json()
        } catch (err: any) {
            error.value = err.message
        } finally {
            cargando.value = false
        }
    }

    return {
        empleados,
        cargando,
        error,
        cargarEmpleados
    }
})
