---
title: "SCRUM: Planificación de un Sprint"
description: ''
pubDate: 2012-08-24
categories: 
  - "desarrollo-software"
  - "gestion-proyectos"
  - "proyectos"
---

El **objetivo de un Sprint** es **entregar** cierta **cantidad de producto** con cierta **calidad** y en cierto **intervalo de tiempo**. Si hablamos de software estamos hablando de funcionalidades, si por ejemplo hablamos de ventas o de marketing podríamos hablar de alcanzar ciertos objetivos o comenzar ciertas campañas. En el fondo **el Sprint busca convertir pequeños objetivos en grandes logros**.

  

Pero volvamos al Desarrollo de software. Un **Sprint** debe comenzar con un **Sprint Planning**, una **reunión** entre el **jefe de producto** y el **grupo de trabajo**, incluido el **Scrum Master**. El objetivo de ésta reunión no es otro que determinar las funcionalidades en las que se va a trabajar durante éste Sprint. El jefe de producto presenta un listado de **funcionalidades deseadas** y **es el equipo quien**, de acuerdo a sus experiencia y sus conocimientos sobre el estado actual del desarrollo, **elige las funcionalidades que cree que puede desarrollar completamente dentro de dicho Sprint**.

  

En ésta reunión suele haber **dos partes**. En la primera parte el equipo selecciona del **Product Backlog** las historias de usuario que irán al **Sprint Backlog**. Una vez seleccionadas el jefe de producto puede abandonar la reunión si lo desea. En la segunda parte **el equipo cuantifica** las historias, primero analiza la arquitectura y los requisitos necesarios para desarrollar cada historia **y divide la historia en distintas tareas** de acuerdo a dicha arquitectura, a los requisitos, a su experiencia con historias pasadas y a su metodología interna de trabajo. Esta parte suele ser muy particular en cada grupo de trabajo y es lo que hace que cada historia sea distinta. Por ejemplo, el grupo de trabajo podría decidir dividir una historia en las siguientes tares: modificar el modelo lógico, aplicar dicha modificación a la actual base de datos, definir las pruebas de aceptación, generar las vistas necesarias para la historia, generar los view-models necesarios para la historia, crear cierto servicio o adaptar un controlador anterior al nuevo modelo.

  

**Una vez** que las historias del Sprint han sido **divididas** en tareas lo que se hace siempre es **cuantificarlas**, quiero decir, **medirlas** o "**pesarlas**". Me quedo con el término "pesar" porque es el que mas he usado durante el día a día. Pero: **¿cómo se pesa una tarea?** 

  

Las tareas **se pesan en puntos** (a veces también se pesan en tallas de camisetas) y el proceso de pesado de cada tarea se realiza en una especie de **partida de poker**. **La relación entre puntos y horas de trabajo no es ideal**, hay que tener en cuenta varios **factores** a la hora de asignar puntos a las tareas. El primer factor, lógicamente, es el **tiempo estimado**, claro, pero también hay que tener en cuenta la **dificultad** de la tarea en cuestión, una tarea difícil puede suponer un desgaste de quien esté con ella y eso supondrá un incremento de las horas, es decir, de los puntos que pesa. Otro factor es la **duda**, si se duda entonces en la dificultad o la cantidad de horas que llevará hay que tenerlo también en cuenta, generalmente al alza. Otro factor es el **riesgo**, si la tarea supone un alto riesgo en la planificación global también habría que estimar al alza. Generalmente se pesan las tareas utilizando 0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40 y 100 puntos. Habrá quien ponga más puntos, habrá quien los quite. Yo soy de los que quito. Siempre suponiendo que la tarea la realice una sola persona la relación entre puntos y tiempo sería la siguiente:

  

![](../../../assets/img_not_found.jpg)  

  

**0** puntos: como mucho una hora en realizarlo.

**1/2** punto: no debería suponer más de medio día ideal, es decir, 4 horas.

**1** punto: **alrededor de un día** de trabajo, unas 8 horas.

**2** puntos: entre **1 y 2 días**.

**3** puntos: entre **2 y 4 días**.

**5** puntos: entre **3 y 5 días** de trabajo.

**8** puntos: algo más de una semana, entre **5 y 8 días** de trabajo.

**13** puntos: alrededor de **2 semanas**.

