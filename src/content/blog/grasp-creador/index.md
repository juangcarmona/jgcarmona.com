---
title: "GRASP: Creador"
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

Éste es el tercer artículo sobre GRASP, en él vemos el patrón creador, otro principio fácil de aplicar  en nuestros desarrollos que está intimamente relacionado con los principios SOLID.

La creación de instancias es una de las actividades más comunes en un sistema orientado a objetos. En consecuencia es útil contar con un principio general para la asignación de las responsabilidades de creación. Si se asignan bien el diseño puede soportar un bajo acoplamiento, mayor claridad, encapsulamiento y reutilización.

El patrón creador nos ayuda a identificar quién debe ser el responsable de la creación o instanciación de nuevos objetos o clases. Éste patrón nos dice que la nueva instancia podrá ser creada por una clase si:

- Contiene o agrega la clase.
- Almacena la instancia en algún sitio (por ejemplo una base de datos)
- Tiene la información necesaria para realizar la creación del objeto (es 'Experta')
- Usa directamente las instancias creadas del objeto

Una de las consecuencias de usar este patrón es la visibilidad entre la clase creada y la clase creadora. Una ventaja es el bajo acoplamiento, lo cual supone facilidad de mantenimiento y reutilización.

Veamos, con una serie de ejemplos de cómo aplicar éste patrón correctamente bajo distintas circunstancias.

**Ejemplo 1:**

```
public class ListaDeClientesPresenter
{
    Cliente _clientes;

    public void AddButtonClicked()
    {
    }
}

public class Cliente
{
    List _pedidos;
}

public sealed class Pedido
{
}
```

**¿Qué pasa aquí?** Donde quiera que se llame al método AddButtonClicked se generará un nuevo pedido y se lo "daremos" a una instancia de un cliente, pero ¿quién debería crear ese pedido? Lo que nos dice éste principio es que esa responsabilidad debería recaer en Cliente ya que contiene Pedidos.

**Ejemplo 2:**

```
public class ListaDeClientesPresenter
{
    Cliente _cliente;

    public void AddButtonClicked()
    {
        _cliente.AddPedido();
    }
}

// En éste caso contiene o agrega la clase y además maneja varias instancias...
public class Cliente
{
    List _pedidos;

    public void AddPedido()
    {
        var nuevoPedido = new Pedido();
        _pedidos.Add(nuevoPedido);
    }
}

public sealed class Pedido
{
}
// Pero hay más posibilidades...
```

**Ejemplo 3:**

```
// Si la clase guarda (persiste) la clase creada...
// Lo más fácil es implementar un repositorio:

public class ListaDeClientesPresenter
{
    private RepositorioDePedidos repositorioDePedidos;

    public void AddButtonClicked()
    {
    }
}

public class Cliente
{
    List _pedidos;
}

public class RepositorioDePedidos
{
    Stream _pedidosXml;

    public Pedido LoadOrders()
    {
        // Lo siento, el propósito no es aprender serialización, sólo me interesaba que compilara
        // el código:
        var serialzer = new XmlSerializer(typeof(Pedido));
        var xmlElement = (XmlElement) serialzer.Deserialize(_pedidosXml);
        return new Pedido(xmlElement.Value);
    }
}

public sealed class Pedido
{
    string _id;

    public Pedido(string id)
    {
       _id = id;
    }
}
```

**Ejemplo 4:**

```
// Si la clase tiene la información necesaria para crear la nueva clase
// Por ejemplo si queremos que Pedido tenga el Id de cliente...
public class ListaDeClientesPresenter
{
    Cliente _cliente;

    public void AddButtonClicked()
    {
        _cliente.AddPedido();
    }
}

public class Cliente
{
    List _pedidos;
    int _id;

    public void AddPedido()
    {
        var nuevoPedido = new Pedido(_id);
        _pedidos.Add(nuevoPedido);
    }
}

public sealed class Pedido
{
    private int _clienteId;
    public Pedido(int clienteId)
    {
        _clienteId = clienteId;
    }
}
```

**Ejemplo 5:**

```
// Si la clase usa directamente la clase creada
// Por ejemplo si queremos que el Cliente gestione Pedido/s
public class ListaDeClientesPresenter
{
    Cliente _cliente;

    public void AddButtonClicked()
    {
    }
}

public class Cliente
{
    Pedido _pedido;

    // La responsabilidad de crear esta clase que él mismo maneja tantas veces recaé sobre él
    // Aquí o en cualquier otro lugar...

    public Cliente()
    {
        _pedido = new Pedido();
    }

    public void DeleteOrder()
    {
        _pedido.Borar();
    }

    public void RenameOrder(string newName)
    {
        _pedido.Modificar();
    }
}

public sealed class Pedido
{
    public void Borar(){}
    public void Modificar(){}
}
```

De nuevo no hay mucho más que decir sobre éste patrón, tan solo que hay que tener en cuenta esos cuatro puntos a la hora de instanciar un objeto y preguntarse si el lugar en el que se está realizando es el idóneo o no. Darse cuenta de que no se está cumpliendo con el patrón creador es un buen motivo para refactorizar nuestro código.

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
