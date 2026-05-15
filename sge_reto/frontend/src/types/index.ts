export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    fecha_inicio: string | null; // Django devuelve las fechas como strings ISO 8601
    fecha_fin_prevista: string | null; // Django devuelve las fechas como strings ISO 8601
    proyecto_asociado: number; // Puede ser null si aún no tiene técnico
    responsable_asignado: number;
}
