---
title: "Gestión de Errores en ASP.NET Core: Buenas Prácticas y Ejemplo Real"
description: ''
pubDate: 2024-12-09
categories: 
  - "arquitectura-software"
  - "blog"
  - "desarrollo-software"
tags: 
  - "sw-architecture"
  - "software"
heroImage: "images/generate-an-image-representing-error-handling.png"
---

En el desarrollo de APIs, especialmente con ASP.NET Core, gestionar errores correctamente no solo mejora la experiencia del usuario final, sino que también facilita la vida de los desarrolladores. En **TFST**, nuestro proyecto open source, estamos adoptando prácticas modernas como **Problem Details** y un sistema de manejo global de excepciones para garantizar APIs robustas y fáciles de depurar.

## Problem Details y el RFC 7807

El estándar **Problem Details** ofrece un formato uniforme para representar errores en nuestras APIs y con ASP.NET Core, es muy sencillo configurar este formato para que los clientes reciban respuestas claras, como por ejemplo:

```json
{
  "type": "https://example.com/probs/resource-not-found",
  "title": "Resource not found.",
  "status": 404,
  "detail": "The resource with ID 123 was not found.",
  "instance": "/api/resource/123"
}
```

Esto ayuda a los clientes, del tipo que sea, a comprender rápidamente qué ha fallado, dónde, y qué pueden hacer para corregirlo.

## Configuración básica en ASP.NET Core

Para ponerlo en práctica con ASP NET Core, primero, configuramos el middleware necesario en nuestro `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Añadimos soporte para Problem Details
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;
    };
});

var app = builder.Build();

// Middleware para excepciones y manejo de códigos de estado
app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseProblemDetails();

app.MapControllers();
app.Run();
```

Como ves, usamos `AddProblemDetails` para personalizar las respuestas, como incluir un identificador de traza (`traceId`).

## Global Exception Handling

Utilizar un middleware de excepciones es una buena idea, incluso podría considerarse una buena práctica, pero para un control más avanzado, un **Global Exception Handler** es imprescindible. Así podemos capturar todas las excepciones en un único punto y transformarlas en respuestas coherentes. ¿Cómo lo hacemos?

Primero creamos una clase de middleware personalizada:

```csharp
public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected error occurred.",
            Detail = exception.Message,
            Instance = context.Request.Path
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        return context.Response.WriteAsJsonAsync(problemDetails);
    }
}
```

Y lo registramos en el pipeline de nuestra aplicación:

```csharp
var app = builder.Build();
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
```

Este middleware captura todas las excepciones no manejadas, las convierte en un objeto **ProblemDetails**, y devuelve una respuesta JSON uniforme. Problema resuelto.

## Registro de Errores y Monitorización

Aún no hemos terminado, un buen manejo de errores no solo informa al cliente, también registra los problemas para su análisis. Con una herramienta como **Serilog** o **Application Insights**, podemos extender el `GlobalExceptionHandlingMiddleware` para registrar las excepciones con todo lujo de detalles, por ejemplo así:

```csharp
private static Task HandleExceptionAsync(HttpContext context, Exception exception)
{
    Log.Error(exception, "Unhandled exception occurred while processing request");

    var problemDetails = new ProblemDetails
    {
        Status = StatusCodes.Status500InternalServerError,
        Title = "An unexpected error occurred.",
        Detail = exception.Message,
        Instance = context.Request.Path
    };

    context.Response.ContentType = "application/json";
    context.Response.StatusCode = StatusCodes.Status500InternalServerError;

    return context.Response.WriteAsJsonAsync(problemDetails);
}
```

## Casos Específicos: Personalización por Tipo de Excepción

Y para una API más rica aún, podemos manejar excepciones específicas, como `ValidationException` o `NotFoundException`, y personalizar las respuestas, por ejemplo:

```csharp
private static Task HandleExceptionAsync(HttpContext context, Exception exception)
{
    ProblemDetails problemDetails;

    if (exception is ValidationException validationException)
    {
        problemDetails = new ValidationProblemDetails(validationException.Errors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation error"
        };
    }
    else if (exception is NotFoundException notFoundException)
    {
        problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status404NotFound,
            Title = "Resource not found",
            Detail = notFoundException.Message
        };
    }
    else
    {
        problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected error occurred.",
            Detail = exception.Message
        };
    }

    context.Response.ContentType = "application/json";
    context.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;

    return context.Response.WriteAsJsonAsync(problemDetails);
}
```

## En busca de la excelencia en nuestras APIs

Las técnicas y herramientas descritas en este artículo, como el uso de **Problem Details** y un **Global Exception Handler**, son sólo el comienzo de lo que puedes implementar para mejorar la robustez y mantenibilidad de tus proyectos.

Si estás desarrollando APIs con ASP.NET Core, te animo a experimentar con estas prácticas y adaptarlas a tus necesidades específicas. La mejora continua en el manejo de errores no solo facilita el mantenimiento, sino que también eleva la experiencia del usuario final.

¿Te ha resultado útil este artículo? ¿Hay algo que mejorarías o que te gustaría explorar más a fondo? Te leo en los comentarios.
