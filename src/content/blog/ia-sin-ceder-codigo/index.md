---
lang: es
title: "Tu IA, tus reglas."
description: 'Guía para usar IA en desarrollo sin ceder código ni datos: alternativas autocustodiadas y criterios de seguridad.'
pubDate: 2025-05-20
tags:
  - "ai"
  - "sw-architecture"
  - "sw-craftsmanship"
  - "devex"
heroImage: "images/pexels-photo-28682171.jpeg"
---

_Guía para profesionales del software que no quieren pagar el precio oculto de la productividad._

Vivimos un momento apasionante. Herramientas como GitHub Copilot, Amazon CodeWhisperer, Cursor, y otras decenas de copilots o editores con IA han cambiado para siempre la forma en la que escribimos código.

Muchos son gratuitos. Otros, sorprendentemente potentes para su precio. Y cada semana aparece uno nuevo prometiendo más velocidad, más contexto, más magia.

Pero hay algo que no siempre se dice. Algo que he vivido en carne propia y que compartí hace poco en redes:

> “Cuando algo es gratis, el producto eres tú… o, en este caso, tu código. O peor aún: el de tus clientes.”

Ese es el verdadero coste oculto. No siempre económico, pero sí estratégico. Este artículo no es una cruzada contra la IA (yo mismo la uso cada día). Es una llamada a la conciencia. A entender lo que hacemos. A decidir con criterio, sabiendo lo que está en juego.

* * *

## ¿Qué son los copilots y asistentes con IA para programadores?

Desde que GitHub Copilot se lanzó en 2021, hemos asistido a una explosión de herramientas con IA pensadas para asistirnos mientras programamos. Algunas son gratuitas, otras requieren suscripción, pero todas prometen lo mismo: más velocidad, menos fricción, más productividad.

## Los más conocidos (y más usados hoy)

