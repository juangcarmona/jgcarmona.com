---
title: "Python en Docker con Visual Studio - Trucos y consejos"
description: ''
pubDate: 2022-10-30
categories: 
  - "desarrollo-software"
  - "devops"
tags: 
  - "sw-architecture"
  - "software"
---

¿Sabes depurar tu código mientras se ejecuta dentro de un contenedor? ¿Sabes inyectar variables de entorno a Docker? ¿Sabes como medir la cobertura de tus tests unitarios? En este artículo quiero presentarte una serie de trucos para que mejores tus habilidades y destrezas desarrollando aplicaciones y microservicios con Python, Docker y Visual Studio Code. ¿Te interesa? Sigue leyendo.

## Entendiendo la configuración de Visual Studio Code

La carpeta .vscode es el lugar donde se configura nuestro entorno de desarrollo. Contiene todos los archivos de configuración necesarios para personalizar nuestra experiencia con VS Code. En mi opinión, esta carpeta debería estar incluida en nuestro repositorio de código fuente para que todos los miembros del equipo de desarrollo aporten y compartan su experiencia sobre el entorno de trabajo

## CONTEXTO

Para este ejemplo he preparado una API muy simple desarrollada con Fast API que tiene las siguientes características:

- Expone la documentación con Swagger (Open API)
- Expone un método \[GET\] /version que devuelve la versión de la APP
- Utiliza variables de entorno, definidas en un fichero .env local
- Contiene un Dockerfile que nos permitirá desplegarlo donde queramos
- Además queremos cubrir nuestro código con Tests Unitarios
- EXTRA: queremos visualizar áreas del código sin cubrir por tests unitarios

Todo el código fuente de este ejemplo está disponible en [este repositorio de GitHub](https://github.com/jgcarmona-com/vs-code-tips-tricks):

[https://github.com/jgcarmona-com/vs-code-tips-tricks](https://github.com/jgcarmona-com/vs-code-tips-tricks)

## CONFIGURACIÓN DEL ENTORNO

Los tres archivos más importantes son:

**settings.json** - Este archivo contiene la configuración del entorno. En otro artículo hablaré en profundidad sobre lo que podemos hacer con él y dejaré varios ejemplos.

**launch.json** - Este archivo contiene las configuraciones de cómo y dónde se lanzarán nuestras aplicaciones.

**tasks.json** - Este archivo define las configuraciones de ciertos comandos como tareas de compilación y ejecución, incluyendo ciertos argumentos a pasar.

## launch.json

Vamos a configurar dos acciones que luego podremos ejecutar desde VS Code, una para ejecutar nuestra aplicación en Docker y otra para ejecutar los tests unitarios. Nuestro launch.json quedará así:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: SIMPLE API",
      "type": "docker",
      "request": "launch",
      "preLaunchTask": "docker-run-simple-api: debug",
      "python": {
        "args": [
          "-m ",
          "simple_api"
        ],
        "pathMappings": [
          {
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/app"
          }
        ],
        "projectType": "fastapi"
      },
    },
    {
      "name": "pytest SIMPLE API",
      "type": "python",
      "request": "launch",
      "purpose": [
        "debug-test"
      ],
      "env": {
        "PYTEST_ADDOPTS": "--no-cov"
      },
      "module": "pytest",
      "cwd": "${workspaceRoot}/simple-api/src",
      "envFile": "${workspaceFolder}/simple-api/.env",
      "console": "integratedTerminal"
    },
  ]
}
```

## settings.json

Aquí vemos cuatro parámetros de configuración relativos a Python y a nuestros tests unitarios, en un entorno real este fichero será más grande, claro, pero como ya dije habrá un artículo dentro de esta serie en el que hablaré de setttimns.json

```json
{
  "python.testing.unittestEnabled": false,
  "python.testing.pytestEnabled": true,
  "python.testing.pytestArgs": [
    "-v",
    "--cov=.",
    "--cov-report=xml:coverage.xml",
  ],
}
```

## tasks.json

Aquí definimos dos tareas, una para compilar la aplicación y otra para lanzarla, que será luego utilizada por la configuración que hemos definido en launch.json previamente. Estas dos tareas, docker-build y docker-run, son parte del plugin de Docker, si no lo tienes instalado te dará errores al intentar lanzar la aplicación.

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "docker-build",
            "label": "docker-build-simple-api",
            "platform": "python",
            "dockerBuild": {
                "tag": "simple-api:latest",
               <strong> "dockerfile": "${workspaceFolder}/simple-api/Dockerfile",
                "context": "${workspaceFolder}/simple-api",
                "pull": false
            }
        },
        {
            "type": "docker-run",
            "label": "docker-run-simple-api: debug",
            "dependsOn": [
                "docker-build-simple-api"
            ],
            "dockerRun": {
                "envFiles": [
                    "${workspaceFolder}/simple-api/.env"
                ]
            },
            "python": {
                "args": [],
                "module": "simple_api"
            }
        }
    ]
}
```

Teniendo esto bien definido deberíamos poder ver estas dos opciones de lanzamiento en el desplegable que se ve en la sección de RUN AND DEBUG.

![](../../../assets/img_not_found.jpg)  

Y si ejecutamos la primera configuración deberíamos obtener la siguiente salida por consola:

<figure>

![](../../../assets/img_not_found.jpg)  

<figcaption>

  
También podríamos ejecutar nuestros tests desde la sección Testing de nuestro Visual Studio Code y, de igual forma, todos deberían pasar y deberíamos obtener un resultado similar a este:

