# Reto 4: Gestión de proyectos y tareas dependientes

# Repositorio en github
https://github.com/andrespires52191/sge-reto-gestion-proyectos-tareas-pendientes

# Funcionalidades implementadas
- Base de datos en Neon
- Publicado en Ngrok: https://paddling-tartly-dreary.ngrok-free.dev/

# Funcionalidades no operativas
- Existe una función API para filtrar por proyectos, pero no se ha usado en el frontend.

# Información sobre la base de datos
El proyecto está configurado para usar un archivo ".env" funciona sobre PostgreSQL con Neon
> DATABASE_URL=...
> SECRET_KEY=...
> DEBUG=True

Hay datos de ejemplo en el archivo "datos_ejemplo.json" que se encuentra en la misma carpeta que el "manage.py".

Se pueden cargar con:
> python manage.py loaddata "datos_ejemplo.json"

Para autentificarse y poder usar la aplicación hay que crear un usuario a traves de:
> python manage.py createsuperuser
