---
title: "ISP: Interface Segregation Principle // Principio de Segregación de Interfaces"
description: ''
pubDate: 2012-09-02
categories: 
  - "desarrollo-software"
  - "gestion-proyectos"
tags: 
  - "sw-architecture"
  - "software"
---

Interface Segregation Principle   

Principio de Segregación de Interfaces  
  

"Clients should not be forced to depend upon interfaces that they do not use." -Robert C. Martin

  

**Traducción literal:** "Los clientes no deben ser forzados a depender de interfaces que no se utilicen."

  

**Mi traducción:** mantén las interfaces pequeñas y cohesivas.

  

Veamos un ejemplo que no cumple éste principio, supongamos la siguiente interfaz

```
public interface ITrabajador{    void Trabajar();    void Descanasar();    void Comer();}
```

Tendríamos, por ejemplo, éstas implementaciones de la interfaz:

```
public class JefeDespota{    private ITrabajador _trabajador;    public void ElegirTrabajador(ITrabajador trabajador)    {        _trabajador = trabajador;    }    public void Mandar()    {        _trabajador.Trabajar();    }}
```

```
public class Tecnico : ITrabajador{    public void Trabajar()    {    }    public void Descanasar()    {    }    public void Comer()    {    }}
```

```
public class TrabajadorPlanta : ITrabajador{    public void Trabajar()    {    }    public void Descanasar()    {    }    public void Comer()    {    }}
```

En éste ejemplo estamos obligando a implementar métodos que no se utilizan nunca... ¿Cómo lo resolveríamos?  

  

Segregando interfaces:

> **segregar****.**

> ([Del](http://www.blogger.com/blogger.g?blogID=2531207305874013592) [lat.](http://www.blogger.com/blogger.g?blogID=2531207305874013592 "latín, latino o latina") _segregāre_).

> **1.** tr. Separar o apartar algo de otra u otras cosas.

> **2.** tr. Separar y marginar a una persona o a un grupo de personas por motivos sociales, políticos o culturales.

> **3.** tr. Secretar, excretar, expeler.

**[](http://www.blogger.com/blogger.g?blogID=2531207305874013592)**

**[](http://www.blogger.com/blogger.g?blogID=2531207305874013592)**

**[](http://www.blogger.com/blogger.g?blogID=2531207305874013592)**

  
Nos quedamos con la primera definición, la aplicamos al anterior código, y nos quedan las siguiente interfaces:  

```
public interface ITrabajar{    void Trabajar();}
```

```
public interface IComer{    void Comer();}
```

```
interface IDescansar{    void Descansar();}
```

Y por tanto las siguiente posibles implementaciones:  

```
public class TrabajadorMediaJornada : ITrabajar, IDescansar{    public void Trabajar()    {    }    public void Descansar()    {    }}
```

```
public class TrabajadorJornadaCompleta:ITrabajar, IDescansar, IComer{    public void Trabajar()    {            }    public void Descansar()    {            }    public void Comer()    {            }}
```

```
public class Robot:ITrabajar{    public void Trabajar()    {            }}
```

De nuevo estamos aportando sencillez a nuestro código de forma elegante, dividir interfaces demasiado grandes en interfaces más pequeñas es una buena práctica siempre que haya clases que no necesiten la implementación completa de la interfaz. Éste ejemplo quizá sea demasiado básico y evidente pero ten en cuenta que con las interfaces también puedes aplicar herencia, extendiendo en multiples interfaces hijas una funcionalidad de una interfaz padre. Posibilidades hay muchas y hemos de saber buscar entre todas esas posibilidades la solución más óptima ya que aunque no la encontremos a la primera más cerca estaremos de encontrarla en sucesivos cambios en nuestro código.  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
