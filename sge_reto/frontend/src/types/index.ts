export interface Empleado {
    id: number;
    dni: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: string;
    tareas_asignadas: number[]; // Tareas
}

export interface Proyecto {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_inicio: string | null; // fecha ISO 8601
    fecha_fin_prevista: string | null; // fecha ISO 8601
    estado: number; // 0-100%
    responsable_principal: number | null; // Empleado
    tareas_asociadas: number[]; // Tareas
}

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: number;
    prioridad: 'baja' | 'media' | 'alta'; // choices en el modelo
    fecha_inicio: string | null; // fecha ISO 8601
    fecha_fin_prevista: string | null; // fecha ISO 8601
    proyecto_asociado: number | null; // Proyecto
    responsable_asignado: number | null; // Empleado
    antecesoras: string[]; // Tareas
    sucesoras: string[]; // Tareas
}

export interface Dependencia {
    id: number;
    tarea_origen: Tarea;
    tarea_dependiente: Tarea;
    tipo_dependencia: 'FIN_INI' | 'INI_INI' | 'FIN_FIN'; // choices en el modelo
}
