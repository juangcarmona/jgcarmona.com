---
title: "DIP: Dependency Inversion Principle // Principio de Inversión de Dependencias"
description: ''
pubDate: 2012-09-02
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "gestion-proyectos"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/just-write-dip-with-nice-tyypography-1.png"
---

Dependency Inversion Principle

Principio de Inversión de Dependencias

  

"A. High level modules should not depend upon low level modules. Both should depend upon abstractions.

B. Abstractions should not depend upon details. Details should depend upon abstractions."  - Robert C. Martin

  

**Traducción literal:** 

  

"A. Módulos de alto nivel no deberían depender de módulos de bajo nivel. 

Ambos deberían depender de abstracciones.

B. Las abstracciones no deberían depender de los detalles. Los detalles deberían depender de las abstracciones."

  

**Mi traducción:** para conseguir robustez y flexibilidad y para posibilitar la reutilización haz que tu código dependa de abstracciones y no de concreciones, esto es, utiliza muchas interfaces y muchas clases abstractas y, sobretodo, expón, por constructor o por parámetros, las dependencias que una clase pueda tener.  
  
Veamos un ejemplo típico que incumple éste principio:  

```
public class Door{}public class Window{}public class House{    private Door _door;    private Window _window;    public House()    {        _door = new Door();        _window = new Window();    }}
```

En este ejemplo House depende de Door y de Window, es decir, de clases concretas y no de abstracciones. Podríamos mejorarlo así:  

```
public class House{    private IDoor _door;    private IWindow _window;    public House()    {        _door = new Door();        _window = new Window();    }    public House(){}    public IDoor Door;    public IWindow Window;}
```

  
Exponiendo dos propiedades abstractas, IDoor e IWindow pero seguiremos dependiendo de clases concretas ya que se crean en el contructor, así que lo que nos hace falta es "inyectar" dichas dependencias a la clase así:  

```
public class House{    private IDoor _door;    private IWindow _window;    public House(IDoor door, IWindow window)    {        _door = door;        _window = window;    }    public House(){}    public IDoor Door;    public IWindow Window;}
```

En éste caso sí dependemos de abstracciones, ésta inyección de dependencias es correctísima porque nos dará igual si la ventana es grande o pequeña o si la puerta es blanca o marrón, quiero decir que, independientemente de qué implementación de IDoor e IWindow se utilice para construir nuestra casa podremos construir nuestra casa.

  

En cuanto a la inyección de dependencias, dependiendo del contexto, nos puede interesar no utilizar parámetros en el constructor como en el ejemplo anterior y utilizar en su lugar propiedades.  
  
Este es el último de los principios SOLID pero no por ello el menos importante, todos los principios deberían ser máximas en nuestros desarrollos, tanto pequeños y propios como en las grandes arquitecturas de software de nuestros clientes. Espero que os haya sido útil esta serie de artículos. El material para la elaboración de éstos artículos forma parte de un curso para empresas y particulares sobre metodologías ágiles y programación que quiero empezar a impartir. Como siempre, estoy abierto a sugerencias y críticas, también responderé cualquier duda y escucharé cualquier oferta.  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
