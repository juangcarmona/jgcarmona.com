---
title: "Google Maps API key para apk firmados"
description: ''
pubDate: 2013-01-28
categories: 
  - "aventura"
  - "ciberseguridad"
  - "desarrollo-software"
---

Es la tercera vez que me tengo que poner a buscar cómo sacar la key de una aplicación para que ésta pueda acceder al API de Google Maps y he decidido hacer una mini receta para tenerla a mano.

  

Hay que localizar el keystore que en mi caso está en C:UsersJuan.android y ejecutar desde el directorio /bin de nuestro jdk (en mi caso C:Program FilesJavajdk1.7.0\_03bin>) lo siguiente:

  

keytool.exe -V -list -alias androiddebugkey -keystore "C:UsersJuan.androiddebug.keystore" -storepass android -keypass android

  

Y obtendremos una salida como la siguiente:

  

Nombre de Alias: androiddebugkey  
Fecha de Creaci¾n: 20-abr-2012  
Tipo de Entrada: PrivateKeyEntry  
Longitud de la Cadena de Certificado: 1  
Certificado\[1\]:  
Propietario: CN=Android Debug, O=Android, C=US  
Emisor: CN=Android Debug, O=Android, C=US  
N·mero de serie: 4f912680  
Vßlido desde: Fri Apr 20 11:04:00 CEST 2012 hasta: Sun Apr 13 11:04:00 CEST 2042  
  
Huellas digitales del Certificado:  
         MD5: B5:E3:29:E3:9A:18:69:20:06:E0:23:1C:XX:XX:XX:XX  
         SHA1: E6:F4:3B:8C:32:F3:D4:D5:A8:8C:91:C3:5C:D8:4F:24:XX:XX:XX:XX  
         SHA256: 84:4B:8C:89:DB:89:1E:D1:91:7E:9A:FC:AE:DB:27:BC:43:E0:E5:6E:FB:  
26:44:68:CF:CB:7C:3A:XX:XX:XX:XX  
         Nombre del Algoritmo de Firma: SHA1withRSA  
         Versi¾n: 3  
  
Pero ojo, ésto sólo nos vale para depurar, si queremos publicar la aplicación tendremos que ir a la consola del desarrollador de Google, crear un proyecto, activar el API de Google maps y crear una nueva Android Key. Mi keystore para firmar aplicaciones lo tengo en D:WORKeclipseeKeystorekeystore  y la documentación del API v2 dice exáctamente:  
  

> This key can be deployed in your Android applications.  
> API requests are sent directly to Google from your clients' Android devices. Google verifies that each request originates from an Android application that matches one of the certificate SHA1 fingerprints and package names listed below. You can discover the SHA1 fingerprint of your developer certificate using the following command:  
> keytool -list -v -keystore mystore.keystore [Learn more](https://developers.google.com/console/help/#generatingdevkeys)Accept requests from an Android application with one of the certificate fingerprints and package names listed below:  
> One SHA1 certificate fingerprint and package name (separated by a semicolon) per line. Example:45:B5:E4:6F:36:AD:0A:98:94:B4:02:66:2B:12:17:F2:56:26:A0:E0;com.example

  
Por lo tanto mi comando desde el bin del jdk será:  
  
keytool -list -v -keystore "D:WORKeclipseeKeystorekeystore"  
  

Y efectivamente he obtenido el SHA1 que estaba buscando, tan sólo me queda pegarlo seguido del nombre del paquete que utilizará la API para obtener la key que tendré que pegar en el AndroidManifest.xml para que mi aplicación firmada y subida a Google Play pueda acceder a los mapas de Google.

  

Posteriormente la experiencia me dice que lo mejor es crear el apk firmado, subirlo al teléfono localmente para instalarlo y probarlo y si todo va como debe entonces subirlo a Google Play. (ya perdí unos 300 usuarios una vez por subir con prisas un apk que tenía en el manifest la clave en modo debug :s)

  

Hasta las próxima entrada.

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)
