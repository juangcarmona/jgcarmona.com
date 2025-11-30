---
title: "Principios SOLID"
description: ''
pubDate: 2012-08-20
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "gestion-proyectos"
  - "proyectos"
  - "testing-software"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/image-3.png"
---

Los principios SOLID son cinco principios enunciados por Robert C. Martin alrededor del año 2000 enfocados a la elaboración de software de calidad. Estos cinco principios hay que tenerlos siempre presentes si queremos desarrollar un software legible, entendible y fácilmente testeable. Se ha escrito mucho al respecto y ésta pequeña tabla quiere ser mi aportación sobre los principios SOLID:

  

| Inicial | Acrónimo | **Detalles** |
| --- | --- | --- |
| S | [SRP](https://jgcarmona.com/srp-single-responsibility-principle-principio-de-unica-responsabilidad/) |   **[Single Responsibility Principle](https://jgcarmona.com/srp-single-responsibility-principle-principio-de-unica-responsabilidad/)**  **Principio de Única Responsabilidad**      "**There should never be more than one reason for a class to change.**" — Robert Martin      **Traducción literal:** "No debería haber nunca más de una razón para cambiar una clase."       **Mi traducción:** Una clase debería concentrarse sólo en hacer una cosa. Ésto no significa que sólo tenga un métido sino que todos los métodos, públicos o privados, deberían estar enfocados a un solo propósito.                 |
| O | [OCP](https://jgcarmona.com/ocp-open-closed-principle-principio-abierto-cerrado) |   **[Open Closed Principle](https://jgcarmona.com/ocp-open-closed-principle-principio-abierto-cerrado)**  **Principio abierto/cerrado**      "**Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.**" — Robert Martin parafraseando a Bertrand Meyer       **Traducción literal:** "Las entidades de software (clases, módulos, funciones, etcétera) deberían estar abiertas a la extensión pero cerradas a la modificación."      **Mi traducción:** Cambia el comportamiento de una clase mediante herencia y composición.                  |
| L | [LSP](https://jgcarmona.com/lsp-liskov-substitution-principle-principio-de-sustitucion-de-liskov/) |   **[Liskov Substitution Principle](https://jgcarmona.com/lsp-liskov-substitution-principle-principio-de-sustitucion-de-liskov/)**  **Principio de sustitución de Liskov**      "**Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.**" — Robert Martin      **Traducción literal:** "Las funciones que utilicen punteros o referencias a clases base deben ser capaces de usar objetos de clases derivadas de éstas sin saberlo."      **Mi traducción:** Las subclasses deben comportarse adecuadamente cuando sean usadas en lugar de sus clases base.              |
| I | [ISP](https://jgcarmona.com/isp-interface-segregation-principle-principio-de-segregacion-de-interfaces/) |   **[Interface Segregation Principle](https://jgcarmona.com/isp-interface-segregation-principle-principio-de-segregacion-de-interfaces/)**  **Principio de Segregación de Interfaces**      "**Clients should not be forced to depend upon interfaces that they do not use.**" — Robert Martin      **Traducción literal:** "Los clientes no deberían ser forzados a depender de interfaces que no utilizan."      **Mi traducción:** Utiliza muchas interfaces de manera que éstas sean pequeñas y cohesivas, que puedan coexistir unas con otras.              |
| D | [DIP](https://jgcarmona.com/dip-dependency-inversion-principle-principio-de-inversion-de-dependencias/) |   **[Dependency Inversion Principle](https://jgcarmona.com/dip-dependency-inversion-principle-principio-de-inversion-de-dependencias/)**  **Principio de Inversión de Dependencias**      "**A. High level modules should not depend upon low level modules. Both should depend upon abstractions.**  **B. Abstractions should not depend upon details. Details should depend upon abstractions.**" — Robert Martin      **Traducción literal:** "A. Módulos de alto nivel no deberían depender de módulos de bajo nivel. Ambos deberían depender de abstracciones.  B. Las abstracciones no deberían depender de los detalles. Los detalles deberían depender de las abstracciones."      **Mi traducción:** para conseguir robustez y flexibilidad y para posibilitar la reutilización haz que tu código dependa de abstracciones y no de concreciones, esto es, utiliza muchas interfaces y muchas clases abstractas y, sobretodo, expón, por constructor o por parámetros, las dependencias que una clase pueda tener.          |

  

Actualmente estoy trabajando en una serie de clases .NET enfocadas a sentar las bases de los principios SOLID desde un punto de vista TDD (Test Driven Development o Desarrollo Guiado por Pruebas) y la relación de éstos principios con los patrones de diseño. El curso se compone de cuatro "temas":

  

  

1.- "UML de batalla"

  

2.- [Principios SOLID](http://juan-garcia-carmona.blogspot.com.es/2012/09/principios-solid.html)  
  

3.- TDD práctico, metodología AAA y nomenclaturas útiles para documentar

  

4.- Patrones de Diseño y TDD

  

Si os interesa éste curso, tanto particulares como empresas, no dudéis en poneros en contacto conmigo. 

  

Un saludo.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
