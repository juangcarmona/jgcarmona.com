---
title: "GRASP: Fabricación pura"
description: ''
pubDate: 2012-09-07
categories: 
  - "desarrollo-software"
heroImage: "images/just-write-grasp.png"
---

Siguiendo con la serie de artículos sobre los patrones o principios GRASP ahora toca hablar de la fabricación pura.  

  

La fabricación pura se da en las clases que no representan un ente u objeto real del dominio del problema sino que se han creado intencionadamente para disminuir el acoplamiento, aumentar la cohesión y/o potenciar la reutilización del código. 

  

La fabricación pura es la solución que surge cuando el diseñador se encuentra con una clase poco cohesiva y que no tenie otra clase en la que implementar algunos métodos. Es decir que se crea una clase "inventada" o que no existe en el problema como tal, pero que, añadiéndola, logra mejorar estructuralmente el sistema. Como contraindicación deberemos mencionar que al abusar de este patrón suelen aparecer clases función o algoritmo, esto es, clases que tienen un solo método.

  

Un ejemplo de porqué tendríamos que inventarnos una clase fuera del dominio del problema, imaginemos que estamos programando el famoso Angry Birds:

```
public class PajaroEnfadado{    public void Volar()    {    }    public void Mostrar()    {        // En una interfaz de usuario    }}
```

El método Mostrar "acopla" al pájaro a la interfaz de usuario y como no queremos enfadarlo aún más haríamos lo siguiente:

```
public class PajaroEnfadado{    public void Volar()    {    }}public class PajaroEnfadadoPresenter{    public PajaroEnfadadoPresenter(PajaroEnfadadoView view)    {        view.Mostrar(new PajaroEnfadado());    }}public class PajaroEnfadadoView{    public void Mostrar(PajaroEnfadado pajaroEnfadado)    {    }}
```

  
Ahora tenemos dos nuevas clases, view y presenter. Estas dos clases no existen en el dominio real del problema pero desacoplan enormemente la implementación del pájaro de la interfaz de usuario... Y nos dejan que la implementación del pájaro enfadado se centre en la lógica de negocio y en nada más, una única responsabilidad...  
  
  
¿No te suena? Seguro que si pero quizá nunca te habías preguntado el por qué de las arquitecturas de n capas, me da igual que sea MVC que MVP, que MVVM o MVVMP. Es una idea simple e intuitiva a la que ahora puedes ponerle un nombre y decir que se basa en el patrón GRASP de "Fabricación pura".  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