**[GitHub Copilot](https://github.com/features/copilot)**  
Impulsado por OpenAI, integrado en VS Code y otros editores. Es el referente actual. Requiere suscripción, y aunque está entrenado con código público, muchos se preguntan qué ocurre con el código privado que se le envía en tiempo real.

**[Amazon CodeWhisperer](https://docs.aws.amazon.com/codewhisperer/latest/userguide/what-is-cwspr.html)**  
Muy integrado con AWS. Tiene plan gratuito. Ideal para proyectos en la nube… siempre que no te preocupe que el código viaje fuera.

**[Cursor](https://www.cursor.so/)**  
Un editor completo con IA, basado en VS Code, que integra modelos como GPT directamente en el flujo de trabajo. Extremadamente potente, pero totalmente cloud-based.

**Replit Ghostwriter** y **Sourcegraph Cody**  
Asistentes en línea que ofrecen generación y comprensión de código desde el navegador. Ideales para proyectos rápidos, pero poco transparentes en cuanto al manejo de datos.

## ¿Y si no quieres que tu código salga de tu equipo?

Para quienes trabajamos con software privado, bajo NDA o con código sensible, las herramientas anteriores pueden ser un riesgo. No tanto por malicia, sino por falta de control.

Por suerte, empiezan a consolidarse alternativas autocustodiadas, que no se comunican con el exterior y mantienen todo in-house:

![](images/e86d54b9-c7e9-4dc5-8cb9-07c46d94f0b61-edited.png)

**TabbyML**  
Es mi opción actual. Totalmente open source, autocustodiado y ejecutado en local (o en tu infraestructura). Compatible con múltiples modelos (como StarCoder, DeepSeek o Qwen), y sin llamadas a servidores externos. [Aquí cuento cómo lo uso en local](https://jgcarmona.com/run-ai-locally-with-tabby-ml/).

![](images/image-6.png)

**[Void Editor](https://github.com/voideditor/void)**

Aunque aún en beta, permite integrar tus propios modelos (incluso locales), y promete un flujo de trabajo con IA sin depender de proveedores cloud.

**[Continue.dev](https://continue.dev/)**  
Un proyecto emergente que se integra como extensión de VS Code, permitiendo conectar modelos locales o autocustodiados sin depender de terceros.

## El problema: no sabemos lo que cedemos

Muchos desarrolladores instalan estas herramientas y empiezan a usarlas sin preguntarse:

- ¿Dónde se procesa el código?

- ¿Se almacena?

- ¿Se indexa?

- ¿Se entrenan modelos con lo que escribo o con nuestro feedback?

- ¿Se cumple el RGPD y otras leyes relativas a la privacidad?

- ¿Quién será responsable si un snippet filtrado por la IA contiene una vulnerabilidad, o se parece demasiado al código de otra empresa?

Cuando trabajas con código open source, todo esto es menos problemático. El código está ya en GitHub, es público, y usar Copilot tiene sentido. Yo lo uso en proyectos como **[Courtly](https://github.com/juangcarmona/courtly-wp-plugin)**. Pero en proyectos profesionales, privados, o con cláusulas de confidencialidad… Esto no es tan evidente.

## Caso real: cómo TabbyML me ayudó a detectar un backdoor

Hace poco, al revisar un repositorio de un potencial cliente, uno de mis modelos locales (usando TabbyML y Qwen2.5-Coder) me sugirió un patrón de código extraño. No lo habría notado a simple vista. Era una cadena codificada que escondía una llamada a un servidor remoto. ([Lo explico todo aquí...](https://jgcarmona.com/cazando-al-cazador-episodio-1-backdoor-en-next-js-y-ataque-a-desarrolladores/))

Ese día entendí algo importante: la IA puede ser una aliada brutal para la revisión de código, **siempre y cuando esté bajo tu control**. Que no envíe nada fuera. Que puedas confiar en que no hay nadie más mirando.

## Alternativas: ¿cómo usar IA sin renunciar a la privacidad?

Hay varias estrategias, con distintos niveles de complejidad:

### 1\. Modelos locales y autocustodiados

Usa soluciones como TabbyML o Void Editor, con modelos como DeepSeek, Qwen o StarCoder ejecutándose en tu GPU.  
Tienes que tener una gráfica potente (yo uso una RTX A6000, y aún así hay límites), pero ganas control total.

### 2\. Copilot con endpoint propio

Ya es posible usar GitHub Copilot con tu propio modelo a través del API de OpenAI o incluso de llama.cpp. El problema: la telemetría y el logging no son transparentes. No está claro si aún así se envía algo a GitHub. En mi lista de tareas para mi "tiempo libre" está investigar esto, poner un sniffer y ver, o intentar ver, qué sale de mi equipo, de mi VSCode con GitHub Copilot, mientras estoy usando modelos locales. Si alguien ha hecho ya el experimento, le agradecería lo compartiera aquí con nosotros.

### 3\. Compartimentar por contexto

Como todo, en ingeniería, es una cuestión de contexto. Esta es mi opción intermedia favorita:

- Para proyectos personales o de código abierto, Copilot y compañía, sin miedo.

- Para proyectos de clientes (o en entornos empresariales): sólo modelos locales y revisiones de código manuales hasta desplegar herramientas locales.

## ¿Qué criterios puedes seguir para decidir?

Aquí va una lista práctica para CTOs, tech leads y desarrolladores conscientes:

- ¿Ese código es confidencial o tiene valor estratégico?

- ¿Has firmado un NDA?

- ¿Sabes cómo funciona la herramienta que usas?

- ¿Puedes explicarle a tu cliente qué IA usas y por qué?

- ¿Tienes control sobre los datos, logs, y modelos?

Si alguna respuesta te incomoda es hora de revisar tu setup.

## No se trata de ir con miedo se trata de ser consciente

No hay una única forma correcta de usar I, ni en desarrollo de software ni en cualquier otro ámbito. Por el contrario, si que hay muchas formas peligrosas de hacerlo, sobretodo si lo hacemos sin pensar.

Espero que este artículo te ayudar a hacerte **las preguntas correctas**. Como desarrolladores y líderes técnicos, tenemos la responsabilidad de entender lo que usamos. Porque no todo lo que acelera la productividad nos conviene.

¿Te gustaría formarte en esto? ¿Auditar tus herramientas actuales? ¿Montar tu propio TabbyML para que lo utilice tu equipo de desarrollo?

Ofrezco sesiones personalizadas para equipos que quieren entender y aprovechar la IA sin perder el control. **[Escríbeme](mailto:juan@jgcarmona.com)**. No vendo humo. Sólo criterio técnico.

👉 [jgcarmona.com/formacion-capacitacion](https://jgcarmona.com/formacion-capacitacion)  
👉 [jgcarmona.com/consultoria-desarrollo-software](https://jgcarmona.com/consultoria-desarrollo-software)
