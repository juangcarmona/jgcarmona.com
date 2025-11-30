---
title: "Angular 9 + i18n + SSR"
description: ''
pubDate: 2020-08-13
categories: 
  - "ai"
  - "desarrollo-software"
  - "devops"
heroImage: "images/image.png"
---

Como ya no sé ni cuantas veces he tenido que pelearme con este problema durante los dos últimos años y hoy me he visto, de nuevo, volviendo a esta lucha, he decidido relatar en este artículo los problemas que me he ido encontrando y cómo los he ido solucionando.

![](../../../assets/img_not_found.jpg)  

### ¿Qué es Angular?

Bueno, si estás leyendo esto ya sabes lo que es Angular, es una plataforma para crear aplicaciones web móviles y de escritorio. Yo he estado usándola desde que era conocida como AngularJS y en Logtrip hemos estado usando Angular desde su versión 4, en los primeros bocetos, hasta la versión 9, la que utilizamos en la actualidad. (Y entre nosotros, cada migración ha sido una fiesta)

### ¿Qué es i18n?

Gracias por hacerme esta pregunta, i18n significa "internacionalization" y se utiliza la abreviatura 'i18n' porque la palabra internacionalization tiene 20 letras, es decir, i + (18 letras) + n = **i18n**.

### ¿Qué es SSR y para que sirve Angular Universal?

Otra gran pregunta. SSR significa Server Side Rendering, es decir, renderizado del lado del servidor. Esta técnica tiene muchas ventajas y muchísimos inconvenientes. Gracias al **SSR**, las peticiones se procesan en el servidor y conseguimos ejecutar mucho menos JavaScript en el lado del cliente y es la respuesta que recibirás si le preguntas a alguien qué tienes que hacer para **mejorar el SEO** de tu aplicación Angular.

Angular Universal es la tecnología que nos permite implementar SSR en nuestras aplicaciones Angular.

### ¿Qué relación hay entre el SSR y el SEO?

A grandes rasgos el problema es que los robots que indexan la información de las páginas web (Google y casi todos los demás) no ejecutan JavaScript, es decir, por muchas URL's que tenga nuestro sitemap si no implementamos SSR la respuesta de nuestro servidor ante cualquiera de esas URL's será un fichero index.html con un buen montón de scripts que nunca son ejecutados y por tanto la información indexada es nula o inservible.

