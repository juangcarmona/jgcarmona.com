---
title: "Principios SOLID"
description: ''
pubDate: 2012-09-02
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "gestion-proyectos"
tags: 
  - "sw-architecture"
  - "software"
---

Éste es el primero de una serie de cinco artículos sobre los que hablaré de los principios SOLID. No voy a reinventar la rueda ni a redefinirlos, una clara definición de los principios SOLID la podemos encontrar en wikipedia:

> En [ingeniería de software](http://es.wikipedia.org/wiki/Ingenier%C3%ADa_de_software), SOLID (Single responsibility, Open-closed, Liskov substitution, Interface segregation and Dependency inversion) es un [acronimo](http://es.wikipedia.org/wiki/Acronimo) [mnemónico](http://es.wikipedia.org/wiki/Mnem%C3%B3nico) introducido por [Robert C. Martin](http://es.wikipedia.org/w/index.php?title=Robert_C._Martin&action=edit&redlink=1)[1](http://es.wikipedia.org/wiki/SOLID_\(object-oriented_design\)#cite_note-ub-old-web-solid-0) a comienzos de la decada del 2000 que representa cinco principios básicos de la [programación orientada a objetos](http://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos) y el [diseño](http://es.wikipedia.org/wiki/Dise%C3%B1o_orientado_a_objetos). Cuando estos principios se aplican en conjunto es más probable que un [desarrollador](http://es.wikipedia.org/wiki/Programador) cree un sistema que sea fácil de [mantener](http://es.wikipedia.org/wiki/Mantenimiento_de_Software) y ampliar en el tiempo. Los principio SOLID son guías que pueden ser aplicadas en el desarrollo de software para eliminar [código sucio](http://es.wikipedia.org/w/index.php?title=Code_smell&action=edit&redlink=1) provocando que el programador tenga que [refactorizar](http://es.wikipedia.org/wiki/Refactorizaci%C3%B3n) el [código fuente](http://es.wikipedia.org/wiki/C%C3%B3digo_fuente) hasta que sea legible y extensible. Debe ser utilizado con el [desarrollo guiado por pruebas](http://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas) o TDD, y forma parte de la estrategia global del [desarrollo ágil de software](http://es.wikipedia.org/wiki/Desarrollo_%C3%A1gil_de_software) y [programación adaptativa](http://es.wikipedia.org/w/index.php?title=Adaptive_Software_Development&action=edit&redlink=1).

Para mí ésta definición es perfectamente válida aunque se podría resumir diciendo que son cinco principios que hay que tener siempre presentes si queremos desarrollar un software de calidad, legible, entendible y fácilmente testeable.  
  
Lo siguientes cinco artículos van enfocados a entender, uno por uno, estos cinco principios. La estructura de cada artículo es siempre la misma:  
  

1. Definición de Robert C. Martin sobre cada principio, en inglés.
2. Traducción literal.
3. Mi propia traducción o una breve explicación. 
4. Un ejemplo que no cumple el principio y una explicación de por qué no lo cumple.
5. Una solución a dicho ejemplo para que cumpla el principio.

Los cinco principios son:

  

- [SRP: Single Responsibility Principle](http://juan-garcia-carmona.blogspot.com/2012/09/srp-single-responsibility-principle.html)
- [OCP: Open/Closed Principle](https://jgcarmona.com/ocp-open-closed-principle-principio-abierto-cerrado)
- [LSP: Liskov Substitution Principle](http://juan-garcia-carmona.blogspot.com/2012/09/lsp-liskov-substitution-principle.html)
- [ISP: Interfaze Segregation Principle](http://juan-garcia-carmona.blogspot.com/2012/09/isp-interface-segregation-principle.html)
- [DIP: Dependency Inversion Principle](http://juan-garcia-carmona.blogspot.com/2012/09/dip-dependency-inversion-principle.html)

Espero que estas explicaciones y los propios principios SOLID le sean útiles tanto a programadores newbies como a desarrolladores altamente experimentados y espero también comentarios y críticas de los lectores. 

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
