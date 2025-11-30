---
title: "OCP: Open Closed Principle // Principio Abierto/Cerrado"
description: ''
pubDate: 2012-09-02
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
  - "gestion-proyectos"
  - "testing-software"
tags: 
  - "sw-architecture"
  - "software"
---

Open / Closed Principle  

Principio abierto/cerrado

  

"Software entities (classes, modules, functions, etc.) should be open for extension, but closed  for modification." - Robert C. Martin parafraseando a Bertrand Meyer

  

**Traducción literal:** "Las entidades de software (clases, módulos, funciones, etcétera) deberían estar abiertas a la extensión pero cerradas a la modificación."

  

**Mi traducción:** Cambia el comportamiento de una clase mediante herencia y composición.  
  
Empecemos con un ejemplo sencillo y típico:

  

```
public interface IForma{    int GetTipo();}public class Rectangulo : IForma{    public int GetTipo()    {        return 1;    }}public class Circulo : IForma{    public int GetTipo()    {        return 2;    }}public class EditorGrafico{    public void DibujarForma(IForma forma)    {        switch (forma.GetTipo())        {            case 1:                DibujaUnRectangulo((Rectangulo)forma);                break;            case 2:                DibujaUnCirculo((Circulo)forma);                break;        }    }    public void DibujaUnCirculo(Circulo c)    {        //pinta un círculo...    }    public void DibujaUnRectangulo(Rectangulo r)    {        //pinta un rectángulo    }    }
```

¿Por qué éste es un mal ejemplo? Porque si quisiéramos añadir una nueva forma, es decir, extender la clase, tendríamos que modificar ésta clase, es decir, no está abierta a la extensión. ¿Cómo solucionamos ésto? Muy fácil:

```
public abstract class Forma{    public abstract void Dibujar();}public class Rectangulo : Forma{    public override void Dibujar()    {        // Dibuja un Rectangulo    }}public class Circulo : Forma{    public override void Dibujar()    {        // Dibuja un círculo    }}public class EditorGrafico{    public void DibujarForma(Forma forma)    {        forma.Dibujar();    }}
```

¿No es genial? De una forma elegante hemos ganado en simplicidad, sólo hemos utilizado una clase abstracta con un método abstracto que será implementado por cada clase hija. Voy a insistir en mi propia traducción de éste principio, si has de cambiar una clase hazlo usando herencia y polimorfismo. No debes temer el uso de clases abstractas ni interfaces sino al revés ya que son una ayuda contra el acoplamiento de tu software que te protegen frente a cambios.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
