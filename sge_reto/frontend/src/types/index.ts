export interface Empleado {
    id: number;
    dni: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: string;
    tareas_asignadas: string[]; // Tareas
}

export interface Proyecto {
    id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string | null; // fecha ISO 8601
    fecha_fin_prevista: string | null; // fecha ISO 8601
    estado: number; // 0-100%
    responsable_principal: number; // Empleado
    responsable_principal_lectura: string; // Empleado
    tareas_asociadas: string[]; // Tareas
}

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: number;
    prioridad: 'baja' | 'media' | 'alta'; // choices en el modelo
    fecha_inicio: string | null; // fecha ISO 8601
    fecha_fin_prevista: string | null; // fecha ISO 8601
    proyecto_asociado: number; // Proyecto
    proyecto_asociado_lectura: string; // Proyecto
    responsable_asignado: number; // Empleado
    responsable_asignado_lectura: string; // Empleado
    antecesoras: string[]; // Tareas
    sucesoras: string[]; // Tareas
}

export interface Dependencia {
    id: number;
    tarea_origen: number;
    tarea_dependiente: number;
    tarea_origen_lectura: Tarea;
    tarea_dependiente_lectura: Tarea;
    tipo_dependencia: 'FIN_INI' | 'INI_INI' | 'FIN_FIN'; // choices en el modelo
}