Nosotros, conocedores de esta problemática, comenzamos a utilizar SSR (Angular Universal) casi desde el comienzo, diría que ya con la versión 6 de Angular, y cada migración ha tenido sus retos y sus problemas. (A una pregunta [que contesté en StackOverflow](https://stackoverflow.com/questions/61574428/angular-9-universal-deployment-woes/62228308#62228308) al respecto hace relativamente poco, el auto de la pregunta me contestó lo siguiente en un comentario: "Isn't it really annoying to have to redo things for each release of Angular :/ I will give this a shot (I feel that deployment should be easy and even easier the later down the versions you go, not harder....)") Y no le faltaba razón al opinar eso porque ha habido muchas veces que con las migraciones hemos ido para atrás y hemos perdido mucho tiempo.

Hoy me atrevo a escribir este artículo pues he conseguido hacer funcionar todo este puzzle exactamente como creo debe funcionar. Os aseguro que no hay ninguna receta infalible y quizá deba traducir este artículo al inglés, serán muchos los que me lo agradecerán.

## Nuestro fallo:

Esta pelea ha comenzado porque la piedra angular de todo este puzzle, el SEO, estaba fallando y no eramos conscientes. Tras la actualización a Angular 9 y la consiguiente refactorización de nuestra solución, scripts y pipelines de Azure, Build & Release ([1](https://stackoverflow.com/questions/61574428/angular-9-universal-deployment-woes/62228308#62228308) y [2](https://stackoverflow.com/questions/59747892/questions-on-net-core-3-1-angular-ssr-spa-usespaprerendering-alternative/62228288#62228288)), el problema ha pasado desapercibido hasta que, llegando a una sección de la página donde estábamos usando traducciones dinámicas, hemos visto que las traducciones siempre llegaban en el mismo idioma.

¿Esto no estaba funcionando?

Para traducir el contenido de forma dinámica lo más sencillo es decirle al API el idioma en el que queremos la respuesta. Hay muchas técnicas pero nosotros hemos usado un Language Interceptor que añadía el Header "Accept-Language" de acuerdo al idioma utilizado en LOCALE\_ID:

En el servidor estábamos procesando dicho header para hacer nuestra propia magia con las traducciones (no puedo desvelar todos nuestros secretos, éste se merece una artículo aparte) y lo que pudimos observar es que, tras la migración a Angular 9 y aplicar nuestra solución el LOCALE\_ID de la parte servidor siempre era el mismo.

## Las piezas del puzzle

Este puzzle tiene muchas piezas a tener en cuenta y todas están relacionadas:

- Los idiomas para los que traducimos nuestra app
- El fichero angular.json
- Los scripts que definimos en nuestro package.json
- El la estructura de archivos y carpetas que generaremos para desplegar nuestra app SSR+i18n
- El depsliegue en si mismo

### 1.- Los idiomas

En este ejemplo vamos a usar tres 'locales', es decir tres idiomas o tres culturas, diferentes, el idioma base de nuestra app, 'en-US' (inglés de Estados Unidos), 'es' (Español), y 'en' (Inglés). Los idiomas en angular quedan definidos en el token global LOCALE\_ID.

> Proporcione este token para establecer la configuración regional de su aplicación. Se utiliza para la extracción i18n, por tuberías i18n (DatePipe, I18nPluralPipe, CurrencyPipe, DecimalPipe y PercentPipe) y por expresiones ICU.

Es importante que tengamos en cuenta que lo necesitamos en ambos extremos de nuestra aplicación, en el cliente para todo lo que tiene que ver con el front puro y en el backend (¡Éste es el famoso backend del frontend señores!) para que podamos internacionalizar nuestra relación con el API desde el backend.

### 2.- El fichero angular.json

Relacionado completamente con lo anterior tenemos el fichero angular.json, aquí es donde se configuran todos los aspectos de nuestra aplicación. Debemos tener en especial en varias secciones.

- NuestroProyecto/i18n: aquí debemos definir el sourceLocale (el idioma base) y los idiomas a los que vamos a traducir la aplicación, incluyendo para cada uno de ellos la ruta a su fichero de traducciones y so ruta base.
- NuestroProyecto/architect/build/configurations donde tendremos la confgiguración base poara producción y las particularidades de cada traducción (creo, y digo creo, que el outputPath sólo se utiliza por los scripts y la arquitectura de compilación)
- NuestroProyecto/architect/serve/configurations donde definimos los browser Targets por configuración, el base y las traducciones.
- NuestroProyecto/architect/server/configurations donde le debemos decir explícitamente que queremos localizar el servidor, esto hará que la build nos genere una carpeta con cada server localizado.

### 2.- Los scripts que definimos en nuestro package.json

Debería limpiar un poco este fichero... Nos importa principalmente 'build:ssr' pero si eres curioso encontrarás alguna herramienta útil aquí:

### 3.- Estructura de nuestra app con SSR + i18n

El resultado de ejecutar npm run build:ssr es que en la carpeta dist tendremos el siguiente contenido:

- ourProyectNameGoesHere ;)
    - browser
        - en
        - en-US
        - es
    - server
        - en
        - en-US
        - es
    - packages.json
    - proxy-server.json

Y te preguntarás (deberías): ¿Qué son estos dos ficheros? Bien, en una de las muchas preguntas que hay por GitHub y StackOverflow sobre este tema y que ahora no consigo encontrar se habla de la necesidad de tener n instancias del servidor o de utilizar un proxy que redirija a cada uno de los servidores localizados de acuerdo a la ruta de la petición original. Como no estamos para tirar el dinero nuestra solución ha sido implementar la segunda opción para lo cuál os voy a dejar tanto el contenido de esos dos ficheros como server.ts. (Atentos a server.ts porque aquí hay otra perla escondida, y es que aquí declaramos las típicas variables que dan problemas al usar SSR, variables que suelen tener sentido en un navegador pero que no existen en el lado del servidor a no ser que las declaremos previamente):

- **proxy-server.js** será quien instancie y redirija a nuestro servidor localizado:

- **server.ts** será compilado por cada idioma que tengamos configurado y utilizado por el proxy, el cuál llamará a app(lang) donde el lang determinará a su vez el LOCALE\_ID que utilizará esa instancia del server. (Braaavo!)

Ojo porque gasté más de un día entero en averiguar que el orden del import de AppServerModule afectaba a la build y a la ejecución. También hay que remarcar que si no queremos que se intente ejecutar una instancia del servidor por cada locale debemos evitar ese run(), por eso hemos añadido !environment.production a la condición. (Si, hay ciertos ficheros que merecen ser comentados, especialmente los que contienen conjuros y magia negra.)

- **package.json** va a ser clave en nuestro despliegue porque en él vamos a incluir las dependencias de nuestro proxy, que como veréis son pocas:

### 4.- El despliegue en si mismo

Esta nueva estructura de nuestra aplicación nos ha obligado a cambiar nuestra pipeline de despliegue. Como quiero hacer un artículo sobre como se hace un DevOps de un sistema profesional con Azure y como podemos jugar con nuestras subscripciones no voy a entrar en muchos detalles. Lo importante es que el contenido que tenemos en la carpeta dist lo empaquetamos como resultado de la pipeline de compilación y, tras los reemplazos de secretos que hacemos en cada entorno (lo explicaré, os lo prometo) lo descomprimimos en nuestro AppService y ejecutamos npm install en el post script para que si instale express. Hecho esto la aplicación queda desplegada y funcionando y el resultado es que si pido contenido dinámico en la web mostrada en español (castellano me gusta más) la petición.

Así es como se ve esto en el App Service Editor de nuestro entorno de desarrollo.

![](../../../assets/img_not_found.jpg)  

A lo largo de mañana haremos un Pull Request y desplegaremos en Staging y luego en Producción... Y quizá, tras arreglar algún pequeño bug más podamos dar por cerrado nuestro MVP v1 y podamos ponernos a trabajar en todo el backlog que tenemos listo para nuestra v2.

Espero que este artículo le sea de ayuda a los que están peleando con Angular, SSR, la internacionalización y los despliegues. Para mí, que ya no soy ningún novato, este tema me parece complejo y enrevesado.

I hope it helps!

Juan
