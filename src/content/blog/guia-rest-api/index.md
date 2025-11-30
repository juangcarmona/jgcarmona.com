---
title: "Guía Rápida de REST API: Buenas Prácticas, Métodos y Principios"
description: ''
pubDate: 2024-08-21
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "devops"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/api1.png"
---

## Principios Básicos

1. **Cliente-Servidor**: Separación de responsabilidades para modularidad.

3. **Sin Estado**: Cada petición contiene toda la información necesaria, sin almacenar datos de sesión en el servidor.

5. **Cacheabilidad**: Las respuestas pueden ser cacheadas para mejorar el rendimiento.

7. **Sistema en Capas**: Las capas funcionan de forma independiente y pueden cambiarse sin afectar a otras.

9. **Código Bajo Demanda** (opcional): Los servidores pueden extender la funcionalidad del cliente enviando código ejecutable.

11. **Interfaz Uniforme**: Interacción consistente entre diferentes componentes.

## Métodos HTTP

1. **GET**: Recupera recursos.

3. **POST**: Crea nuevos recursos o envía datos.

5. **PUT**: Actualiza o reemplaza recursos existentes.

7. **PATCH**: Modifica parcialmente recursos existentes.

9. **DELETE**: Elimina recursos.

11. **HEAD**: Similar a GET, pero solo recupera encabezados.

13. **OPTIONS**: Obtiene las opciones de comunicación disponibles para un recurso.

## Códigos de Estado

1. **2xx (Éxito)**:
    - **200 OK**: La petición fue exitosa.
    
    - **201 Creado**: El recurso se creó exitosamente.

3. **3xx (Redirección)**:
    - **301 Movido Permanentemente**: El recurso se movió a una nueva URI.

5. **4xx (Error del Cliente)**:
    - **401 No Autorizado**: Se requiere autenticación o la misma ha fallado.
    
    - **403 Prohibido**: La petición es entendida pero no autorizada.
    
    - **404 No Encontrado**: El recurso solicitado no se pudo encontrar.

7. **5xx (Error del Servidor)**:
    - **500 Error Interno del Servidor**: Ocurrió un error genérico en el servidor.

## Buenas Prácticas de Seguridad

1. **Autenticación**: Utiliza OAuth 2.0, JWT (Tokens JSON Web).

3. **Autorización**: Implementa RBAC (Control de Acceso Basado en Roles) o ABAC (Control de Acceso Basado en Atributos).

5. **HTTPS**: Usa TLS/SSL para encriptar las comunicaciones.

7. **Validación de Entradas**: Siempre valida y sanitiza los datos de entrada para prevenir ataques de inyección.

9. **Limitación de Tasa y Control de Flujo**: Implementa límites para evitar abusos.

11. **CORS (Intercambio de Recursos entre Orígenes)**: Controla el acceso desde diferentes orígenes.

13. **Encabezados de Seguridad**: Utiliza encabezados como Content-Security-Policy y X-Frame-Options para mitigar vulnerabilidades web.

## Convenciones para Nombres de Recursos

1. **Sustantivos**: Usa sustantivos para los nombres de recursos (ej., `/usuarios`, `/productos`).

3. **Pluralización**: Usa nombres plurales para colecciones (ej., `/usuarios`).

5. **Guiones**: Usa guiones para mejorar la legibilidad (ej., `/categorias-productos`).

7. **Minúsculas**: Usa letras minúsculas consistentemente.

## Mejores Prácticas

1. **Versionado**: Utiliza números de versión en la URI (ej., `/v1/usuarios`).

3. **Filtrado y Ordenación**: Aplica parámetros de consulta para filtrar y ordenar (ej., `/usuarios?estado=activo&orden=nombre,asc`).

5. **Paginación**: Usa parámetros de límite y desplazamiento para grandes conjuntos de datos.

7. **Manejo de Errores**: Devuelve códigos de error y mensajes claros y consistentes.

9. **Documentación**: Utiliza herramientas como [OpenAPI](https://www.openapis.org/) ([Swagger](https://swagger.io/)) para documentación comprensible.

11. **Caché**: Implementa caché en el servidor y en el cliente para un mejor rendimiento.
