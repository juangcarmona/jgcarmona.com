---
title: "Crear aplicaciones Multiidioma para Android"
description: ''
pubDate: 2012-12-26
categories: 
  - "ai"
  - "aventura"
  - "desarrollo-software"
---

En los dos últimos artículos intenté mostrar todo el proceso de creación de una aplicación y, sobretodo, cómo dar los primeros pasos desarrollando aplicaciones de mapas utilizando Google Maps Android API v2. En ésta ocasión y a raiz de que creo que la aplicación que desarrollé a modo de ejemplo podría tener algo de tirón dentro de toda la comunidad de musulmanes a nivel internacional y no sólo entre los musulmanes hispanohablantes como pensé en un principio he decidido hacer multi-idioma dicha aplicación para que cualquier musulman del planeta la pueda utilizar.

  

Lo primero que voy a hacer va a ser cambiarla de nombre para que tenga un nombre más internacional. Me he preguntado cuál es el idioma que más musulmanes hablan y buscando un poco he encontrado [ésta pregunta](http://es.answers.yahoo.com/question/index?qid=20090716121612AALoUAr) y una buena respuesta dice:

> El mayor número de musulmanes del mundo hablan Filipino, Indú, Arabe y Francés, ya que en cuanto a números la mayor cantidad de Musulmanes están en el sudeste de Asia, en la India, en la llamada "Media Luna" de Oriente Medio y en los países excolonias belgo/francesas de Africa.

Atendiendo a esa respuesta y haciendo varias búsquedas en Google barajo varios posibles nombres,  Mekah y Makkah, siendo esta segunda la palabra más internacional de todas para referirse a La Meca. Creo que la voy a cambiar de nombre a Makkah Compass.

  

Hay una manera fácil y recomendada para hacer aplicaciones multi-idioma para Android y consiste en crear una carpeta llamada "values-sufijo" que contenga el strings.xml que corresponda dentro, por ejemplo values-en tendrá en su interior el fichero con los textos en inglés. (podéis ver la documentación oficial aquí: [http://developer.android.com/guide/topics/resources/localization.html](http://developer.android.com/guide/topics/resources/localization.html) )

  

He encontrado el listado de los ISO Country codes aquí:

  

[http://www.iso.org/iso/home/standards/country\_codes/iso-3166-1\_decoding\_table.htm](http://www.iso.org/iso/home/standards/country_codes/iso-3166-1_decoding_table.htm)

  

Voy a empezar con:  
  
AE UNITED ARAB EMIRATES  
FR FRANCE  
ID INDONESIA  
IQ IRAQ officially assigned  
IR IRAN, ISLAMIC REPUBLIC OF  
PH PHILIPPINES  
PK PAKISTAN  
PS PALESTINIAN TERRITORY, OCCUPIED  
IN INDIA  
  
Éstos son los distintos ficheros strings.xml que acabo de generar:  
  
values-ae/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro"></string>    <string name="lanzar_mapa">الى اين هو الكعبة؟</string>    <string name="lanzar_configuracion_gps">GPS إعدادات</string>    <string name="app_name">مكة البوصلة</string></resources>
```

values-es/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">La unicidad de Dios se expresa ritualmente en la oración comunitaria, que todos los musulmanes deben observar, rezando en la misma dirección: hacia la Kaaba, la primera casa de Dios.</string>    <string name="lanzar_mapa">¿Hacia dónde está la Kabaa?</string>    <string name="lanzar_configuracion_gps">Configuración GPS</string>    <string name="app_name">Makkah Compass</string></resources>
```

values-fr/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">L'unicité de Dieu est exprimé rituellement dans la prière communautaire, tous les musulmans doivent observer, en priant dans la même direction: vers la Kaaba, la première maison de Dieu.</string>    <string name="lanzar_mapa">Où se trouve la Kaaba?</string>    <string name="lanzar_configuracion_gps">Paramètres GPS</string>    <string name="app_name">La Mecque boussole</string></resources>
```

values-id/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">Keesaan Tuhan diungkapkan dalam doa ritual komunitas, semua muslim harus mengamati, berdoa dalam arah yang sama: menuju Ka'bah, rumah Allah yang pertama.</string>    <string name="lanzar_mapa">Kemanakah adalah Ka'bah?</string>    <string name="lanzar_configuracion_gps">GPS Pengaturan</string>    <string name="app_name">Mekkah kompas</string></resources>
```

values-in/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">परमेश्वर की एकता धार्मिक समुदाय प्रार्थना में व्यक्त किया है, सभी मुसलमानों का निरीक्षण, एक ही दिशा में प्रार्थना: Kaaba, भगवान के पहले घर की ओर.</string>    <string name="lanzar_mapa">मक्का कहाँ है?</string>    <string name="lanzar_configuracion_gps">जीपीएस सेटिंग्स</string>    <string name="app_name">मक्का कम्पास</string></resources>
```

values-iq/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro"></string>    <string name="lanzar_mapa">الى اين هو الكعبة؟</string>    <string name="lanzar_configuracion_gps">GPS إعدادات</string>    <string name="app_name">مكة البوصلة</string></resources>
```

values-ir/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">یکتایی و یگانگی خداوند رسوم در نماز جامعه بیان می شود، همه مسلمانان باید رعایت، دعا در همان جهت به سمت کعبه، اولین خانه خدا.</string>    <string name="lanzar_mapa">کجا کعبه است؟</string>    <string name="lanzar_configuracion_gps">تنظیمات GPS</string>    <string name="app_name">مکه قطب نما</string></resources>
```

values-ph/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">Ang kaisahan ng Diyos ay ipinahayag ritually sa komunidad panalangin, ang lahat ng Muslim ay dapat obserbahan, nagdarasal sa parehong direksyon: patungo sa Kaaba, ang unang bahay ng Diyos.</string>    <string name="lanzar_mapa">Pasaan ang Kaaba?</string>    <string name="lanzar_configuracion_gps">GPS Setting</string>    <string name="app_name">Mecca compass</string></resources>
```

values-pk/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro">کمیونٹی کی نماز میں خدا کی وحدانیت کا اظہار کیا ہے، تمام مسلمانوں کا مشاہدہ، ایک ہی سمت میں نماز بھی ضروری ہے: کعبہ، خدا کے پہلے گھر کی طرف.</string>    <string name="lanzar_mapa">کعبہ کہاں ہے؟</string>    <string name="lanzar_configuracion_gps">GPS ترتیبات</string>    <string name="app_name">مکہ کمپاس</string></resources>
```

values-ps/strings.xml:  

```
<?xml version="1.0" encoding="utf-8"?><resources>    <string name="intro_arabe">وأعرب عن وحدانية الله في الصلاة عقائديا المجتمع، يجب على جميع المسلمين مراقبة، والصلاة في نفس الاتجاه: نحو الكعبة، أول بيت الله.</string>    <string name="intro"></string>    <string name="lanzar_mapa">الى اين هو الكعبة؟</string>    <string name="lanzar_configuracion_gps">GPS إعدادات</string>    <string name="app_name">مكة البوصلة</string></resources>
```

  
Ha sido fácil, he copiado los cinco textos y los he ido traduciendo a los distintos idiomas oficiales de cada país, quizá en una próxima versión suba más traducciones a más idiomas pero creo que con estos será suficiente por ahora. Si alguien encuentra alguna traducción mal hecha que por favor me corrija.  
  
إذا وجدت أي عدم تطابق الترجمة يرجى تصحيح لي.  
यदि आप पाते हैं किसी भी बेमेल अनुवाद मुझे सही कृपया.  
Jika Anda menemukan terjemahan mismatch tolong benar saya.  
Kung nalaman mo ang anumang Maling pagtutugma ng pagsasalin paki-tama sa akin.  
  
اگر آپ کو تلاش کسی بھی بیمیل ترجمہ براہ مہربانی آپ کے وزٹرز کا ریکارڈ رکھا درست کریں.  

  

  
 La aplicación la podréis descargar en muy poco tiempo, actualizaré ésta misma entrada con el enlace a la descarga.
