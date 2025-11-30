---
title: "LSP: Liskov Substitution Principle // Principio de sustitución de Liskov"
description: ''
pubDate: 2012-09-02
categories: 
  - "desarrollo-software"
tags: 
  - "sw-architecture"
  - "software"
---

Liskov Substitution Principle

Principio de sustitución de Liskov

  

"Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it." — Robert C. Martin

  

**Traducción literal:** "Las funciones que utilicen punteros o referencias a clases base deben ser capaces de usar objetos de clases derivadas de éstas sin saberlo."

  

**Mi traducción:** Las subclasses deben comportarse adecuadamente cuando sean usadas en lugar de sus clases base.

  

Vamos a utilizar un ejemplo típico en programación, el del rectángulo y el cuadrado.

  
Supongamos la clase rectángulo:  

```
public class Rectangulo {    public virtual int Alto { get; set; }    public virtual int Ancho { get; set; }    public int GetArea()    {        return Alto * Ancho;    }}
```

  
Un cuadrado no es más que un rectángulo cuyos lados, alto y ancho, son iguales, ¿no es así?:  

```
public class Cuadrado : Rectangulo{    public override int Alto    {        get { return base.Alto; }        set { base.Alto = base.Ancho = value; }    }    public override int Ancho    {        get { return base.Ancho; }        set { base.Ancho = base.Ancho = value; }    }}
```

  
Hagamos una prueba:  

```
public class Prueba{    private static Rectangulo GetNewRectangulo()    {        // Podría ser cualquier objeto que también sea un rectángulo...         // por ejemplo un cuadrado...        return new Cuadrado();    }    public static void Main()    {        var r = GetNewRectangulo();        r.Alto = 2;        r.Ancho = 3;        // Para el usuario r es un rectángulo        // y asume que puede darle valor al alto y al ancho...        Console.WriteLine(r.GetArea());    }}
```

Pero el usuario se sorprende y se vuelve loco al ver que el área le da 9 en vez de 6 que era el resultado esperado y en la sala se escucha un sonoro:   

> "WTF?!?!"

¿Y cómo resolvemos ésto con este mismo ejemplo? Este principio es sólo una extensión del principio Abierto/Cerrado y eso significa que debemos asegurarnos de que las nuevas clases derivadas están extendiendo las clases base sin cambiar su comportamiento. Debido a que el comportamiento de un cuadrado no es es coherente con el de un rectángulo, la mejor solución es no tener un cuadrado heredando de un rectángulo sino crear una interfaz de la que hereden tanto el cuadrado como el rectángulo, seguro que te suena ésto:

```
public interface IRectangular {     void SetAlto(int alto);     void SetAncho(int ancho);     int GetArea(); }
```

```
public class Rectangulo : IRectangular{    private int _alto;    private int _ancho;    public void SetAlto(int alto)    {        _alto = alto;    }    public void SetAncho(int ancho)    {        _ancho = ancho;    }        public int GetArea()    {        return _alto * _ancho;    }}
```

```
public class Cuadrado : IRectangular{    private int _lado;    public void SetAlto(int alto)    {        _lado = alto;    }    public void SetAncho(int ancho)    {        _lado = ancho;    }    public int GetArea()    {        return _lado * _lado;    }}
```

Nuestra suposición inicial fue la causa de nuestro error de programación pero recordemos que nos gusta el cambio, el cambio nos hace fuertes, hace que evolucione a mejor nuestro código, al menos debería ir enfocado en esa dirección. Yo siempre digo que para cualquier problema siempre habrá muchas soluciones, generalmente infinitas, la gran mayoría de ellas son soluciones erróneas, habrá unas cuantas que sean válidas pero tan sólo habrá una que sea la mejor y las más óptima en su conjunto, y es esa solución la que tenemos que buscar con nuestro código pues el resto de soluciones válidas tan solo traerán problemas futuros a nuestros programas.  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
