---
title: "SRP: Single Responsibility Principle // Principio de Única Responsabilidad"
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

**Single Responsibility Principle**  

**Principio de Única Responsabilidad**

  

"There should never be more than one reason for a class to change." - Robert C. Martin.

  

**Traducción literal:** "No debería haber nunca más de una razón para cambiar una clase."

  

**Mi traducción:** una clase debería concentrarse sólo en hacer una cosa, tener una única responsabilidad, y ésto no significa que sólo tenga un método sino que todos los métodos, públicos o privados, deberían estar enfocados a un solo propósito. Y todo ésto lo que implica es que una clase sólo debería tener una razón para cambiar, tal y como dice la traducción literal del principio.

  

Veamos un ejemplo que no cumple éste principio:

```
public interface ICorreoElectronico{    void SetEmisor(String emisor);    void SetReceptor(String receptor);    void SetContenido(String contenido);}public class Email : ICorreoElectronico{    public void SetEmisor(String emisor)    {    }    public void SetReceptor(String receptor)    {    }    public void SetContenido(String contenido)    {    }}
```

¿Qué falla aquí?  

  

En éste caso la traducción literal es clara, si cambiara el contenido porque, por ejemplo, admitiera más tipos, habría que modificar el código cada vez que añadamos algún tipo de contenido o si, por ejemplo, cambiara el protocolo y quisiéramos añadir más campos también habría que modificar la clase email. Por tanto hay más de un motivo por el que tendríamos que modificar ésta clase. Veamos otro ejemplo que no cumple con el SRP. 

```
public class Empleado{    public EmpleadoDTO GetEmpleado(int empleadoID)    {        // Devuelve un empleado (Data Transfer Object) a partir de su id...        return new EmpleadoDTO();    }    public double CalcularSueldo(int empleadoID)    {        // Busca un empleado y calcula su sueldo...        return 0.0;    }}public class EmpleadoDTO{}
```

En éste caso igual no es tan evidente pero la clase Empleado está haciendo dos cosas, busca empleados y calcula su sueldo. Si cambiara la manera de almacenar y buscar empleados habría que cambiar ésta clase y si cambiara la forma en la que debemos calcular la nómina también, por tanto no cumple con el SRP. Veamos la solución a estos dos pequeños problemas:  

  

```
interface ICorreoElectronico{    void SetEmisor(String emisor);    void SetReceptor(String receptor);    void SetContenido(IContenido content);}interface IContenido{    String GetContenidoSerializado();    // para serializar el contenido}class Email : ICorreoElectronico{    public void SetEmisor(String sender) { }    public void SetReceptor(String receiver) { }    public void SetContenido(IContenido content) { }}
```

En este caso si cambia el tipo de contenido, para serializar el contenido sólo tendríamos que modificar el método GetContenidoSerializado. Y si cambiara el protocolo e-mail sólo tendríamos que modificar la interfaz y la clase de correo electrónico, cumpliendo así cada clase o interfaz con el SRP. Volvamos al ejemplo del Empleado, la solución será establecer un mecanismo para sacar una responsabilidad de la clase Empleado:

```
public class Nominas{    public double CalcularSalario(int empleadoID)    {        // Calcula y devuelve el salario de un empleado...        return 0.0;    }}public class Empleado{    public EmpleadoDTO GetEmployee()    {        return GetEmployee(0);    }    public EmpleadoDTO GetEmployee(int empleadoID)    {        // Busca y devuelve un usuario de la BD...        return new EmpleadoDTO();    }    public double CalcularSalario(int empleadoID)    {        var pay = new Nominas();        return pay.CalcularSalario(empleadoID);    }}
```

  

Ahora la clase Empleado puede buscar empeados y decirnos el salario de uno de ellos pero ya no es su responsabilidad el realizar el cálculo ya que hemos sacado la responsabilidad del cálculo del salario a una clase nóminas y si cambiara la manera de realizar ese cálculo sólo tendríamos que modificar dicha clase y no todo el código. 

  

Éste es el primero de los principios SOLID, la S de SOLID la veremos aplicada en siguientes artículos, no sólo de SOLID, como la solución a muchos problemas de muy distintos ámbitos. Como desarrolladores debería ser parte de nuestras pautas de conducta al tirar código y como analistas o arquitectos de software uno de nuestros máximas.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
