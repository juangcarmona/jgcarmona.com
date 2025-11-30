---
title: "Sobre requisitos e iteraciones en metodologías ágiles"
description: ''
pubDate: 2013-02-24
categories: 
  - "desarrollo-software"
  - "desarrollo-personal"
  - "gestion-proyectos"
---

Cuando se trata de la creación de aplicaciones a medida, muchos de nosotros creemos que es posible predecir con exactitud el tiempo que un grupo de desarrolladores necesita para crear el software que cumpla con nuestros requisitos. También queremos creer que sabemos cuáles son esos requisitos desde el principio, antes incluso de haber hecho ningún análisis o haber oído las necesidades del cliente en profundidad pensando que los requisitos no van a cambiar durante el desarrollo. Ayer mismo oí que "el problema de éste proyecto es que los requisitos están cambiando constantemente" y eso es lo que hoy me lleva a escribir ésta pequeña entrada.

  

En general nada de lo anterior es cierto en la mayoría de los proyectos, no es posible la predicción en un desarrollo a largo plazo, digamos que de más de un año, en gran parte debido a que no se pueden obtener los requisitos totalmente detallados por adelantado y según va creciendo el proyecto tendremos que ir dejando que los requisitos se adapten a los deseos del cliente. Tenemos que dejar evolucionar los requisitos porque aunque suene como el típico tópico el cliente siempre tiene razón, él es quien nos paga, quien nos da de comer, y quien durante y después del desarrollo nos criticará o nos alabará y de quien dependerá nuestra reputación en el futuro y no podemos negar estas realidades. Muchas empresas siguen utilizando procesos de desarrollo de software que no funcionan bien y que alimentan pensamientos inadecuados en arquitectos, analistas, desarrolladores etcétera y que influyen negativamente en la moral indivudual y colectiva.

  

Por suerte parece que esto está cambiando, hay metodologías cada día más populares como SCRUM que pregonan que "el cambio es bienvenido" y buenas prácticas de desarrollo ya comentadas en éste mismo blog que preparan nuestro código para ello. Nos adaptamos y adaptamos nuestras arquitecturas y nuestros diseños a la realidad o fracasamos, esa es la cuestión y la realidad es que hay que adaptarse a los cambios. 

  

Haciendo el desarrollo de software de esta manera, de una manera ágil al fin y al cabo, puede dar miedo al principio, los procesos ágiles son por lo general mejores tanto para los equipos de desarrollo como para los comerciales o empresarios que pagan las facturas y para entender por qué esto es así, tenemos que empezar por entender lo que es un proceso ágil en realidad.

  

**¿Qué significa el desarrollo ágil?**

  

Es una gran pregunta y muy a la orden del día. El reto en cualquier proyecto de desarrollo de software siempre es el mismo: crear software en un contexto de incertidumbre. Al inicio de un proyecto de desarrollo no sabemos si hemos definido bien los requisitos y tampoco si éstos requisitos cambiarán mientras estamos desarrollando e implantando el software.

  

Un proceso de desarrollo tradicional hace lo posible para fingir que esta incertidumbre no existe. En el enfoque de cascada clásico, por ejemplo, una organización crea planes detallados y calendarios precisos antes de escribir ningún código. Lo puedo decir alto y claro porque me avalan miles de experiencias fallidas a lo largo de la historia de la ingeniería del software: ¡esto está mal! ¡Es un error! Los proyectos reales rara vez cumplen con estos planes y programas porque a pesar de que se utiliza el término "ingeniería del software", escribir código no es como otros tipos de ingeniería, yo siempre digo que se trata de un proceso de ingeniería y un proceso artístico-creativo a partes iguales. Para construir un puente, un edificio, un barco o un satélite de comunicaciones es posible definir unos requisitos por adelantado y darle una forma concreta que quedará plasmada en unos planos que no cambiarán a lo largo de la fabricación... Sin embargo en proyectos de software ésto nunca ha sido posible aunque se ha intentado innumerables veces porque la creación de requisitos estables por adelantado es generalmente imposible, en parte porque la gente no sabe realmente lo que quiere hasta que no lo ven. Además es difícil basar un proyecto en experiencias previas ya que cada proyecto de desarrollo implica cierto grado de innovación porque si no fuera así sería más fácil comprar algún producto comercial que desarrollar uno a medida.

  

