---
title: "GRASP: Polimorfismo"
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

A lo largo de todos los artículos que llevo escritos en éste blog ha aparecido la palabra polimorfismo más de una decena de veces, seguro, y he dado por hecho que todo el mundo sabía de qué estaba hablando, pero ¿Qué es polimorfismo?

  

Polimorfismo, en programación orientada a objetos, es un concepto muy simple con el que la gente a veces se lía, polimorfismo es permitir que varias clases se comporten de manera distinta dependiendo del tipo que sean. 

  

Siempre que se tenga que llevar a cabo una responsabilidad que dependa de un tipo, se tiene que

hacer uso del polimorfismo, es decir, asignaremos el mismo nombre a servicios implementados en 

diferentes objetos acordes con cada tipo.

  

Como de costumbre, veamos ésto con un ejemplo "malo", es decir, mejorable, la explicación y un ejemplo que lo soluciona.

  

**Mal:**

```
public enum TipoDeLog{    Debug,    Error}public class Log{    StreamWriter _ficheroLog;    public void Registrar(string mensaje, TipoDeLog tipoDeLog)    {        switch (tipoDeLog)        {            case TipoDeLog.Debug:                _ficheroLog.WriteLine("[DEBUG];{0}", mensaje);                break;            case TipoDeLog.Error:                _ficheroLog.WriteLine("[ERROR]:{0}", mensaje);                break;        }    }}public class CualquierPresentador{    Log _log;    public void AlgoHaSucedido()    {        _log.Registrar("Algo ha sucedido y queremos dejar constancia en un registro.", TipoDeLog.Debug);    }}
```

**¿Por qué?**  

Se ve claramente la dependencia de la clase Log y el método registrar con el TipoDeLog. Podemos evitar ésto creando una interfaz para el mensaje implementada de dos formas distintas, una por cada tipo, y sólo tendremos que pedir a la clase Log que registre un IMensaje. Y dependiendo de qué mensaje queramos registrar, quien sepa de qué tipo debe ser registrado, es decir, el experto en información, que cree una instancia concreta y llame a Log.Registrar.

**Bien:**

```
public interface IMensajeDelLog{    string Valor { get; }}public class MensajeDebug : IMensajeDelLog{    readonly string _mensaje;    public MensajeDebug(string mensaje)    {        _mensaje = mensaje;    }    public string Valor    {        get        {            return string.Format("[DEBUG];{0}", _mensaje);        }    }}public class MensajeError : IMensajeDelLog{    readonly string _mensaje;    public MensajeError(string mensaje)    {        _mensaje = mensaje;    }    public string Valor    {        get        {            return string.Format("[ERROR];{0}", _mensaje);        }    }}public class Log{    StreamWriter _ficheroLog;    public void Registrar(IMensajeDelLog message)    {        _ficheroLog.WriteLine(message.Valor);    }}public class CualquierPresentador{    Log _log;    public void AlgoHaSucedidoYQueremosRegistrarUnError()    {        _log.Registrar(new MensajeError("Algo ha sucedido y queremos dejar constancia en un registro."));    }    public void AlgoHaSucedidoYQueremosRegistrarloParaDepurar()    {// Por ejemplo una excepción        _log.Registrar(new MensajeDebug("Algo ha sucedido y queremos dejar constancia en un registro."));    }}
```

  

Como vemos, aplicar polimorfismo nos lleva a aplicar otros principios y mejora la calidad de nuestro código. Que nunca falte una buena cantidad de polimorfismo en vuestros programas.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
