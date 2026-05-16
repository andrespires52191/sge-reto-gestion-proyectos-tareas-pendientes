export interface Empleado {
    id: number;
    dni: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: string;
}

export interface Proyecto {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_inicio: string | null; // fecha ISO 8601 o null
    fecha_fin_prevista: string | null; // fecha ISO 8601 o null
    estado: number;
    responsable_principal: number | null;
}

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    estado: number;
    prioridad: 'baja' | 'media' | 'alta'; // choices en el modelo
    fecha_inicio: string | null; // fecha ISO 8601 o null
    fecha_fin_prevista: string | null; // fecha ISO 8601 o null
    proyecto_asociado: number | null; // FK Proyecto
    responsable_asignado: number | null; // FK Empleado
}

export interface Dependencia {
    id: number;
    tarea_origen: number; // FK Tarea
    tarea_dependiente: number; // FK Tarea
    tipo_dependencia: 'FIN_INI' | 'INI_INI' | 'FIN_FIN'; // choices en el modelo
}
