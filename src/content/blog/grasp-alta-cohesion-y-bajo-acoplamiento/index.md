---
lang: es
title: "GRASP: Alta cohesión y bajo acoplamiento"
description: 'Introducción al principio GRASP de alta cohesión y bajo acoplamiento para diseñar software mantenible y modular.'
pubDate: 2012-09-07
heroImage: "images/create-an-abstract-image-figuring-two-concepts-haugh-cohesion-and.png"
---

Llevo tiempo queriendo escribir una serie de artículos sobre los principios GRASP o principios de asignación de responsabilidades. Éste es el primero de esos artículos. Ésta vez lo haré al revés que hice con los principios SOLID, iré uno a uno y una vez los tenga todos escribiré un artículo que los aglutine y les de, en su conjunto, una razón de ser. Lo voy a hacer así porque ya tengo hechos ejemplos buenos y malos para cada principio y voy a ir más rápido. Me encantaría recibir feedback de los lectores, sobretodo de estudiantes de informática y desarrolladores que encuentren útiles mis explicaciones o que quieran que aclare o haga más hincapié en algún tema.

![Ilustración conceptual abstracta que representa la relación entre alta cohesión y bajo acoplamiento en diseño de software](images/create-an-abstract-image-figuring-two-concepts-haugh-cohesion-and.png)

## **¿Qué es cohesión y acoplamiento?**

El **grado de cohesión** mide la coherencia de la clase, esto es, lo coherente que es la información que almacena una clase con las responsabilidades y relaciones que ésta tiene.

El **grado de acoplamiento** indica lo vinculadas que están unas clases con otras, es decir, lo que afecta un cambio en una clase a las demás y por tanto lo dependientes que son unas clases de otras.

Como se ve claramente, los conceptos de cohesión y acoplamiento están íntimamente relacionados. Un mayor grado de cohesión implica uno menor de acoplamiento. Maximizar el nivel de cohesión intramodular en todo el sistema resulta en una minimización del acoplamiento intermodular. 

## **Alta cohesión**

Nos dice que la información que almacena una clase debe de ser coherente y debe estar, en la medida de lo posible, relacionada con la clase. Los puritanos y teóricos diferencian 7 tipos de cohesión:

1. **Cohesión coincidente**: el módulo realiza múltiples tareas pero sin ninguna relación entre ellas.

3. **Cohesión lógica**: el módulo realiza múltiples tareas relacionadas pero en tiempo de ejecución sólo una de ellas será llevada a cabo.

5. **Cohesión temporal**: las tareas llevadas a cabo por un módulo tienen, como única relación el deber ser ejecutadas al mismo tiempo.

7. **Cohesión de procedimiento**: la única relación que guardan las tareas de un módulo es que corresponden a una secuencia de pasos propia del producto.

9. **Cohesión de comunicación**: las tareas corresponden a una secuencia de pasos propia del producto y todas afectan a los mismos datos.

11. **Cohesión de información**: las tareas llevadas a cabo por un módulo tienen su propio punto de arranque, su codificación independiente y trabajan sobre los mismos datos. El ejemplo típico: OBJETOS

13. **Cohesión funcional**: cuando el módulo ejecuta una y sólo una tarea, teniendo un único objetivo a cumplir.

## **Bajo acoplamiento**

Es la idea de tener las clases lo menos ligadas entre sí que se pueda, de tal forma que, en caso de producirse una modificación en alguna de ellas, tenga la mínima repercusión posible en el resto de clases, potenciando la reutilización, y disminuyendo la dependencia entre las clases. También hay varios tipos de acoplamiento.

1\. **Acoplamiento de contenido**: cuando un módulo referencia directamente el contenido de otro módulo. (hoy en día es difícil verlo, quizá es más fácil verlo en entornos de programación funcional)

2\. **Acoplamiento común**: cuando dos módulos acceden (y afectan) a un mismo valor global.

3\. **Acoplamiento de control**: cuando un módulo le envía a otro un elemento de control que determina la lógica de ejecución del mismo.

Pero basta de palabrería, pasemos a los ejemplos. Para éste primer principio tengo cuatro ejemplos malos y sólo uno bueno.

### **Ejemplo 1: Acoplamiento innecesario entre clases**

```csharp
public static class Servicios
{
    private static IServicioEmail _servicioEmail;

    public static IServicioEmail EmailService
    {
        get
        {
            if (_servicioEmail == null)
            {
                _servicioEmail = new ServicioEmail();
            }
            return _servicioEmail;
        }
    }
}

public interface IServicioEmail
{
    void Send(string subject, string message);
}

public class ServicioEmail : IServicioEmail
{
    public void Send(string asunto, string mensaje) { }
}

public class UserController
{
    public void Registrar()
    {
        Servicios.EmailService.Send("asunto", "mensaje");
    }
}
```

¿Por qué hay alto acoplamiento aquí? Sencillo, UserController utiliza tanto Servicios como ServicioEmail y no es necesario que UserController sepa nada de la clase Servicios.

### **Ejemplo 2: Lógica de negocio mezclada con acceso a datos**

