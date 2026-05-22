import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Proyecto} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

export const useProyectoStore = defineStore('proyecto', () => {
    const proyectos = ref<Proyecto[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarProyectos = async () => {
        try {
            const {data} = await api.get('/api/proyecto/proyectos/');
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

    const actualizarProyecto = async (proyecto: Proyecto) => {
        try {
            const url = `/api/proyecto/proyectos/${proyecto.id}/`;
            const { data } = await api.patch(url, proyecto);
            const index = proyectos.value.findIndex(p => p.id === proyecto.id);
            if (index !== -1) {
                proyectos.value[index] = data;
            }
            return true;
        } catch (err) {
            console.error('Error al actualizar proyecto:', err);
            return false;
        }
    }

    const borrarProyecto = async (id: number) => {
        try {
            await api.delete(`/api/proyecto/proyectos/${id}/`);
            proyectos.value = proyectos.value.filter(p => p.id !== id);
            return true;
        } catch (err) {
            console.error('Error al borrar proyecto:', err);
            return false;
        }
    }

    return {
        proyectos,
        cargando,
        error,
        cargarProyectos,
        actualizarProyecto,
        borrarProyecto
    }
})