</figcaption>

</figure>

![](../../../assets/img_not_found.jpg)  

## Depurar Nuestros Tests Unitarios

Puede parecer obvio, pero a veces no lo es tanto. Debemos ir a la sección de RUN AND DEBUG, seleccionar la opción que lanza nuestros tests y poner un punto de interrupción donde queramos depurar. Si el código de nuestros tests pasa por ahí alcanzaremos el breakpoint y podremos depurar en condiciones.

![](../../../assets/img_not_found.jpg)  

## Ejecutar en Docker y Depurar

De igual forma, en la sección de RUN AND DEBUG, debemos seleccionar la opción que compila y lanza la aplicación. Al darle al play para lanzarla veremos como se orquesta todo el proceso.

Como resultado, si todo ha ido bien, veremos dos cosas. Por un lado, se abrirá una notificación de nuestro firewall de Windows informándonos de que Docker solicita acceso a Internet.

![](../../../assets/img_not_found.jpg)  

Y por otro veremos un navegador con la web que se ha generado con la documentación de nuestra API, que como vemos es muy simple.

![](../../../assets/img_not_found.jpg)  

Este lo hemos conseguido con apenas 35 líneas de código que os dejo a continuación.

```python
import os

import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse, RedirectResponse

from simple_api.services import version_service

# Declaramos nuestra APP
app = FastAPI()

# Al hacer un GET a la raíz redirigimos al cliente a la documentación de Swagger
@app.get("/", include_in_schema=False, response_class=RedirectResponse)
async def redirect_to_swagger():
    return "/docs"

# Devuelve la versión utilizando un servicio
@app.get("/version")
async def root():
    app_version = version_service.get_application_version()
    return {"message": app_version}

# El típico health que utilizaríamos para monitorizar el estado con kubernetes
@app.get("/health", include_in_schema=False, status_code=200)
def health():
    """Health Endpoint"""
    return JSONResponse(
        status_code=200,
        content={"message": "OK", "description": "Service is up and running"},
    )

# Entry point para el servidor
def run():
    port = int(os.getenv("PORT", "8080"))
    uvicorn.run(app, host="0.0.0.0", port=port)

```

> (NOTA: si este fuera mi código no tendría estos comentarios o, de tenerlos, estarían en inglés. Este código y sus comentarios están diseñados y orientados a la enseñanza)

¿Lo probamos? ¡Adelante! Vamos a poner un punto de interrupción en la línea 20 y a hacer una petición al método \[GET\] /version.

![](../../../assets/img_not_found.jpg)  

Y podemos entrar en el servicio de versión con F11

![](../../../assets/img_not_found.jpg)  

Y al final ver que nuestro servicio devuelve lo que hayamos definido dentro de nuestras variables de entorno...

![](../../../assets/img_not_found.jpg)  

## Ver la cobertura de código

He probado varias formas y para mí lo más sencillo es instalar una extensión de Visual Studio Code llamada Coverage Gutters. Una vez instalada esta extensión, utilizando los ficheros generados por pytest-cov, nos marca en nuestro código qué zonas están cubiertas y cuales no, con verde y rojo respectivamente. Para mostrar y ocultar este "hint" visual basta con marcar la opción "Watch" que tenemos en la barra inferior de VS Code. Es un botón Toggle que pasará a mostrarnos el porcentage de cobertura y los colores en la barra.

![](../../../assets/img_not_found.jpg)  

El resultado es el siguiente:

![](../../../assets/img_not_found.jpg)  

Muy útil, ¿no crees?

## Resolución de problemas

Son muchos los problemas que podemos encontrarnos en este contexto. El que a mí más quebraderos de cabeza me ha ocasionado y el que más veces he visto por Stack Overflow es que marcamos unos puntos de interrupción y VS Code nos dice que no encuentra ese fichero en el contenedor.

![](../../../assets/img_not_found.jpg)  

Esto puede deberse a una incongruencia en el sistema de ficheros remoto, es decir, la ruta del fichero en el contenedor no coincide con lo que VS Code espera.

Para aclararnos sobre qué hemos desplegado en el contenedor, cuál es la ruta del directorio de trabajo, es decir, la raíz del proceso Python, debemos echar un vistazo a nuestro Dockerfile y al fichero a launch.json.

En nuestro Dockerfile tenemos

```dockerfile
FROM python:3.10-slim

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

WORKDIR /app/src

ARG PORT=8080
EXPOSE $PORT
```

Como ves, el directorio de trabajo (Working Directory) en el contenedor es /app/src... Ahora fíjate en la configuración que teníamos de Python para el contenedor en launch.json:

```json
"python": {
        "args": [
          "-m ",
          "simple_api"
        ],
        "pathMappings": [
          {
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/app"
          }
        ],
        "projectType": "fastapi"
      },
```

Tenemos que ajustar el mapeo de las rutas (path mapping) para que la raíz local (${workspaceRoot }/simple-api/src) coincida con la raíz remota (/app/src) y así el motor de depuración pueda establecer y usar los puntos de interrupción en el contenedor. También vamos a configurar Vamos a cambiar varias cosas Python para ejecutar nuestro código como un módulo con "module": "simple\_api". La sección de Python en el launch.json nos quedaría así:

```json
"python": {
        "module": "simple_api",
        "pathMappings": [
          {
            "localRoot": "${workspaceRoot}/simple-api/src",
            "remoteRoot": "/app/src"
          }
        ],
        "projectType": "fastapi"
      },
```

Una vez realizados estos cambios ya podemos depurar como he explicado más arriba.
