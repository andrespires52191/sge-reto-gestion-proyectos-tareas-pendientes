
Actualizar pip
> python.exe -m pip install --upgrade pip

Crear venv
> python -m venv venv

ERROR:No se puede ejecutar scripts porque está deshabilitada la política de ejecución.
Solución: Ejecutar el siguiente comando en la powerShell:
> Set-ExecutionPolicy RemoteSigned

Activar venv
> venv\Scripts\activate
o 
> ..\venv\Scripts\activate

Con el entorno virtual activado:
> pip install django

Si hay un problema de certificados o de conexión ejecuta:
> pip install django --trusted-host pypi.org --trusted-host files.pythonhosted.org

Verificar con alguna de estas:
> django-admin --version
> python -m django –version
> py -m django –version

Ejecuta en la terminal del IDE correspondiente en mi caso Visual Studio Code:
> django-admin startproject mi_proyecto

Entra en el proyecto:
> cd mi_proyecto

Ejecuta el servidor:
> python manage.py runserver

Dependencias neon y ngrok
> pip install django psycopg2-binary dj-database-url python-decouple

Guardar dependencias
> pip freeze > requirements.txt

Instalar dependencias
> pip install -r requirements.txt

Actualizar venv
> python -m venv --upgrade venv

Crear sub-app dentro de ruta /apps/
> python manage.py startapp nombre_app apps/nombre_app

Generar una nueva SECRET_KEY
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

Crear migraciones
> python manage.py migrate 
> python manage.py makemigrations

Permisos de ejecución de scripts
> chmod +x run_public.sh

Configuración de ngrok (https://dashboard.ngrok.com/get-started/setup):
> ngrok config add-authtoken TU_TOKEN_AQUI

Establecer la conexión de django con ngrok.
Se le puede poner usuario y contraseña a la conexión. Por si mismos, estos
datos no son permanentes solo valen mientras se esta ejecutando el comando.
> ngrok http 8000
> ngrok http 8000 --basic-auth "usuario:contraseña"
