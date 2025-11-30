---
title: "GRASP: Controlador"
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

  

Éste es el segundo artículo sobre GRASP. Aquí veré brevemente, pues no hay demasiado que decir, el patrón controlador. Creo que cualquier desarrollador del mundo sabe bien lo que es un controlador y el patrón controlador pero voy a poner la definición por si acaso hay algún error de concepto:

  

El patrón controlador es un patrón que sirve como intermediario entre una determinada interfaz y el algoritmo que la implementa, de tal forma que es el controlador quien recibe los datos del usuario y quien los envía a las distintas clases según el método llamado.

  

Este patrón sugiere que la lógica de negocio debe estar separada de la capa de presentación, lo que aumenta la reutilización de código y permite a la vez tener un mayor control. Hay muchas arquitecturas de aplicación que se basan en ésto, desde el famoso MVC que ya vi estudiando la carrera hasta la arquitectura MVVM tan utilizada últimamente en aplicaciones de escritorio y la última que he practicado profesionalmente, MVVMP, que no es más que un refinamiento sutil de la anterior.

  

Se recomienda dividir los eventos del sistema en el mayor número de controladores para poder aumentar así la cohesión y disminuir el acoplamiento.

  

**Un Controlador:**

- Debería ser el primer objeto llamado después de un cambio en la interfaz de usuario.
- Controla/ejecuta un caso de uso. No hace demasiado por si solo, controla, coordina.
- Pertence a la capa de aplicación o a la de servicios.

Éste ejemplo se centra en que el controlador debe ser el primer objeto llamado por objetos de la UI:

```
public class AlbumView{}public class AlbumPresenter{    AlbumView _vista;    AlbumController _controlador;    public void EtiquetaAdded(string etiqueta)    {        _controlador.EtiquetarFoto(etiqueta);    }}public class AlbumController{    public void EtiquetarFoto(string newTag)    {    }}
```

Este otro ejemplo se centra en que el controlador no debería hacer demasiado, tan sólo coordinar:

```
public class AlbumView{}public class AlbumPresenter{    AlbumView _vista;    AlbumController _controlador;    public void EtiquetaAdded(string etiqueta)    {        _controlador.EtiquetarFoto(etiqueta);    }}public class AlbumController{    private RepositorioDeFotos _repository;    public void EtiquetarFoto(string nuevaEtiqueta)    {        var foto = _repository.ReadFoto();        foto.AddEtiqueta(nuevaEtiqueta);        _repository.UpdateFoto(foto);    }}public class RepositorioDeFotos{ // Operaciones CRUD (que significa: Create, Read, Update, Delete)    public Foto ReadFoto()    {        return new Foto();    }    public void UpdateFoto(Foto foto)    {    }}public class Foto{    public void AddEtiqueta(string tag)    {    }}
```

Y no hay mucho más que decir sobre el patrón controlador, su única responsabilidad debe ser controlar, es decir coordinar delegando responsabilidades en otros.  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
