import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Tarea} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

const ENDPOINT = '/api/tarea/tareas/'

export const useTareaStore = defineStore('tarea', () => {
    const tareas = ref<Tarea[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarTareas = async () => {
        try {
            const { data } = await api.get(ENDPOINT);
            tareas.value = data;
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error)
                error.value = err.message
            else
                error.value = 'Error al conectar con la API de Django'
        } finally {
            cargando.value = false
        }
    }

    return {
        tareas,
        cargando,
        error,
        cargarTareas
    }
})
