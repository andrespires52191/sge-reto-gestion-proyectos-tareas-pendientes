
- Crear las entidades

- Generar las relaciones
    - Proyecto tiene una relación de uno a muchos con Tarea, porque un proyecto agrupa muchas tareas.
    - Empleado también tiene una relación uno a muchos con Tarea si decides que cada tarea tiene un único responsable.
    - Si quieres permitir colaboración entre varios empleados en una tarea, entonces aparecería una relación many-to-many entre
      Tarea y Empleado, dejando quizá un responsable principal como foreign key y varios colaboradores como many-to-many.
    - Tabla Dependencia. Esa tabla relaciona una tarea origen con una tarea dependiente.

- Funcionalidades de alta, listado, detalle, actualización y baja.
    - Para empleados, proyectos y tareas.

- Asociación de tareas a proyectos

- Registro de dependencias entre tareas

- Vista de tareas por responsable

- Asegurar requisitos
    - No basta con guardar una lista de tareas; hace falta saber a qué proyecto pertenecen, quién las lleva y si una depende de otra para poder iniciarse o cerrarse.

- Revisar validaciones
    - Validación para impedir cerrar tareas bloqueadas

- Resumen de progreso por proyecto

