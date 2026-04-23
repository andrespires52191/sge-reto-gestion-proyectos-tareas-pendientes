# Reto 4: Gestión de proyectos y tareas dependientes

La empresa Egibide Project Management S.L. desarrolla proyectos internos y necesita
organizar el trabajo en tareas, asignarlas a responsables y controlar bloqueos entre ellas.
No basta con guardar una lista de tareas; hace falta saber a qué proyecto pertenecen, quién
las lleva y si una depende de otra para poder iniciarse o cerrarse.

En la base de datos, Proyecto tiene una relación de uno a muchos con Tarea, porque un
proyecto agrupa muchas tareas. Empleado también tiene una relación uno a muchos con
Tarea si decides que cada tarea tiene un único responsable. Si quieres permitir colaboración
entre varios empleados en una tarea, entonces aparecería una relación many-to-many entre
Tarea y Empleado, dejando quizá un responsable principal como foreign key y varios
colaboradores como many-to-many. La parte más interesante de este reto está en las
dependencias entre tareas. Aquí no necesitas necesariamente una tabla separada si usas
una self-relation many-to-many sobre Tarea, pero pedagógicamente suele ser mejor crear
una tabla Dependencia. Esa tabla relaciona una tarea origen con una tarea dependiente. En
términos prácticos, una tarea puede depender de varias tareas previas, y una tarea también
puede bloquear a varias tareas posteriores. Por eso la relación real entre tareas es
many-to-many autorreferenciada.

Ese punto es muy potente para enseñar modelado relacional más allá de lo básico. El
alumnado ve que una tabla puede relacionarse consigo misma y que a veces conviene
crear una tabla intermedia con significado propio, por ejemplo para guardar el tipo de
dependencia o la fecha en que se estableció.

Vista tipo tablero (kanban básico) o listado estructurado por proyecto, con tareas
organizadas por estado y visualización de dependencias o bloqueos entre tareas.

## Información principal
- Proyecto
    - Código de proyecto
    - Nombre
    - Descripción
    - Fecha de inicio
    - Fecha fin prevista
    - Estado
    - Responsable principal
- Tarea
    - Código de tarea
    - Título
    - Descripción
    - Estado
    - Prioridad
    - Fecha de inicio
    - Fecha fin prevista
    - Proyecto asociado
    - Responsable asignado
- Empleado
    - DNI
    - Nombre
    - Apellidos
    - Email
    - Teléfono
    - Rol
- Dependencia
    - Código de dependencia
    - Tarea origen
    - Tarea dependiente
    - Tipo de dependencia

## Funcionalidades mínimas
- Gestión de proyectos: alta, listado, detalle, actualización y baja
- Gestión de tareas: alta, listado, detalle, actualización y baja
- Gestión de empleados: alta, listado, detalle, actualización y baja
- Asociación de tareas a proyectos
- Registro de dependencias entre tareas
- Vista de tareas por responsable
- Validación para impedir cerrar tareas bloqueadas
- Resumen de progreso por proyecto
