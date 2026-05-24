import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Tarea} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

export const useTareaStore = defineStore('tarea', () => {
    const tareas = ref<Tarea[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarTareas = async () => {
        try {
            const { data } = await api.get('/api/tarea/tareas/');
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

    const actualizarTarea = async (tarea: Tarea) => {
        try {
            // Aseguramos que la URL termine en / para evitar redirecciones de Django
            const url = `/api/tarea/tareas/${tarea.id}/`;
            const { data } = await api.patch(url, tarea);
            const index = tareas.value.findIndex(t => t.id === tarea.id);
            if (index !== -1) {
                tareas.value[index] = data;
            }
            return true;
        } catch (err) {
            alert('Error al actualizar tarea.');
            console.error('Error al actualizar tarea:', err);
            return false;
        }
    }

    const crearTarea = async (tarea: Partial<Tarea>) => {
        try {
            const { data } = await api.post('/api/tarea/tareas/', tarea);
            tareas.value.push(data);
            return true;
        } catch (err) {
            alert('Error al crear tarea.');
            console.error('Error al crear tarea:', err);
            return false;
        }
    }

    const borrarTarea = async (id: number) => {
        try {
            await api.delete(`/api/tarea/tareas/${id}/`);
            tareas.value = tareas.value.filter(t => t.id !== id);
            return true;
        } catch (err) {
            alert('Error al borrar tarea.');
            console.error('Error al borrar tarea:', err);
            return false;
        }
    }

    return {
        tareas,
        cargando,
        error,
        cargarTareas,
        actualizarTarea,
        crearTarea,
        borrarTarea
    }
})
