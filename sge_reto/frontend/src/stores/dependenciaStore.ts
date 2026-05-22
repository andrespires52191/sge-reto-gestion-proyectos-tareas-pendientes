import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Dependencia} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

const ENDPOINT = '/api/tarea/dependencias/'

export const useDependenciaStore = defineStore('dependencia', () => {
    const dependencias = ref<Dependencia[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarDependencias = async () => {
        try {
            const { data } = await api.get(ENDPOINT);
            dependencias.value = data;
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
        dependencias,
        cargando,
        error,
        cargarDependencias
    }
})