```csharp
public class ClaseDeLogicaDeNegocio
{
    public void DoSomething()
    {
        // coge parámetros de configuración
        var umbral = int.Parse(ConfigurationManager.AppSettings["umbral"]);
        var connectionString = ConfigurationManager.AppSettings["connectionString"];

        // Vamos a por datos...
        var sql = @"select * from cosas like parametro > ";
        sql += umbral;

        using (var connection = new SqlConnection(connectionString))
        {
            connection.Open();
            var command = new SqlCommand(sql, connection);
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    var nombre = reader["Nombre"].ToString();
                    var destino = reader["Detino"].ToString();

                    // Haz algo más de lógica de negocio por otro lado...
                    HacerMasLogicaDeNegocio(nombre, destino, connection);
                }
            }
        }
    }

    public void HacerMasLogicaDeNegocio(string nombre, string destino, SqlConnection conexion)
    {
    }
}
```

¿No huele un poco mal éste código? Confieso: mis primeras aplicaciones en .NET se parecían mucho a ésto, quizá demasiado, y estoy seguro de que queda código mío altamente acoplado funcionando todavía... De la experiencia se aprende, ¿no?

### **Ejemplo 3: Switch-case rígido**

```csharp
class AltoAcomplamiento
{
    public void SaludarEnIngles(string type)
    {
        switch (type)
        {
            case "GM":
                Console.WriteLine("Good Morning");
                break;
            case "GE":
                Console.WriteLine("Good Evening");
                break;
            case "GN":
                Console.WriteLine("Good Night");
                break;
        }
    }
}

class AltoAcoplamiento2
{
    public AltoAcoplamiento2()
    {
        var ejemplo = new AltoAcomplamiento();
        ejemplo.SaludarEnIngles("GM");
    }
}
```

Quizá es demasiado típico, quizá debería haber sido el primer ejemplo, no sé. El caso es que la clase AltoAcoplamiento2 necesita conocer la lógica interna de la clase AltoAcoplamiento. ¡Es muy feo!

### **Ejemplo 4: Clase que hace de todo (por vagancia)**

```csharp
class Mensaje
{
    private string _para;
    private string _asunto;
    private string _mensaje;

    public Mensaje(string to, string subject, string message)
    {
        _para = to;
        _asunto = subject;
        _mensaje = message;
    }

    public void Enviar()
    {
        // envia el mensaje...
    }
}
```

En un futuro alguien pide que se haga login del usuario antes de enviar el mensaje…  
Y un mal desarrollador hace lo siguiente:

```csharp
class MensajeVersion2
{
    private string _para;
    private string _asunto;
    private string _mensaje;
    private string _nombreUsuario;

    public MensajeVersion2(string to, string subject, string message)
    {
        _para = to;
        _asunto = subject;
        _mensaje = message;
    }

    public void Enviar()
    {
        // envia el mensaje...
    }

    public void Login(string nombreUsuario, string contraseña)
    {
        _nombreUsuario = nombreUsuario;
        // code to login
    }
}
```

El anterior código incumple varios de los principios SOLID, al menos la S y la O… (el resto no es aplicable en éste ejemplo por su simplicidad pero apostaría a que éste desarrollador incumpliría alguno más). Como decía, sólo voy a poner un ejemplo bueno, que va a ser la solución buena a éste último ejemplo:

```csharp
public interface IServicioEmail
{
    void Enviar(string asunto, string mensaje);
}

public interface IServicioLogin
{
    void Login(string nombreUsuario, string contraseña);
}

public interface IUserController
{
    void Registrar();
}

public class UserController : IUserController
{
    private readonly IServicioEmail _servicioEmail;
    private readonly IServicioLogin _servicioLogin;

    public UserController(IServicioEmail servicioEmail, IServicioLogin servicioLogin)
    {
        // Se harían las debidas comprobaciones y después:
        _servicioEmail = servicioEmail;
        _servicioLogin = servicioLogin;
    }

    public void Registrar()
    {
        _servicioEmail.Enviar("asunto", "mensaje");
        _servicioLogin.Login("usuario", "contraseña");
    }
}
```

Creo que se ve claramente que cada clase/interfaz cumple un único cometido ([S](https://jgcarmona.com/srp-single-responsibility-principle-principio-de-unica-responsabilidad/)) y que UserController está abierto a la extensión pero cerrada al cambio ([O](https://jgcarmona.com/ocp-open-closed-principle-principio-abierto-cerrado)) aunque quizá debería llamarse UserRegistrer. Doy por hecho que la jerarquía de las implementaciones de los servicios cumplirán con el principio de sustitución de Liskov ([L](https://jgcarmona.com/lsp-liskov-substitution-principle-principio-de-sustitucion-de-liskov/)). Se ve claramente también como hay segregación de interfaces ([I](https://jgcarmona.com/isp-interface-segregation-principle-principio-de-segregacion-de-interfaces/)) e inversión (inyección) de dependencias ([D](https://jgcarmona.com/dip-dependency-inversion-principle-principio-de-inversion-de-dependencias/)). Al hacerlo bien hemos conseguido aplicar y cumplir todos los [principios SOLID](http://juan-garcia-carmona.blogspot.com.es/2012/09/principios-solid.html) y ya sabéis lo que dicen de SOLID:

**¡SOLID rocks!**

Juan García Carmona  
[juan@jgcarmona.com](mailto:juan@jgcarmona.com)

* * *

> **NOTA:**
> 
> **🕰 Este artículo fue escrito originalmente en 2012 y ha sido recuperado y remaquetado en Julio de 2025 como parte del archivo histórico de mi blog.** ****⚠** Pese a que mi forma de escribir ha evolucionado mucho en estos últimos 13 años no he modificado ni una coma del contenido original por coherencia.**
