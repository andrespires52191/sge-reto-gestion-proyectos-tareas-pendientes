
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
