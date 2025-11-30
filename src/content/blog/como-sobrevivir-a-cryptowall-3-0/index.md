---
title: "Como sobrevivir a CryptoWall 3.0"
description: ''
pubDate: 2015-09-16
categories: 
  - "ciberseguridad"
  - "desarrollo-software"
  - "devops"
tags: 
  - "cybersecurity"
heroImage: "images/image.png"
---

El otro día me llamó mi madre mientras yo estaba escalando en la montaña y me dijo que el ordenador no arrancaba, que llevaba un rato y no había ni aparecido el escritorio así que le dije que lo apagara con un botonazo si hacía falta y le prometí que me pasaría en cuanto pudiera para echarle un vistazo. El lunes, al salir del trabajo, me pasé por su casa y encendí el ordenador y me encontré con que tras hacer login el equipo no respondía y si iniciaba el administrador de tareas éste se cerraba a los pocos segundos. 

  

  

Pensé que lo mejor era reiniciar y arrancar el equipo en el modo a prueba de fallos pero al intentarlo éste se reiniciaba automáticamente, no lo conseguí ni en modo consola, ni en modo a prueba de fallos ni en modo a prueba de fallos con funciones de red, se reiniciaba siempre, no obstante se me ocurrió probar el "Modo de restauración de servicios de directorio" ([información sobre los modos de arranque](https://support.microsoft.com/es-es/kb/315222)) y para mi sorpresa el sistema, por fin, arrancó en modo a prueba de fallos. 

  

Según arrancó el sistema pulsé Ctrl+Sift+Esc para abrir el administrador de tareas y me puse a matar procesos como un loco hasta dejar lo imprescindible para que no se reiniciara el sistema. Me dí cuenta de que había una serie de procesos que pese a matarlos se relanzaban ellos solos y en concreto el que me llamó la atención era dllhost.exe. Éste proceso es el que estaba ralentizando el sistema y si lo mataba volvía a ejecutarse tras unos cinco segundos. 

  

  

  

Desde el propio administrador de tareas ejecuté cmd para abrir una consola de windows y mientras cada cinco segundos mataba el proceso dllhost.exe escribí lo siguiente en la consola:

  

for /l %x in (1,1,100) do ( taskkill /f /im dllhost.exe)

  

  

Ese comando ejecuta cien veces la instrucción de matar el proceso dllhost.exe, luego lo edité para que se ejecutara cien mil veces y entonces ya puede empezar a trabajar. El ordenador seguía yendo muy lento pero una vez muerto el proceso dllhost.exe por fin pude ver el escritorio y un montón de ficheros con extensión .aaa y busqué desde mi móvil al respecto mientras pasaba el Malwarebytes Antimalware. Vi que se trataba del virus Crypto Wall porque se abrieron varias ventanas de internet explorer con el mensaje de chantaje y también en formato txt. Mientras trabajaba para intentar quitar el virus vi en el administrador de tareas (no lo cerré en ningún momento) que se abrían procesos con nombrees conocidos tipo msiexec.exe y cosas así y esos los fui matando según me percataba. 

  

En [ésta página](http://www.bleepingcomputer.com/virus-removal/cryptowall-ransomware-information) vi varias rutas donde se suele alojar el virus y con rmdir /R NombreDelDirectorio, desde la consola, fui eliminando carpetas "raras" que iba encontrando en:

- C:<random><random>.exe
- C:Users<User>AppDataLocal<random>.exe (Vista/7/8)
- C:Users<User>AppDataLocal<random>.exe (Vista/7/8)
- C:Documents and Settings<User>Application Data<random>.exe (XP)
- C:Documents and Settings<User>Local Application Data<random>.exe (XP)
- %Temp%

También me percaté de que en el registro había entradas del tipo svc+ 5 caracteres aleatorios así que busqué svc y me recorrí todo el registro borrando entradas sospechosas (ojo que aquí si no sabes lo que borras te la juegas)...

  

Y todo esto que os cuento lo hice mientras pasaba mbam.exe y me bajaba un antivirus y lo instalaba. Tras varias horas de lucha reinicié el equipo para que el antivirus hiciera un análisis profundo y éste quitó todo lo que yo no había sido capaz de encontrar y borrar a mano y mi madre vuelve a tener ordenador pero muchos de sus documentos fueron cifrados y tras probar varias recetas he preferido darlos por perdidos y directamente los he eliminado. Hubo mucha suerte porque el virus se cebó principalmente con varias copias de seguridad que yo tenía en ese ordenador con documentos de la universidad, de repositorios de código y cosas que, en el fondo, ya no eran útiles, eso sí, todo lo que había en el escritorio, fotos y documentos de MS Office, fueron cifrados y los hemos dado por perdidos y eliminado. En total la cantidad de ficheros cifrados han sido algo mas de once mil, unos 8 GB de ficheros de texto, código y documentos de MS Office... Pero lo cogí a tiempo y le corté los huevos.

  

Un detalle chulo al caso de todo esto, recordé varias pruebas que hice hace tiempo con rootkits caseros pues mbam y el antivirus encontraron entradas ADS (Alternate Data System) con el virus que es la delicia para los rootkits y el spyware. A grandes rasgos ADS puede servir como sistema de ficheros alternativo y oculto para el sistema operativo y el usuario, es el lugar ideal para meter mierda sin que nadie se entere...  
  
Y lo dejo por hoy. Espero que esto le valga a alguien.
