# Reto 4: Gestión de proyectos y tareas dependientes

## Repositorio en github

https://github.com/andrespires52191/sge-reto-gestion-proyectos-tareas-pendientes

## Funcionalidades implementadas

- Base de datos PostgreSQL en Neon.
- CRUD de Empleados, Proyectos, Tareas y Dependencias.
- Autenticación de usuarios.
- Publicado en Ngrok: https://paddling-tartly-dreary.ngrok-free.dev/

## Funcionalidades no operativas

Existe una función API para filtrar tareas por proyectos, pero no se ha llegado a aprovechar en el frontend.

## Configuración de Backend

Se usa Django con:

- **Django REST Framework:** para crear la API.
- **PostgreSQL:** con Neon como base de datos.
- **CORS Headers:** para permitir peticiones desde el frontend.
- **JWT Authentication:** para la autenticación de usuarios.

Requisitos disponibles para instalar con:

```
pip install -r requirements.txt
```

## Configuración de Frontend

En **Vue** se usa:

- **Router** y **Pinia**.
- **Bootstrap:** Para los estilos.
- **Axios:** Para las peticiones al backend (con
  [interceptores](https://stackoverflow.com/questions/51646853/automating-access-token-refreshing-via-interceptors-in-axios)
  para refrescar los auth tokens).

## Información sobre la base de datos

El proyecto está configurado para usar un archivo ".env" funciona con PostgreSQL en Neon.

```
DATABASE_URL=...
SECRET_KEY=...
DEBUG=True
```

Hay datos de ejemplo en el archivo "datos_ejemplo.json" que se encuentra en la misma carpeta que el "manage.py".

Se pueden cargar con:

```
python manage.py loaddata "datos_ejemplo.json"
```

Para autentificarse y poder usar la aplicación hay que crear un usuario a traves de:

```
python manage.py createsuperuser
```
