import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Proyecto} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

const ENDPOINT = '/api/proyecto/proyectos/'

export const useProyectoStore = defineStore('proyecto', () => {
    const proyectos = ref<Proyecto[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarProyectos = async () => {
        try {
            const {data} = await api.get(ENDPOINT);
            proyectos.value = data;
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
        proyectos,
        cargando,
        error,
        cargarProyectos
    }
})
