---
title: "Arquitectura de aplicaciones Android"
description: ''
pubDate: 2012-11-28
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "devops"
  - "gestion-proyectos"
tags: 
  - "sw-architecture"
  - "software"
---

Estos días ando con varias peleas con la nueva versión de Gredos Virtual 3D pero tengo pendiente desde hace bastante tiempo publicar un artículo destripando un poco la arquitectura de ésta aplicación. En concreto de lo que quiero hablar aquí es de un diseño que me ha demostrado ser bastante eficiente y que creo que es reutilizable en casi cualquier futura aplicación Android tanto por su versatilidad como por su robustez. 

  

Doy por hecho que cualquiera que esté leyendo ésto está buscando una buena solución para la interfaz de usuario de su aplicación, ésta solución busca robustez y versatilidad y que el crecimiento en funcionalidades sea fácil de acometer sin suponer un grave impacto en la experiencia de usuario. Siguiendo las pautas que daré a continuación podremos conseguir que todas las actividades de nuestra aplicación sean homogéneas tanto en el flujo de control como en los aspectos visuales. No voy a pegar código pues creo que lo que se explica aquí cualquiera con algo de experiencia con Android lo puede codificar por si mismo, lo importante es pensar primero, realizar un buen diseño que es lo que aquí se intenta y codificar después, quizá si deje algún enlace a entradas de StackOverflow pero no código propio a no ser que me lo pida algún lector.

  

Vamos al grano. ¿Qué se le debe pedir a una aplicación móvil? En general las aplicaciones móviles suelen tener una Splash Screen, es decir, una pequeña pantalla con un logo o una barra de progreso indicando la carga de la aplicación, esto es totalmente opcional pero le da a nuestras aplicaciones un "toque" profesional. Lo siguiente suele ser un panel de control, una pantalla o actividad que será el centro neurálgico del resto de la aplicación desde donde accederemos a las distintas funcionalidades y en donde queda presente por medio de estilos la imagen y apariencia de la aplicación, imagen que queremos mantener a lo largo del resto de actividades. El resto de actividades de nuestra aplicación podrían, es más, deberían mantener la homogeneidad con la pantalla de inicio, el panel de control, e incluir todas ellas las mismas opciones. ¿Cómo podemos hacer ésto sin repetir código? 

  

La respuesta a éste primer interrogante, atendiendo al principio DRY (Don't Repeat Yourself) y a la S y la O de SOLID (SRP: Single Responsiblity Principle y OCP: Open Closed Principle) es utilizar herencia, de ésta forma no repetiremos código en cada una de nuestras actividades y abriremos nuestra aplicación a la extensión consiguiendo que cada actividad se centre en una única responsabilidad. El simple hecho de utilizar una clase BaseActivity que aglutine las funciones, las acciones y los flujos comunes como podrían ser ir a inicio, realizar una búsqueda o las comprobaciones pertinentes hacia el usuario, permite a las actividades que hereden de ésta clase base despreocuparse de estas responsabilidades y centrarse en lo que de verdad importe en cada una de ellas. Eso respecto a la lógica de la aplicación y el flujo entre actividades nos da potencia, robustez, homogeneidad y versatilidad, ¿qué más se puede pedir? 

  

Respecto a los aspectos visuales tenemos la herencia entre layouts, no existe, al menos hasta donde yo sé, una herencia como tal entre layouts de Android pero sí que existe la directiva <Include> con la que en cada layout de cada actividad que herede de BaseActivity podamos incluir por ejemplo una o más barras de tareas con las acciones comunes implementadas en BaseActivity así:

  

```
<include layout="@layout/tasksbar"/>...<include layout="@layout/footerbar"/>
```

  

Otro aspecto arquitectural importante suele ser mantener un contexto de aplicación, un nexo de unión entre las distintas actividades que contenga, por decirlo de alguna manera, estados, objetos o información de carácter global, que asegure dependencias y que sirva de nexo para todas las actividades de nuestra aplicación. Para ésto lo mejor, en mi opinión, es definir una clase propia que extienda a Application y declararla en el fichero AndroidManifest.xml de nuestra aplicación en la que podremos controlar, independientemente de qué suceda en cada actividad y de cuál se lance primero, qué sucede  cuando se crea, se pausa, se "resume" o relanza y se termina la aplicación por ejemplo instanciando distintos recursos como servicios o controladores, pausándolos y resumiéndolos cuando sea necesario y liberando la memoria utilizada por ellos al salir. 

  

Mediante estas tres pautas, una actividad base, un correcto uso de los layouts y un buen contexto de aplicación nuestras aplicaciones ganarán en profesionalidad, en robustez, en versatilidad y estaremos preparados para el cambio y para que nuestras aplicaciones crezcan sin demasiadas implicaciones y efectos colaterales pues podremos centrarnos bien en los cambios que haya que realizar en cierta actividad o bien en desarrollar una nueva actividad con una nueva funcionalidad y adaptar el flujo de nuestra aplicación en muy poco tiempo y sin demasiadas complicaciones. 

  

Enlaces:

  

Herencia en actividades (BaseActivity):  
[Android how to create my own Activity and extend it ?](http://stackoverflow.com/questions/3156940/activity-layout-inheritance)  
[How to minimize duplication code in Android without creating Objects](http://stackoverflow.com/questions/10060709/how-to-minimize-duplication-code-in-android-without-creating-objects)  
[Options Menus and Base Activities](http://chrisrisner.com/31-Days-of-Android--Day-6%E2%80%93Options-Menus-and-Base-Activities)  

  

Sobre <Include>:

[Activity layout inheritance](http://stackoverflow.com/questions/3156940/activity-layout-inheritance)

[Does Android support layout inheritance (similar to Django templates)?](http://stackoverflow.com/questions/4329626/does-android-support-layout-inheritance-similar-to-django-templates)

  

Contexto de Aplicación:

[Using Application context everywhere?](http://stackoverflow.com/questions/987072/using-application-context-everywhere)

[Defining Global Variables in Android](http://androidresearch.wordpress.com/2012/03/22/defining-global-variables-in-android/)

  

Patrones de diseño para Android:

[Patterns | Android Developpers](http://developer.android.com/design/patterns/index.html)

[Android Design Patterns](http://www.androiddesignpatterns.com/)

[Android Patterns](http://www.androidpatterns.com/)

  

Espero que ésta lectura y los enlaces hayan sido útiles y recibir comentarios tipo "quiero saber más sobre ésto", "En ésto te equivocas" o "Gracias, me ha sido muy útil éste artículo".  
  
Un saludo.

  

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
