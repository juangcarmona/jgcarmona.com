---
title: "GRASP: Variaciones protegidas"
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

Éste es el último de los artículos sobre los principios GRASP. Se han escrito libros enteros sobre éste tema pero he intentado resumir cada principio al máximo dando ejemplos prácticos para que cada cuál saque sus propias conclusiones. En ésta ocasión voy a hablar sobre el principio de las variaciones protegidas, el último principio si los ordenamos alfabéticamente pero no por ello el menos importante.

  

Siempre se ha dicho que, aplicando metodologías ágiles al desarrollo de software, el cambio es bienvenido, ahora bien, el cambio es bienvenido si lo esperamos. ¿Cuántos proyectos de software se habrán ido a pique y cuantos profesionales habrán visto su reputación por los suelos cuando el cliente ha pedido un pequeño cambio cuyas implicaciones obligaron a arquitectos y desarrolladores a empezar de cero? No sé la respuesta pero seguro que han sido demasiados.

  

El cambio debe ser bienvenido, claro, porque los clientes siempre quieren cambios y les cobraremos por desarrollarlos, pero no deben ser motivo de desesperación. Variaciones protegidas, es el principio fundamental de protegerse frente al cambio. Esto quiere decir que lo que veamos en un análisis previo que es susceptible de modificaciones lo envolvamos en una interfaz y utilicemos el polimorfismo para crear varias implementaciones y posibilitar implementaciones futuras de manera que quede lo menos ligado posible a nuestro sistema. De ésta forma, cuando se produzca la variación o el cambio que esperamos, dicho cambio nos repercuta lo mínimo.Este principio está muy relacionado con el polimorfismo y la indirección.

  

Imaginemos el siguiente código:

```
public class ImagenJpeg{    public void Redimensionar(int nuevoAlto, int nuevoAncho)    {        // Resize    }}public class MostrarImagenController{    public void BotonRedimensionarClicked(ImagenJpeg image)    {        image.Redimensionar(10, 20);    }}
```

¿Qué problemas pueden surgir? Simple, puede suceder que en vez de una imagen jpeg nos manden otro tipo de imagen. ¿Y cómo lo solucionamos? También simple si has seguido toda la serie de artículos sobre GRASP y las distintas refactorizaciones que hemos hecho en cada caso, basta con añadir una interfaz IImagen con un método Redimensionar, dejando el código así:

```
public interface IImagen{     void Redimensionar(int nuevoAlto, int nuevoAncho);}public class ImagenJpeg : IImagen{    public void Redimensionar(int nuevoAlto, int nuevoAncho)    {        // Redimensiona una imagen...    }}public class MostrarImagenController{    public void BotonRedimensionarClicked(IImagen image)    {        image.Redimensionar(10, 20);    }}
```

¡Genial! Ya no nos tendría que importar que cambiara el tipo de imagen a redimensionar, al menos a éste nivel en nuestra aplicación, y éste ejemplo es extrapolable a casi cualquier situación.

  
Bueno, aquí acaba la serie de artículos sobre patrones y principios GRASP en los que hemos ido viendo las mejores formas de asignar responsabilidades a clases y métodos para ganar en cohesión, disminuir acoplamiento, aplicar mejor los principios SOLID, protegernos frente al cambio y, en definitiva, ser mejores desarrolladores. Espero que ésta serie de artículos sea útil y recibir comentarios críticas y peticiones de los lectores.  
  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
