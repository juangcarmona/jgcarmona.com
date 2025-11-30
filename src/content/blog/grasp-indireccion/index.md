---
title: "GRASP: Indirección"
description: ''
pubDate: 2012-09-07
categories: 
  - "arquitectura-software"
  - "desarrollo-software"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/just-write-grasp.png"
---

Voy llegando al final de los patrones o principios GRASP, éste, la indirección, es fundamental y, como buenos profesionales, deberíamos tenerlo muy presente en nuestros análisis y decisiones arquitecturales.

  

El patrón de indirección nos permite mejorar el bajo acoplamiento entre dos clases asignando la responsabilidad de la mediación entre ellos a una clase intermedia.

  

**Problema:** ¿dónde debo asignar responsabilidades para evitar o reducir el acoplamiento directo entre elementos y mejorar la reutilización? Es decir, si sabemos que un objeto utiliza otro que muy posiblemente va a cambiar, ¿cómo protegemos a un pobjeto frente a cambios previsibles?

  

**Solución:** asignar la responsabilidad a un objeto que medie entre los elementos para proteger al primer objeto de los posibles cambios del segundo.

  

```
public class CualquierPresentador{    Log4Net _logger;    public void AlgoHaSucedido()    {        _logger.Log("Algo ha sucedido y hemos tratado en el presentador dicho algo...");    }}public class Log4Net{    public void Log(string message)    {    }} 
```

En éste caso Log4Net podría cambiar, de hecho esperamos que cambie porque lo estamos utilizando, si, pero se nos queda cortos. ¿Cómo aplicamos la indirección?

  

¿Qué tal si creamos un servicio de loggin intermedio? Así el presentador utilizará el servicio y con un poco de suerte los cambios en Log4Net no afectarán demasiado al resto del programa.

  

```
public class CualquierPresentador{    private ServicioLog _logger;    public void AlgoHaSucedido()    {        _logger.Log("Algo ha sucedido y hemos tratado en el presentador dicho algo...");    }}public class ServicioLog{    private Log4Net _logger;    public void Log(string message)    {        _logger.Log(message);    }}public class Log4Net{    public void Log(string message)    {    }}
```

  
 Este patrón es fundamental para crear abstracciones ya que nos permite introducir API's externas en la aplicación sin que tengan demasiada influencia en el código que tendría que cambiar cuando cambiara la API. Además, la primera clase podría cambiarse fácilmente para que en vez de ésta API utilizara cualquier otra.  

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