Los procesos tradicionales van de espaldas a la realidad y sin embargo los procesos ágiles están pensados para estas situaciones. Un proceso ágil proporciona una manera de agregar, eliminar y modificar  requisitos durante el desarrollo y, como tan claramente propone SCRUM, en vez de oponerse al cambio, éste tiene que ser bienvenido. Algo también importante en procesos ágiles es que reconocen que a corto plazo los planes son más estables que a largo plazo lo que hace posible que aunque no sepamos exactamente lo que se quiere en un futuro a medio plazo, digamos tres meses, probablemente si sabemos lo que queremos hacer a corto plazo, digamos durante las próximas tres semanas, la duración típica de un Sprint SCRUM.

  

Para lograr esto, un proceso de desarrollo ágil se basa en la iteración como unidad de trabajo, una unidad de tiempo que será analizable y cuantificable sobre la que se pueden aplicar métodos científicos en busca de optimizaciones. Un gran avance en muchos aspectos.

  

**¿Qué se espera de una iteración?**

  

Cada iteración crea más producto acabado, es decir, aporta valor añadido a nuestro software sobre unos  requisitos actualizados al comienzo de cada una de ellas. Un proceso de desarrollo ágil es iterativo si ofrece la posibilidad de añadir, eliminar o modificar los requisitos del proyecto al comienzo de cada iteración, es decir, de cada pequeño ciclo y en esto se fundamenta uno de los procesos ágiles mas utilizados en la actualidad: SCRUM.  
  

