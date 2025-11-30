---
title: "El apagón de las 12:34 - Una hipótesis que merece ser investigada"
description: ''
pubDate: 2025-05-01
categories: 
  - "blog"
  - "ciberseguridad"
tags: 
  - "cybersecurity"
  - "software"
heroImage: "images/4_weird_hackers.png"
---

## ¿Y si el gran apagón no fue un fallo, sino una simulación perfectamente orquestada?

El lunes 28 de abril de 2025, a las 12:34 del mediodía, la península ibérica se sumió en un apagón total. Un blackout en toda regla.

No fue un meteorito. No fue una sobrecarga por calor. Tampoco creo que, como se dijo desde Moncloa, haya sido un “desajuste operativo”. Mi hipótesis es que fue otra cosa, algo mucho más inquietante. Un acto quirúrgico. Un sabotaje. Un ataque ejecutado no con bombas, sino con datos, datos falsos. Inyectados. Simulados. Invisibles.

Espero que alguien tome mi hipótesis en serio y analice esta posibilidad. Ya visteis **[en mi anterior artículo](https://jgcarmona.com/cazando-al-cazador-episodio-1-backdoor-en-next-js-y-ataque-a-desarrolladores/)** lo fácil que es [**hackear a personal con acceso autorizado**](https://www.youtube.com/watch?v=AmgCJ2IuEDc) a sistemas críticos​.

## La caída

Los hechos ya los conocemos. A las **12:33**, el sistema eléctrico español registró una pérdida súbita de **15 gigavatios**, es decir, de repente, el 60% de la generación de energía "desaparece". La caída fue tan rápida, cinco segundos exactos, que la red no tuvo tiempo de reaccionar y, en lugar de intentar redistribuir la carga, entró en modo autoprotección. Se desconectaron enlaces internacionales, se dispararon protecciones automáticas y España, Portugal y Andorra colapsaron juntas.

**Red Eléctrica de España (REE)** informó que sus sistemas detectaron en primer lugar una anomalía en el suroeste peninsular, seguida 1,5 segundos después por otra señal en puntos no especificados. La vicepresidenta del Gobierno, Teresa Ribera, aseguró que se estaba analizando la llamada "caja negra" del sistema eléctrico.  
Fuente: [Wikipedia](https://es.wikipedia.org/wiki/Apag%C3%B3n_en_la_pen%C3%ADnsula_ib%C3%A9rica_de_2025), RTVE, [Infobae](https://www.infobae.com/espana/2025/04/28/el-cni-no-descarta-ninguna-hipotesis-y-ya-investiga-una-gran-actividad-inusual-procedente-del-norte-de-africa-y-por-que-en-cinco-segundos-desaparecio-el-60-de-toda-la-luz/)

## El punto ciego del siglo XXI: SCADA

En el corazón de cada infraestructura crítica del mundo moderno, eléctrica, hidráulica, ferroviaria, incluso alimentaria, hay un sistema que no duerme: el SCADA (Supervisory Control and Data Acquisition).​ Un SCADA no tiene voluntad, pero tiene mando. Si le dices que una turbina gira a 2.000 rpm cuando en realidad la turbina está parada, el sistema se lo cree y actúa en consecuencia.

Los SCADA no entienden de verdad o mentira, solo de señales. Son como un centinela que dispara la alarma si alguien le enseña una fotografía de un incendio. Si inyectas en su canal de telemetría un valor falso, por ejemplo de voltaje, frecuencia, temperatura, el sistema reaccionará como si fuera verdad.​ El problema no es que el SCADA sea tonto. Es que es obediente.

Y eso fue lo que yo creo que ocurrió en abril de 2025. Esa es mi hipótesis. Y ya visteis en mi [**artículo anterior**](https://jgcarmona.com/cazando-al-cazador-episodio-1-backdoor-en-next-js-y-ataque-a-desarrolladores/) lo fácil que es **[hackear a personal con acceso autorizado a sistemas críticos](https://www.youtube.com/watch?v=AmgCJ2IuEDc)**​.

Los sistemas SCADA, diseñados para supervisar y controlar infraestructuras críticas, presentan vulnerabilidades significativas. Estas incluyen conectividad expuesta, falta de autenticación robusta y tecnologías heredadas sin actualizaciones de seguridad. ​  
Fuente: [IMMUNE Technology Institute](https://immune.institute/blog/sistema-scada/?utm_source=chatgpt.com)

Muchas instalaciones energéticas en Europa siguen operando con versiones antiguas y poco protegidas de estos sistemas. Algunas, conectadas directamente a internet. Otras, usando **protocolos de los años 90** como **IEC 60870-5-104**, diseñados sin cifrado ni autenticación fuerte.  
Fuente: INCIBE, [ResearchGate](https://www.researchgate.net/publication/342984567_Vulnerabilidades_y_ciberseguridad_en_sistemas_SCADA), immune.institute

## ¿Cómo se inyecta una mentira al sistema?

Aún no se ha confirmado ningún sabotaje. Pero si hubiera ocurrido, esta es la hipótesis más plausible: **no se apagó ninguna planta**, sólo se **simuló que su apagado**.

Es decir, desde una instalación renovable comprometida, una fotovoltaica, una eólica, o una pequeña hidráulica, un atacante podría haber inyectado datos falsos en el canal SCADA, usando protocolos como el IEC-104.

Imagina un atacante que envía una señal diciendo “producción = 0 MW” desde una planta que en realidad está funcionando con normalidad. El SCADA reacciona como si realmente se hubiese producido un apagón, y redistribuye la carga. Si esto ocurre en varios puntos a la vez, se produce un caos perfectamente sincronizado. El sistema entra en pánico y se produce una desconexión en cadena.  
Fuente: [PV Magazine](https://www.pv-magazine-latam.com/2025/04/04/los-sistemas-de-generacion-solar-pueden-abrir-las-redes-a-ciberataques/), INCIBE

Esto lo hemos aprendido todos estos días, que el sistema eléctrico no tolera la incertidumbre, que está diseñado para sobrevivir.  
Y cuando detecta una amenaza sistémica, se protege de forma automática. Si una planta cae, la carga se redistribuye. Si caen dos, la frecuencia baja. Si baja demasiado, el sistema se desconecta por completo para evitar daños mayores. Eso fue lo que pasó. Francia desconectó su interconexión con España en cuanto percibió el desequilibrio. Y la península ibérica quedó sola.  
Portugal y Andorra compartieron el destino.  
Fuente: El País, El Confidencial

## ¿Quién lo hizo (si es que alguien lo hizo)?

La pregunta sigue abierta. No seré yo el que apunte sin pruebas, eso sí, el **CNI** ha reconocido públicamente que **no descarta ninguna hipótesis**, y que está investigando “una gran actividad inusual procedente del norte de África” en los minutos previos al apagón. Pero también ha insistido: **no hay pruebas concluyentes**.  
Fuente: [Infobae](https://www.infobae.com/espana/2025/04/28/el-cni-no-descarta-ninguna-hipotesis-y-ya-investiga-una-gran-actividad-inusual-procedente-del-norte-de-africa-y-por-que-en-cinco-segundos-desaparecio-el-60-de-toda-la-luz/)

Lo que sí se sabe es que el origen no fue interno, y que las infraestructuras vulnerables estaban en la periferia: **renovables mal protegidas, expuestas a internet, sin hardening ni monitoreo actualizado**.

Todo lo demás, país de origen, motivación, está todavía bajo secreto de sumario y no espero que salga a la luz en mucho tiempo, si es que algún día se reconoce el origen.

No hay pruebas concluyentes, ni deben hacerse afirmaciones que no puedan ser demostradas. Pero que no haya pruebas **públicas** no significa que no exista o haya podido existir un ataque. Además, no todos los hackers van en hoodie frente a una pantalla verde. Algunos podrían ir en en traje o en bata de laboratorio, o incluso en chilaba. El cliché no protege, y la ignorancia tampoco.

## Lo que deberíamos haber aprendido

- **La seguridad no es solo responsabilidad de REE**. Cada planta, cada subestación, cada protocolo debe ser auditado, cifrado y reforzado.

- **El protocolo IEC-104 debe ser actualizado o sustituido.** Su diseño abierto se pensó para la fiabilidad, no está preparado para la defensa y dada la criticidad de los sistemas energéticos, debe considerarse como un vector de riesgo nacional.

- **El enemigo no lanza bombas ni corta cables: inyecta mentiras.** Y lo hace con precisión, sin ruido, intentando no dejar rastro.

Fuente: INCIBE, [ResearchGate](https://www.researchgate.net/publication/342984567_Vulnerabilidades_y_ciberseguridad_en_sistemas_SCADA), [Becolve](https://becolve.com/blog/seguridad-sistemas-scada/)

## La guerra del silencio

El sistema eléctrico español sufrió una herida. Y su mayor cicatriz no está en los megavatios perdidos, sino en la falta de explicaciones claras. **¿Qué pasó realmente entre las 12:33 y las 12:34 del 28 de Abril de 2025?** ¿Fue un fallo de gestión? ¿Fue un experimento? ¿Fue un mensaje?

Nadie ha reivindicado nada. Nadie ha pedido rescates. Nadie ha amenazado públicamente.

Y mientras tanto, muchas subestaciones siguen operando con SCADA de los años 90, esperando el siguiente dato. Verdadero… o simulado.

### Preguntas que aún no tienen respuesta

### **¿Por qué dos caídas sincronizadas en dos puntos diferentes?**

### **¿Por qué justo a las 12:34, hora punta de actividad social?**

### **¿Por qué ninguna reivindicación?**

### **¿Cuántas plantas SCADA están auditadas hoy?**

* * *

**Este artículo ha sido redactado utilizando fuentes verificables, todas las que he encontrado, y sin lanzar afirmaciones sin respaldo documental. Cualquier referencia especulativa se presenta como hipótesis o posibilidad técnica y no como hecho.**

## Fuentes consultadas

- **Wikipedia:** [Apagón en la península ibérica de 2025](https://es.wikipedia.org/wiki/Apag%C3%B3n_en_la_Pen%C3%ADnsula_Ib%C3%A9rica_de_2025)

- **RTVE:** [origen-del-colapso-electrico](https://www.rtve.es/noticias/20250428/origen-del-colapso-electrico-sido-desequilibrio-provocado-por-desconexion-con-francia/16558154.shtml)

- **Infobae:** [El CNI investiga actividad inusual procedente del norte de África](https://www.infobae.com/espana/2025/04/28/el-cni-no-descarta-ninguna-hipotesis-y-ya-investiga-una-gran-actividad-inusual-procedente-del-norte-de-africa-y-por-que-en-cinco-segundos-desaparecio-el-60-de-toda-la-luz/)

- **El País:** [Cinco segundos que sumieron España en el colapso](https://elpais.com/economia/2025-05-01/cinco-segundos-que-sumieron-espana-en-el-colapso.html)

- **IMMUNE Technology Institute:** [Seguridad en sistemas SCADA](https://immune.institute/en/blog/sistema-scada/)

- **INCIBE – Instituto Nacional de Ciberseguridad:**
    - [Mejorando la seguridad del IEC-104](https://www.incibe.es/incibe-cert/blog/mejorando-seguridad-del-iec-104-ayuda-del-estandar-iec-62351)
    
    - [Industroyer2: The Ampere Strikes Back](https://www.incibe.es/en/incibe-cert/blog/industroyer2-ampere-strikes-back)

- **PV Magazine:** Los sistemas de generación solar pueden abrir las redes a ciberataques

- **ResearchGate:** [Vulnerabilidades y ciberseguridad en sistemas SCADA](https://www.researchgate.net/publication/342984567_Vulnerabilidades_y_ciberseguridad_en_sistemas_SCADA)

- **Becolve Digital:** [Seguridad en sistemas SCADA industriales](https://becolve.com/blog/seguridad-sistemas-scada/)
