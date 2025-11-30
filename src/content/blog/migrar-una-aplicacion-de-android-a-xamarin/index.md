---
title: "Migrar una aplicación de Android a Xamarin"
description: ''
pubDate: 2015-09-20
categories: 
  - "blog"
  - "desarrollo-software"
  - "proyectos"
---

Tras las últimas batallas con arquitecturas Android he decidido darle una oportunidad a [Xamarin](https://xamarin.com/) ya que los problemas que estaba teniendo con Android Studio estoy acostumbrado a resolverlos a diario con Visual Studio, el entorno con el que habitualmente trabajo. Estoy muy contento pues he estado migrando la aplicación en la que más usuarios activos tengo y el proceso no ha sido demasiado costoso.  
  
1º Crear una solución en Blanco  
2º Añadir un Proyecto Android vacío  
3º Copiar layouts de su carpeta en el proyecto antiguo a la carpeta del proyecto nuevo.  
4º Renombrar de xml a axml esos ficheros  
5º Lo mismo pero con los strings (en éste proyecto tengo muchísimas traducciones y esto fue un rollo)  
6º Generar las carpetas para los drawables e ir copiando del proyecto viejo al nuevo.  
7º Hacer los ajustes necesarios en el manifest.  
8º Para poder usar los anuncios, tal y como los usaba con Admob, tuve que añadir el componente de Google Play Services (botón derecho sobre la carpeta componentes desde la solución, siguiente siguiente, etcétera...)  
9º Copiar la actividad de inicio, el .java, al nuevo proyecto, renombrar el fichero a .cs y modificar el código para que sea C# en vez de java (son cuatro cosas, de imports a usings, the super a base, los getters y los setters pasan a ser propiedades y los namespaces se mantienen casi iguales)  
10º Establecer la actividad de inicio en el código añadiendo el atributo así:

  
\[Activity(Label = "YourProyect.Droid", MainLauncher = true, Icon = "@drawable/your\_icon\_resource")\]  
  
Ojo: todas las Activities tienen que tener el atributo \[Activity\]

  
Además, de esto añadí varios servicios, un bradcast reciever y ahora estoy adaptando los anuncios pero he tenido algún problema para que compilara y lo arreglé fijándome bien en las versiones de Android contra las que compilo (21 en mi caso) y añadiendo en las opciones del proyecto, en opciones de Android, Opciones avanzadas "Java Max Heap Size:" 1G.  
  
  
Y de momento eso es todo por ahora, voy a seguir más actividades y dejando el código bonito, como a mi me gusta. ¡Que viva C#!