**20** puntos: entre **2 y 3 semana**s.

**40** puntos: alrededor de **un mes**.

**100** puntos: **demasiado** grande.

**?** puntos: **no tengo ni idea** de lo que implica esta tarea.

  

Como se ve, **cuantos más puntos pese una tarea más incertidumbre hay sobre el tiempo que llevará realizarla**. Antes he dicho que soy de los que quita cartas y es exactamente por éste motivo. He trabajado con Sprints de dos y Sprints de 3 semanas de duración y en ambos me han sobrado las cartas de 20 y de 40 puntos. Una tarea de 100 significa que esa tarea está mal planteada, seguro que se puede dividir en subtareas y planificarlas y pesarlas por separado. Además de éstas cartas muchas barajas de Scrum Poker incluyen una **taza de café** cuyo significado es evidente: **estoy cansado y necesito un descanso, os invito a un café.**

  

Entonces, **¿cómo se hace ésto del Scrum Poker?** Bien, hemos dividido, de acuerdo con nuestra manera de trabajar en grupo, con la arquitectura, con los requisitos, etcétera, cada historia en tareas. Cogemos una tarea, **hablamos** un poco sobre ella **y procedemos a "pesarla"**. Para ello, cada miembro del equipo coge la carta que cree que representa lo que pesa esa tarea en puntos, teniendo en cuenta lo que ya he mencionado, el tiempo estimado, la dificultad y el riesgo o las dudas. Una vez que todos los miembros del grupo han seleccionado su carta se procede a **enseñar las cartas todos a la vez**. 

  

Con las cartas sobre la mesa lo suyo es que se llegue a un **consenso**, generalmente la **diferencia entre la carta mas alta y la mas baja** suele ser poca y hay que preguntarle a quien ha mostrado la carta mas baja y al que ha mostrado la carta más alta por qué piensan así. Si no se llega a un consenso se somete de nuevo a votación. **Ésto propicia un intercambio constructivo y detallado de opiniones y saca a relucir aspectos** sobre el desarrollo de cada tarea **que quizá no todos los miembros del equipo tuvieron en cuenta** y **reduce el impacto negativo** **que suelen tener en las planificaciones los optimismos y los catastrofismos desmesurados**.

  

El Scrum Poker es una buena práctica en la planificación por todo lo mencionado antes pero ojo, **siempre hay alguien que enseña sus cartas demasiado pronto**:

  

![](../../../assets/img_not_found.jpg)  
[http://www.scrumshortcuts.com/blog/scrumtrooper-images/](http://www.scrumshortcuts.com/blog/scrumtrooper-images/)

  

Una vez acabado el **Scrum Poker** con cada tarea del **Sprint Backlog** no hay que dar por finalizada la reunión. Si el **Scrum Master** ha hecho bien su trabajo habrá ido tomando nota de todo lo que se ha hablado y de los pesos de cada tarea. **Antes de terminar hay que ver si**, de acuerdo a medidas anteriores, **el grupo** de trabajo **es capaz de enfrentarse a la cantidad de puntos que han salido en total**. Si resulta que el total de puntos de las tareas está por encima de los puntos que se estima que el grupo puede realizar con éxito entonces hay que llamar de nuevo al jefe de producto para pedirle que nos ayude a **descartar alguna historia** de usuario pero si la suma de puntos está por debajo deberemos **pedirle que nos dé más historias** de usuario para alcanzar el límite de puntos que sabemos que podemos realizar como grupo. 

  

Se han escrito artículos muy extensos e incluso libros sobre la planificación de Scrum pero en mi opinión no hay mucho más que decir, tan sólo añadir algo que ya he dicho y es que las metodologías están a nuestro servicio y no al revés.

  

Para acabar el artículo de hoy os dejo un par de **juegos de cartas** de **Scrum Poker**, juegos de cartas hay muchos, aquí os dejo tan solo un par de muestras que he encontrado por Internet:

- [Cartas de Autentia](http://www.autentia.com/zip/AutentiaPlanningPokerCardsCC.zip)
- [Juego de Third Angle](http://www.fperezp.com/blog/documents/Cartas_Scrum_Poker.zip)

También existen muchas **aplicaciones de escritorio y apps Android**, quizá hasta haya demasiadas.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