Como ya he hablado y ofrecido en éste mismo blog [mi visión de SCRUM](http://juan-garcia-carmona.blogspot.com.es/2012/08/mi-resumen-de-scrum.html)(\*[1](http://juan-garcia-carmona.blogspot.com.es/2012/08/mi-resumen-de-scrum.html), [2](http://juan-garcia-carmona.blogspot.com.es/2012/08/scrum-planificacion-de-un-sprint.html), [3](http://juan-garcia-carmona.blogspot.com.es/2012/08/scrum-boards.html)) hoy quiero volver a hablar sobre sobre Scrum, pocas palabras, ésta vez sobre una parte importante de éste proceso ágil: el jefe de producto o Product Owner, que representa al cliente o patrocinador del proyecto. El Product Owner no tiene por qué entender de código, no es un papel técnico, tan sólo tiene que tener claro lo que quiere y cómo lo quiere y, mediante un contacto y un feedback continuo con el equipo de desarrollo conseguir que el equipo haga lo que tiene que hacer y desarrolle exactamente lo que tiene que desarrollar.  
  

Desde la perspectiva de un patrocinador comercial, la iteración (que en Scrum se conoce como SPRINT) consta de cuatro pasos:  

1. En primer lugar, el Product Owner crea a una lista de elementos a desarrollar y les asigna una prioridad, esta lista se denomina Product Backlog y contiene los requisitos  del producto. Ésta lista es dinámica y cambia con el tiempo, con cada iteración. 
2. A continuación, atendiendo a las prioridades definidas por el Product Owner, el equipo selecciona qué elementos van a desarrollar y crean lo que se conoce como Sprint Backlog. 
3. El equipo de desarrollo implementa los elementos seleccionados, y lo hacen "a su manera" autogestionándose y sin intromisiones externas, y el resultado del Sprint es un software potencialmente entregable, en otras palabras, es una aplicación útil y probada que incluye los elementos en el sprint backlog junto con los de anteriores Sprints.
4. Una vez que el Sprint ha terminado el equipo de desarrollo muestra su trabajo al Product Owner para que lo valide. El Product Owner puede entender, de esta manera, lo que realmente se está creando y cómo se está haciendo y durante las demostraciones se podrán incluir sugerencias sobre nuevas características o cambios que, si el Product Owner ve convenientes, podrían convertirse en parte del Product Backlog.

Al acabar la iteración o Sprint los requisitos podrían haber cambiado, de hecho, no sería raro que lo hicieran, o podría haber requisitos nuevos o se podrían haber eliminado requisitos aún no desarrollados pero esto, en contraposición a procesos clásicos de desarrollo de software, no será un problema en absoluto ya que el Product Owner actualizará el Product Backlog, volverá a asignar prioridades y el proceso comenzará con la selección por parte del equipo de desarrollo de un nuevo conjunto de requisitos, Sprint Backlog, a desarrollar durante el siguiente Sprint.  
  
Éste proceso continúa hasta que una de éstas tres cosas ocurre:  

1. El proyecto se queda sin dinero 
2. Se acaba el tiempo total asignado al proyecto 
3. Todos los elementos del Product Backlog son implementados y se entrega el producto acabado.

Creo que están claros muchos de los beneficios del desarrollo ágil pero voy a intentar enumerarlos:  
  

1. El equipo tiene más posibilidades de crear lo que la empresa realmente necesita.
2. Hay un responsable directode crear y dar prioridad a los elementos del product backlog y en definitiva de que el producto satisfaga las necesidades reales de la empresa, el Product Owner.
3. El equipo desarrolla los requisitos más importantes primero, algo que es bueno para la empresa ya que es mucho más probable conseguir lo que quiere, o acercarse mucho al resultado deseado en caso de que acaben faltando recursos monetarios o del tipo que sean.
4. Y debido a que el proceso es iterativo, hay muchas posibilidades de hacer cambios.
5. El Product Owner obtiene una gran comprensión, un gran conocimiento, de lo que se creó durante el proyecto. Y un punto de vista objetivo y directo del proyecto en cada iteración, pudiendo cambiar lo que ocurra o se aborde en la siguiente.
6. No hay nada como ver, usar y ver usar a otros las primeras versiones de software, es la mejor manera de entender lo que los usuarios realmente quieren, son pasos hacia el éxito.

Pero ojo, el riesgo de un proyecto no se reduce sólo por aplicar metodologías ágiles, siempre hay riesgos. La metodologías ágiles iterativas permiten medir la idoneidad, es decir, si se está desarrollando lo que hay que desarrollar, pero siempre habrá riesgos en cuanto a plazos de entrega, riesgos arquitectónicos y, principalmente, riesgos organizativos. Imaginemos una gran compañía con un gran departamento dedicado al desarrollo de software para uso interno o para incluirlo en sus productos. Puede suceder, sería lo lógico, que este gran departamento incluyera a gente gestora de proyectos, gente de análisis de requisitos y gente de desarrollo y arquitecturas de software. Y puede suceder y sucede que el exceso de burocracia haga que los requisitos cambien en una dirección y varios sprints después cambien en la contraria para luego volver al planteamiento incial dos o tres sprints después con el consiguiente gasto de tiempo y dinero y la consecuente frustración del personal humano involucrado en las decisiones, el análisis, la gestión y el desarrollo. Estas cosas pasan, yo lo he visto con mis propios ojos, el exceso de burocracia es un riesgo no asumido y desgraciadamente difícilmente asumible pues en las grandes compañías siempre hay largas cadenas de mando y responsabilidades y al final hay muchas cabezas pensantes las cuales, durante pequeños momentos de gloria, ejercen momentáneamente de jefes de producto imponiendo sus opiniones sin conocer cuál ha sido la evolución real del proyecto. Esto desencadena requisitos que quizá  ya fueron desarollados y después eliminados o modificados por el motivo que fuera, funcionalidades que volverán a ser analizadas por los grupos de análisis, probablemente de mala gana, y re-desarrolladas en un ambiente poco deseable por los desarrolladores.  
  
Ésto es a lo que se refería aquel compañero del que hablaba al principio y lo que me ha llevado a escribir éste artículo y son estos cambios erráticos de requisitos provocados por los excesos de burocracia, por las largas cadenas de mando y por los múltiples egos involucrados en grandes proyectos con los que quiero cerrarlo.  
  
Hasta la próxima entrada,  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)  
[  
](mailto:d.jgc.it@gmail.com)[](mailto:d.jgc.it@gmail.com)  
[  
](mailto:d.jgc.it@gmail.com)
