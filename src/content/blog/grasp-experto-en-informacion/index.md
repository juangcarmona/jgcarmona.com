---
title: "GRASP: Experto en información"
description: ''
pubDate: 2012-09-07
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "gestion-proyectos"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/just-write-grasp.png"
---

Éste es el cuarto artículo de la serie de artículos de principios o patrones GRASP. En ésta ocasión vamos a hablar del "Experto en información". Éste es el principio básico de asignación de responsabilidades,  la S de SOLID, y para mí es de los más importantes de los patrones o principios GRASP.

  

Experto en información nos dice que la responsabilidad de la creación de un objeto o la implementación de un método, debe recaer sobre la clase que conoce toda la información necesaria para crearlo. De este modo obtendremos un diseño con mayor cohesión y así la información se mantiene encapsulada, es decir, disminuye el acoplamiento.

  

Como con otras veces, voy a poner un ejemplo que viola éste principio, la explicación de por qué lo viola y un ejemplo que lo soluciona.

  
**Ejemplo que incumple "Experto en información":**  

```
public class Informe{    public int[] Parciales { get; set; }}public class InformePresenter{    Informe _informe;    public void CalculateTotalButtonClicked()    {        var total = 0;        foreach (var parcial in _informe.Parciales)        {            total = total + parcial;        }        // TRUCO GRATIS: éste bucle lo podemos convertir en un una expresión funcional usando Linq:        // var total = _informe.Parciales.Aggregate(0, (current, parcial) => current + parcial);    }}
```

**¿Por qué viola éste principio?**   
  

Por lo mismo que viola la S de SOLID, la responsabilidad de InformePresenter es, como su propio nombre indica, presentar un informe y en éste caso está calculando el total. ¡Mal! El total debería dárselo la clase Informe, que es la que tiene toda la información al respecto, ella es la experta y quien debería calcularlo.

  
**Solución:**  

```
public class Informe{    public int[] Parciales { get; set; }    public void CalcularTotal()    {        var total = 0;        foreach (var parcial in Parciales)        {            total = total + parcial;        }    }} public class InformePresenter{    private Informe _informe;    public void CalculateTotalButtonClicked()    {       _informe.CalcularTotal();    }}
```

**Regla de oro:**   
  

Éste es el principio que se debería aplicar más a menudo, el que hay que tener más en cuenta. La suma de "Experto en información" y SRP es que una clase sólo debería tener un mótivo para cambiar y debería ser ella misma la encargada de crear los objetos e implementar los métodos sobre los que es experta.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
