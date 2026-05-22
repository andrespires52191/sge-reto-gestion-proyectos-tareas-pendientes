import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Dependencia} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

export const useDependenciaStore = defineStore('dependencia', () => {
    const dependencias = ref<Dependencia[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarDependencias = async () => {
        try {
            const { data } = await api.get('/api/tarea/dependencias/');
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

    const actualizarDependencia = async (dependencia: Dependencia) => {
        try {
            const url = `/api/tarea/dependencias/${dependencia.id}/`;
            const { data } = await api.patch(url, dependencia);
            const index = dependencias.value.findIndex(d => d.id === dependencia.id);
            if (index !== -1) {
                dependencias.value[index] = data;
            }
            return true;
        } catch (err) {
            console.error('Error al actualizar dependencia:', err);
            return false;
        }
    }

    return {
        dependencias,
        cargando,
        error,
        cargarDependencias,
        actualizarDependencia
    }
})

