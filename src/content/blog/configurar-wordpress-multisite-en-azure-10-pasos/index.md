---
title: "10 pasos para configurar WordPress Multisite en Azure"
description: ''
pubDate: 2023-06-13
categories: 
  - "blog"
  - "devops"
tags: 
  - "sw-architecture"
  - "azure"
  - "software"
heroImage: "images/pexels-photo-4160094.jpeg"
---

Cuando administras varios sitios web, los costos de alojamiento pueden sumarse rápidamente. Una solución efectiva es utilizar WordPress Multisite en conjunción con Azure, lo cual permite administrar varios sitios web a través de una sola instalación de WordPress. Además de ser una forma eficiente de gestionar múltiples sitios, esta combinación también puede ser más rentable. En este artículo, te guiaré a través de un proceso detallado en 10 pasos para configurar WordPress Multisite en Azure, con un enfoque en la reducción de costos. Basado en mi experiencia personal y en la correspondencia con el equipo de Azure, esta guía te proporcionará la información necesaria para configurar y administrar múltiples sitios web con eficiencia.

## Índice

1. [**Configuración inicial**](https://chat.openai.com/?model=gpt-4#configuraci%C3%B3n-inicial): Crea una cuenta de **Azure** y configura un App Service Plan.

3. [**Instalación de WordPress**](https://chat.openai.com/?model=gpt-4#instalaci%C3%B3n-de-wordpress): Instala WordPress en tu App Service a través del portal de Azure.

5. [**Preparación para Multisite**](https://chat.openai.com/?model=gpt-4#preparaci%C3%B3n-para-multisite): Modifica el archivo `wp-config.php` de WordPress para permitir Multisite.

7. [**Creación de la red Multisite**](https://chat.openai.com/?model=gpt-4#creaci%C3%B3n-de-la-red-multisite): Accede al panel de administración de WordPress para configurar tu red Multisite.

9. [**Agregar los dominios en Azure**](https://chat.openai.com/?model=gpt-4#agregar-los-dominios-en-azure): Entra en tu App Service a través del portal de Azure y añade tus dominios personalizados.

11. [**Verificación de los dominios**](https://chat.openai.com/?model=gpt-4#verificaci%C3%B3n-de-los-dominios): Verifica tus dominios personalizados en tu App Service en Azure.

13. [**Creación de los sitios en WordPress**](https://chat.openai.com/?model=gpt-4#creaci%C3%B3n-de-los-sitios-en-wordpress): Crea un nuevo sitio para cada dominio en la red Multisite de WordPress.

15. [**Ajustes en la configuración de los sitios**](https://chat.openai.com/?model=gpt-4#ajustes-en-la-configuraci%C3%B3n-de-los-sitios): Cambia las URL de cada sitio para que apunten a sus dominios correspondientes y actualiza las URL en las tablas de la base de datos correspondientes.

17. [**Comprobación final**](https://chat.openai.com/?model=gpt-4#comprobaci%C3%B3n-final): Verifica que cada dominio esté funcionando correctamente con su respectivo sitio en la red Multisite.

19. [**Resolución de problemas**](https://chat.openai.com/?model=gpt-4#resoluci%C3%B3n-de-problemas): En caso de dificultades, investiga posibles soluciones, como asegurarte de que phpMyAdmin esté listo para el sitio y que puedas conectarte al servidor MySQL.

Sigue leyendo para descubrir cómo realizar cada uno de estos pasos y asegurar el éxito en la configuración de tu WordPress Multisite en Azure. ¡Comencemos!

## 1.- Configuración inicial:

El primer paso para configurar WordPress Multisite en Azure es tener una cuenta de Azure y configurar tu Plan de App Service. La elección del plan correcto es crucial, ya que dictará los recursos disponibles para tus sitios de WordPress.

## 2.- Instalación de WordPress

Una vez que hayas configurado tu cuenta de Azure y tu plan de App Service, el siguiente paso es instalar WordPress. Afortunadamente, Azure hace que este proceso sea bastante sencillo a través de su portal.

1. **Inicia sesión en el portal de Azure**: Inicia sesión en tu cuenta de Azure y dirígete al portal de Azure. (estoy convencido de que ya estás aquí)

3. **Crea un nuevo recurso de App Service**: En el panel izquierdo del portal de Azure, selecciona "Crear un recurso". Luego busca "WordPress" y selecciona "WordPress on App Service" en los resultados de la búsqueda.  
    ![](../../../assets/img_not_found.jpg)

5. **Rellena los detalles**: Se te pedirá que rellenes algunos detalles para tu instalación de WordPress, incluyendo el nombre de tu App Service, tu App Service Plan, la región, el tamaño de la base de datos y más. Rellena estos detalles según tus necesidades. El App Service Plan es el contenedor de tu aplicación de WordPress y en él se definen la cantidad de recursos disponibles para tu sitio o los sitios asignados a este plan. Puedes elegir entre varias opciones, que varían en precio y recursos. Para un sitio de WordPress, se recomienda un Plan de App Service B1 o superior, pero la elección depende de tus necesidades y presupuesto. Tranquilo porque siempre puedes cambiar el plan, de forma dinámica. Puedes comenzar con un plan gratuito (F1) e ir escalando a uno con mejores características. En mi caso, el App Service Plan que utilizo (de momento) es un Standard S1, el cual tiene un coste de 64,915 € mensuales.

7. **Instala WordPress**: Finalmente, haz clic en "Crear" para instalar WordPress en tu App Service.

En este punto, tienes una instalación de WordPress funcionando en Azure, Y si seleccionaste "Enable multisite" ya debería ser un sitio multisite. Podemos verificarlo como parte del siguiente paso.

## 3.- Preparación para Multisite

En este paso, vamos a verificar si tu instalación de WordPress ya está configurada para funcionar como un Multisite y en caso de que no lo esté, te guiaré en cómo habilitar esta característica.

1. **Verificación de las configuraciones de la App Service**: En primer lugar, vamos a comprobar si ya está habilitado Multisite a través de la configuración de la App Service. Inicia sesión en el portal de Azure y ve a tu App Service. Haz clic en "Configuración" en el menú de la izquierda y selecciona "Configuración de la aplicación". Busca las variables de entorno `WORDPRESS_MULTISITE_CONVERT` y `WORDPRESS_MULTISITE_TYPE`. Si la opción Multisite fue habilitada durante la instalación, `WORDPRESS_MULTISITE_CONVERT` debería estar configurada como `true` y `WORDPRESS_MULTISITE_TYPE` como `subdirectory`.  
    ![](../../../assets/img_not_found.jpg)
    

3. **Verificación y edición del archivo wp-config.php a través de FTP**: Necesitaremos acceder a los archivos del servidor para verificar y, si es necesario, editar el archivo wp-config.php. Para esto, puedes usar FileZilla o cualquier otro cliente FTP de tu preferencia.
    - Conéctate a tu servidor a través de FTP usando FileZilla (o tu cliente FTP preferido). Puedes encontrar los detalles del FTP en el panel de Azure, bajo la sección "Despliegue > Centro de despliegue FTP".
    
    - Navega al directorio donde se encuentra tu archivo wp-config.php (usualmente está en el directorio `/site/wwwroot`).
    
    - Descarga el archivo wp-config.php y ábrelo con un editor de texto (por ejemplo VS Code).
    
    - Busca la siguiente línea en el archivo:  
        `define( 'WP_ALLOW_MULTISITE', true );`  
        Si esta línea ya existe, esto significa que la opción Multisite está habilitada.  
        NOTA: las credenciales para acceder via FTPs las tienes en la sección Deployment Center, en la pestañña FTPS Credentials.    ![](../../../assets/img_not_found.jpg)

5. **Modificación del archivo wp-config.php (si es necesario)**: Si la línea `define( 'WP_ALLOW_MULTISITE', true );` no está presente en el archivo, deberás agregarla justo debajo de la línea que dice `/* That's all, stop editing! Happy publishing. */`. Guarda el archivo y súbelo nuevamente al servidor.

    ![](../../../assets/img_not_found.jpg)

Ahora tu instalación de WordPress en Azure debería estar preparada para funcionar como un Multisite. En el siguiente paso, te mostraré cómo configurar un dominio personalizado para tu sitio.

## 4.- Creación de la red Multisite

Ahora que ya tienes tu instalación de WordPress preparada para el multisite, es momento de configurar tu red Multisite.

1. **Accede a tu panel de administración de WordPress**: Para hacer esto, simplemente escribe la URL de tu sitio seguido de `/wp-admin` en la barra de direcciones de tu navegador. Por ejemplo, si tu sitio es `misitio.azurewebsites.net`, deberías ingresar a `misitio.azurewebsites.net/wp-admin`.

3. **Inicia la configuración de la red Multisite**: Una vez que hayas iniciado sesión en el panel de administración de WordPress, dirígete a la sección de `Herramientas > Configuración de la red`.

5. **Selecciona la estructura de la red**: En este punto, puedes decidir si quieres que tu red use una estructura de subdominios o subdirectorios. Recuerda que si seleccionaste `subdirectory` en la configuración de `WORDPRESS_MULTISITE_TYPE`, deberías seleccionar la opción de subdirectorios aquí.

7. **Completa la configuración de la red**: WordPress te proporcionará algunas líneas de código que debes copiar y pegar en tu archivo `wp-config.php` y `.htaccess`. Puedes hacer esto utilizando FileZilla de la misma manera que lo hicimos en el paso 3. En mi caso la configuracion ha quedado así:  
       ![](../../../assets/img_not_found.jpg)
    También he tenido que hacer un retoque para que funcionaran bien las URL's, busca esta sección un poco más abajo y déjala así:    ![](../../../assets/img_not_found.jpg)

9. **Revisa tu red**: Una vez que hayas guardado tus cambios y recargado tu sitio, deberías ver un nuevo elemento en tu menú de WordPress llamado `Mis Sitios`. Este es el lugar donde podrás administrar toda tu red de sitios.

Con tu red Multisite creada, ahora puedes empezar a agregar nuevos sitios. Te guiaré en este proceso en el siguiente paso.

## 5: Agregar los dominios personalizados en Azure

En este paso, vamos a añadir y verificar los dominios personalizados en Azure para que puedas utilizarlos en tu red Multisite de WordPress. Sigue estos pasos:

1. **Accede al portal de Azure**: Inicia sesión en el portal de Azure y dirígete a tu App Service.

3. **Añade tus dominios personalizados**: En la sección de "Dominios personalizados" de tu App Service, selecciona "+ Agregar dominio personalizado". Aquí podrás añadir los dominios que deseas utilizar en tu red Multisite. Sigue las instrucciones para completar el proceso de verificación de cada dominio.

5. **Configura los registros DNS**: Durante el proceso de verificación, se te pedirá que configures los registros DNS de tus dominios en el proveedor donde los adquiriste. Esto asegurará que los dominios apunten correctamente a tu App Service en Azure. Si tienes dudas sobre cómo configurar los registros DNS, puedes consultar la documentación de tu proveedor de dominios o buscar guías en línea.

7. **Habilita los certificados SSL**: Azure proporciona certificados SSL gratuitos y automáticos para tus dominios personalizados. Una vez que hayas verificado tus dominios, podrás habilitar el SSL para asegurar las conexiones a tus sitios web. Dirígete a la sección de "TLS/SSL" en la configuración de tu App Service y sigue los pasos para habilitar el SSL para tus dominios personalizados.

![](../../../assets/img_not_found.jpg)  

Con estos pasos completados, tus dominios personalizados estarán listos para ser utilizados en tu red Multisite de WordPress.

## 6: Verificación de los dominios personalizados

Después de haber agregado y verificado tus dominios personalizados en Azure, es importante asegurarse de que funcionan correctamente. Aquí te mostramos cómo verificar tus dominios:

1. **Revisa la configuración de tus dominios en Azure**: Regresa a la sección de "Dominios personalizados" de tu App Service en Azure. Asegúrate de que todos tus dominios estén listados y que tengan la marca de verificación verde, lo que indica que han sido verificados correctamente.

3. **Accede a tus dominios**: Abre un navegador web e intenta acceder a cada uno de tus dominios personalizados. Deberías poder ver tus sitios de WordPress cargando correctamente en cada dominio. Si encuentras algún problema o error al acceder a alguno de los dominios, revisa los pasos anteriores para asegurarte de que has configurado los registros DNS y el SSL correctamente.

Con tus dominios personalizados, verificados y funcionando correctamente, estás listo para continuar configurando tus sitios en WordPress para aprovechar la funcionalidad de Multisite.

## 7.- Creación de los sitios en WordPress

Una vez que has configurado tu red Multisite y tienes tus dominios personalizados verificados, es el momento de crear un nuevo sitio para cada dominio en tu red Multisite de WordPress. Sigue estos pasos:

1. **Accede al panel de administración de WordPress**: Inicia sesión en el panel de administración de WordPress utilizando la URL de tu sitio principal seguida de `/wp-admin`. Por ejemplo, si tu sitio principal es `tusitio.com`, deberás acceder a `tusitio.com/wp-admin`.

3. **Navega hasta la sección "Mis Sitios"**: En el menú izquierdo, busca el enlace llamado "Mis Sitios" y haz clic en él. Aquí verás una lista de todos los sitios en tu red Multisite.

5. **Crea un nuevo sitio**: Para agregar un nuevo sitio, selecciona la opción "Añadir nuevo" en la parte superior de la página. Completa los detalles requeridos, como el título del sitio, la dirección del sitio y la dirección de correo electrónico del administrador del sitio.

7. **Personaliza tu nuevo sitio**: Una vez que hayas creado el nuevo sitio, podrás personalizarlo instalando temas y plugins, ajustando la configuración y añadiendo contenido. Cada sitio en tu red Multisite puede tener su propio conjunto de temas y plugins, lo que te permite adaptarlos a las necesidades específicas de cada sitio.

9. **Repite los pasos anteriores para crear más sitios**: Si deseas agregar más sitios a tu red Multisite, simplemente repite los pasos anteriores. Puedes crear tantos sitios como desees, dependiendo de tus necesidades.

Con estos pasos, habrás creado los sitios individuales en tu red Multisite de WordPress.

## 8.- Ajustes en la configuración de los sitios

Una vez que hayas creado los sitios en tu red Multisite, es importante realizar algunos ajustes en la configuración para asegurarte de que los sitios apunten a sus dominios correspondientes. Sigue estos pasos:

1. **Accede al panel de administración de WordPress**: Inicia sesión en el panel de administración de WordPress utilizando la URL de tu sitio principal seguida de `/wp-admin`.

3. **Navega hasta la sección "Mis Sitios"**: En el menú izquierdo, busca el enlace llamado "Mis Sitios" y haz clic en él. Aquí verás una lista de todos los sitios en tu red Multisite.

5. **Selecciona el sitio que deseas configurar**: Haz clic en el sitio que deseas configurar para acceder a su panel de administración individual.

7. **Cambia la URL del sitio**: En la sección de ajustes del sitio, busca la opción de cambiar la URL o el dominio del sitio. Actualiza la URL para que corresponda con el dominio personalizado que deseas utilizar para ese sitio.

9. **Actualiza las URL en la base de datos**: Una vez que hayas cambiado la URL del sitio en la configuración, **es importante actualizar las URL en las tablas de la base de datos correspondientes**. Esto garantizará que los enlaces y el contenido del sitio apunten al dominio correcto. Lo que a mi me ha funcionado ha sido utilizar phpMyAdmin. Puedes acceder utilizando tu url base (misitio.azurewebsites.net/phpmyadmin) y ahí deberías poder revisar las tablas. Por ejemplo, es muy importante la tabla **wp\_blogs**, mira como ha quedado en mi configuración.

Repite estos pasos para cada sitio en tu red Multisite, asegurándote de ajustar las URL para que coincidan con los dominios correspondientes. Por ejemplo, para mi segundo sitio la tabla wp\_2\_options ha quedado así:

Con estos ajustes en la configuración de los sitios, habrás asegurado que cada sitio en tu red Multisite apunte a su dominio personalizado y que las URL estén actualizadas en la base de datos.

## 9.- Comprobación final

Una vez que hayas configurado y ajustado los sitios en tu red Multisite de WordPress, es importante realizar una comprobación final para asegurarte de que cada dominio esté funcionando correctamente con su respectivo sitio. Sigue estos pasos:

1. **Accede a cada dominio en tu navegador**: Ingresa la URL de cada dominio en tu navegador web y verifica que te dirija al sitio correspondiente en tu red Multisite. Asegúrate de que la página se cargue correctamente y de que puedas acceder a todas las secciones y funcionalidades del sitio.

3. **Navega por cada sitio**: Explora cada sitio individualmente y verifica que todas las páginas, publicaciones, imágenes y enlaces funcionen correctamente. Asegúrate de que el contenido se muestre adecuadamente y que no haya errores o problemas de carga.

5. **Realiza pruebas de funcionalidad**: Verifica que todas las funcionalidades específicas de cada sitio, como formularios de contacto, carritos de compra o funciones personalizadas, estén funcionando correctamente. Realiza pruebas exhaustivas para asegurarte de que todo esté en orden.

Con esta comprobación final, podrás asegurarte de que cada dominio esté funcionando correctamente con su respectivo sitio en la red Multisite de WordPress.

## 10.- Resolución de problemas

En caso de que encuentres dificultades durante la configuración de la red Multisite o experimentes problemas con alguno de los sitios, es importante investigar posibles soluciones. Aquí tienes algunas sugerencias:

1. **Verifica la configuración de phpMyAdmin**: Asegúrate de que phpMyAdmin esté correctamente configurado y listo para el sitio en tu App Service de Azure. Verifica que puedas acceder a phpMyAdmin y que puedas conectarte al servidor MySQL asociado a tu sitio.

3. **Revisa la configuración de la base de datos**: Verifica que las tablas y los datos en la base de datos estén correctamente configurados y actualizados. Asegúrate de que las URL y los enlaces en la base de datos correspondan a los dominios y sitios adecuados.

5. **Consulta la documentación de WordPress y Azure**: Explora la documentación oficial de WordPress y Azure para obtener información sobre posibles soluciones y solucionar problemas específicos. Puedes encontrar guías, tutoriales y recursos útiles que te ayudarán a resolver problemas comunes.

7. **Busca en la comunidad y los foros**: Utiliza los recursos de la comunidad de WordPress y Azure, como los foros de soporte, grupos de discusión y comunidades en línea. Pregunta y comparte tus problemas para recibir ayuda y orientación de otros usuarios y expertos.

Recuerda que la resolución de problemas puede variar dependiendo de las circunstancias específicas de tu configuración y entorno. Siempre es recomendable respaldar tu sitio y bases de datos antes de realizar cualquier cambio o solución de problemas.

Si tienes algún problema y necesitas ayuda, no dudes en contactar conmigo, estaré encantado de echarte una mano.
