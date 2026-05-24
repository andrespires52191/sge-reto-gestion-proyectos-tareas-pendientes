import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {Empleado} from '@/types'
import api from "@/plugins/axios";
import axios from 'axios';

export const useEmpleadoStore = defineStore('empleado', () => {
    const empleados = ref<Empleado[]>([])
    const cargando = ref(true)
    const error = ref<string | null>(null)

    const cargarEmpleados = async () => {
        try {
            const {data} = await api.get('/api/empleado/empleados/');
            empleados.value = data;
        } catch (err) {
            if (axios.isAxiosError(err) || err instanceof Error)
                error.value = err.message
            else
                error.value = 'Error al conectar con la API de Django'
        } finally {
            cargando.value = false
        }
    }

    const actualizarEmpleado = async (empleado: Empleado) => {
        try {
            const url = `/api/empleado/empleados/${empleado.id}/`;
            const { data } = await api.patch(url, empleado);
            const index = empleados.value.findIndex(e => e.id === empleado.id);
            if (index !== -1) {
                empleados.value[index] = data;
            }
            return true;
        } catch (err) {
            alert('Error al actualizar empleado.');
            console.error('Error al actualizar empleado:', err);
            return false;
        }
    }

    const crearEmpleado = async (empleado: Partial<Empleado>) => {
        try {
            const { data } = await api.post('/api/empleado/empleados/', empleado);
            empleados.value.push(data);
            return true;
        } catch (err) {
            alert('Error al crear empleado.');
            console.error('Error al crear empleado:', err);
            return false;
        }
    }

    const borrarEmpleado = async (id: number) => {
        try {
            await api.delete(`/api/empleado/empleados/${id}/`);
            empleados.value = empleados.value.filter(e => e.id !== id);
            return true;
        } catch (err) {
            alert('Error al borrar empleado.');
            console.error('Error al borrar empleado:', err);
            return false;
        }
    }

    return {
        empleados,
        cargando,
        error,
        cargarEmpleados,
        actualizarEmpleado,
        crearEmpleado,
        borrarEmpleado
    }
})
