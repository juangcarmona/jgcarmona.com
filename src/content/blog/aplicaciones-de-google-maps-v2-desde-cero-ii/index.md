---
title: "Aplicaciones de Google Maps v2 desde cero (II)"
description: ''
pubDate: 2012-12-24
categories: 
  - "aventura"
  - "desarrollo-software"
---

Antes de ayer le dediqué la mañana a aprender lo básico de programación con el API de Google Maps para Android y de paso a escribir [un breve artículo](http://juan-garcia-carmona.blogspot.com.es/2012/12/aplicacion-de-google-maps-android-api.html) exponiendo sin tapujos mis cábalas, lo que me iba pasando por la cabeza... Estuvo entretenido pero, como digo, me llevó toda la mañana incrustar un mapa en mi aplicación. Es cierto que tuve que leer bastante y también es cierto que tuve distracciones ya que estuve leyendo las noticias, mirando el facebook y haciendo alguna "tarea del hogar" pero no fue sencillo del todo. En pocas palabras, el anterior artículo se resume en:

1. Crear el proyecto y el repositorio para la gestión y el control de cambios.
2. Darle forma al código para que sea fácil de mantener, robusto y versátil.
3. Conseguir la key del Google Maps Android API.
4. Incluir referencias y librerías (tuve que actualizar eclipse y varios plugins y eso también me llevó un rato largo, google-play-services\_lib.jar, android-support-v4.jar) 
5. Insertar el mapa como fragment (lo que me llevó a pasar de utilizar Activity a usar FragmentActivity)

Todas estas cábalas las podéis leer con mucho mas detalle en la [parte primera](http://juan-garcia-carmona.blogspot.com.es/2012/12/aplicacion-de-google-maps-android-api.html) de ésta serie de artículos sobre Google Maps Android API.

  

Hoy quiero continuar con ese proyecto, el objetivo sigue siendo el mismo, construir una aplicación robusta, versátil, mantenible y ampliable enfocada a la comunidad musulmana cuya principal característica tiene que ser que nos diga siempre en qué dirección se encuentra exactamente la ciudad santa de La Meca. La planificación inicial era:

  

1º Requisitos  
2º Análisis  
3º Creación del proyecto y repositorio  
4º Inserción de mapa  
5º Localizar y apuntar a La Meca  
6º Detalles de usabilidad  
7º Crear y firmar la applicación y subirla a [+Google Play](http://plus.google.com/106886664866983861036)  
  
En la primera parte llegué hasta el punto 4 y hoy me gustaría terminar y publicar una versión BETA de ésta aplicación. así que empecemos.  
  
**Localización**  
  
En la actividad que maneja el mapa necesitamos un objeto tipo GoogleMap para manejarlo par alo cual hay que hacer lo siguiente:  

```
GoogleMap mapa = ((SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map)).getMap();
```

Tendremos que importar además com.google.android.gms.maps.GoogleMap y com.google.android.gms.maps.SupportMapFragment, cosa que no debería darnos problemas si tenemos bien enlazadas las librerías del API y con ésto obtenemos una instancia del mapa que hemos declarado en la vista así:  

```
<fragment xmlns:android="http://schemas.android.com/apk/res/android"        android:id="@+id/map"        android:layout_width="fill_parent"        android:layout_height="fill_parent"        class="com.google.android.gms.maps.SupportMapFragment"/>
```

Se pueden hacer muchas cosas con ese mapa y recomiendo leer éste segundo artículo de sgoliver sobre mapas para ver como jugar con los estilos del mapa y con la cámara, habrá cosas de ese artículo que utilizaré más adelante... Pero lo que ahora quiero es centrar el mapa en mi posición.  
  
Haciendo mapa.setMyLocationEnabled(true); nos aparecerá el famoso círculo azul que indica nuestra posición y el radio aproximado de precisión pero el mapa seguirá centrado en el punto 0,0 y con el zoom por defecto...  
  
Después de darle muchas vueltas a todo el tema de la localización y haber evolucionado mucho el código de mi MapActivity creo que es mejor que lo exponga y lo desgrane aquí que ir explicando los pasos que he ido siguiendo porque he dado muchas vueltas sin resultados. Es cierto que el código es bastante sucio pero esto es porque he intentado con multitud de comentarios que el código sea auto-explicativo:  

```
package com.jgc.lameca;import com.google.android.gms.maps.CameraUpdateFactory;import com.google.android.gms.maps.GoogleMap;import com.google.android.gms.maps.LocationSource;import com.google.android.gms.maps.SupportMapFragment;import com.google.android.gms.maps.model.BitmapDescriptorFactory;import com.google.android.gms.maps.model.CameraPosition;import com.google.android.gms.maps.model.LatLng;import com.google.android.gms.maps.model.MarkerOptions;import com.google.android.gms.maps.model.PolylineOptions;import android.graphics.Color;import android.hardware.Sensor;import android.hardware.SensorEvent;import android.hardware.SensorEventListener;import android.hardware.SensorManager;import android.location.Criteria;import android.location.Location;import android.location.LocationListener;import android.location.LocationManager;import android.os.Bundle;public class MapActivity extends BaseActivity implements LocationListener, LocationSource, SensorEventListener { // El mapa private GoogleMap mMap; // Para escuchar los cambios de localización del usuario,  // si se mueve o si la localización es más precisa private OnLocationChangedListener mListener; // Para gestionar nosotros la localización y no el propio mapa y poder  // manejar eventos como onLocationChanged que de otra manera no podríamos gestionar private LocationManager locationManager; private boolean haveLocation = false; // Sensores para orientar el mapa de acuerdo a la brújula private SensorManager mSensorManager; private float[] mGravity; private float[] mGeomagnetic; // para controlar el intervalo de ejecución del evento de los sensores private long lastTimeCompassUpdated = 0; /** Called when the activity is first created. */ @Override public void onCreate(Bundle savedInstanceState) {  super.onCreate(savedInstanceState);  setContentView(R.layout.map_layout);         // Instanciamos locationManager  locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);  // Establecemos la precisión  Criteria locationCriteria = new Criteria();  locationCriteria.setAccuracy(Criteria.ACCURACY_FINE);  // Y establecemos que se escuche al mejor proveedor de localización   // (o redes móviles o GPS o WiFi, dependerá del estado del dispositivo  // y así nos despreocupamos nosotros)  locationManager.requestLocationUpdates(locationManager.getBestProvider(locationCriteria, true), 1L, 2F, (LocationListener) this);  initializeMap();        } private void initializeMap() {  // Confirmamos que no se ha inicializado el mapa todavía  if (mMap == null)   {   // obtenemos el mapa de la vista   mMap = ((SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map)).getMap();   // Registramos o establecemos ésta clase, MapActivity, como LocationSource    // del mapa para utilizar nuestro locationManager y el Listener ;)   mMap.setLocationSource(this);   // Inicializamos el mapa...   if (mMap != null)    {    setUpMap();        }  } } private void setUpMap()  {  // Nos localiza...  mMap.setMyLocationEnabled(true);  // Quitamos el botón de "mi posición"  mMap.getUiSettings().setMyLocationButtonEnabled(false);  // Pinta una marca en La Meca  addLaMecaMarkOnMap();  centerMapOnLaMeca(); } private void addLaMecaMarkOnMap(){  mMap.addMarker(new MarkerOptions()  .position(new LatLng(Constants.laMecaLatitude, Constants.laMecaLongitude))  .title("La Meca")  .icon(BitmapDescriptorFactory.fromResource(R.drawable.icono_meca))); } public void centerMapOnLaMeca(){  CameraPosition newCameraPosition = new CameraPosition.Builder()  .target(new LatLng(Constants.laMecaLatitude, Constants.laMecaLatitude))        .zoom(1)                     .bearing(0)          .tilt(0)                    .build();    mMap.animateCamera(CameraUpdateFactory.newCameraPosition(newCameraPosition)); } private void initialiceSensors() {  mSensorManager = (SensorManager)getSystemService(SENSOR_SERVICE);  // Vamos a usar el acelerómetro y el sensor magnético  Sensor gsensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);  Sensor msensor = mSensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);  mSensorManager.registerListener(this, gsensor, SensorManager.SENSOR_DELAY_NORMAL);   mSensorManager.registerListener(this, msensor, SensorManager.SENSOR_DELAY_NORMAL); }  private void drawLineBetweenOurLocationAndLaMeca(){  // Debe ejecutarse cuando sepamos nuestra localización  // es decir, onLocationChanged  Location myLocation = mMap.getMyLocation();  LatLng myLatLng = new LatLng(myLocation.getLatitude(), myLocation.getLongitude());  LatLng laMecaLatLng = new LatLng(Constants.laMecaLatitude, Constants.laMecaLongitude);  // creamos un polyline (linea poligonal) con dos puntos  PolylineOptions rectOptions = new PolylineOptions()  .add(myLatLng) // nuestra posición  .add(laMecaLatLng); // la posición de la meca  // pintamos esa línea de color verde  rectOptions.color(Color.GREEN);  // Y la añadimos al mapa  mMap.addPolyline(rectOptions);  } @Override public void onPause() {  if(locationManager != null)  {   locationManager.removeUpdates((LocationListener) this);  }  super.onPause(); } @Override public void onResume() {  super.onResume();  initializeMap();  if(locationManager != null)  {   mMap.setMyLocationEnabled(true);  } } public void activate(OnLocationChangedListener listener)  {  mListener = listener; } public void deactivate()  {  mListener = null; } public void onLocationChanged(Location location)  {  if (!haveLocation){   initialiceSensors();   haveLocation = true;  }  mMap.clear();  if( mListener != null )  {   addLaMecaMarkOnMap();   mListener.onLocationChanged( location );   CameraPosition newCameraPosition = new CameraPosition.Builder()   .target(new LatLng(location.getLatitude(), location.getLongitude()))      // centra el mapa en nuestra posición   .zoom(19)   // establece el zoom   .bearing(0)           .tilt(0)                     .build();     //Move the camera to the user's location once it's available!   mMap.animateCamera(CameraUpdateFactory.newCameraPosition(newCameraPosition));    drawLineBetweenOurLocationAndLaMeca();  } } public void onProviderDisabled(String provider)  {  // cuando se deshabilita un probeedor de localización... prefiero no hacer nada  // Toast.makeText(this, "provider disabled", Toast.LENGTH_SHORT).show(); } public void onProviderEnabled(String provider)  {  // cuando se habilita un probeedor de localización... prefiero no hacer nada  // Toast.makeText(this, "provider enabled", Toast.LENGTH_SHORT).show(); } public void onStatusChanged(String provider, int status, Bundle extras)  {  // Cuando cambia el estado de la localización... prefiero no hacer nada  // Toast.makeText(this, "status changed", Toast.LENGTH_SHORT).show(); } public void onAccuracyChanged(Sensor sensor, int accuracy) {  // cuando cambia la precisión... } public void onSensorChanged(SensorEvent event) {  // quiero dejar un margen de 3 segundos al principio  // para la animación hasta el punto donde se encuentra el usuario...  if (lastTimeCompassUpdated == 0){   lastTimeCompassUpdated = System.currentTimeMillis()+3000;   return;  }  else if (System.currentTimeMillis()>lastTimeCompassUpdated ){   if (mMap!=null){    int matrix_size = 16;    float[] R = new float[matrix_size];    float[] outR = new float[matrix_size];    if (event.accuracy == SensorManager.SENSOR_STATUS_UNRELIABLE)     return;    switch (event.sensor.getType()) {    case Sensor.TYPE_MAGNETIC_FIELD:     mGeomagnetic = event.values.clone();     break;    case Sensor.TYPE_ACCELEROMETER:     mGravity = event.values.clone();     break;    }    if (mGeomagnetic != null && mGravity != null) {     if (SensorManager.getRotationMatrix(R, null, mGravity, mGeomagnetic)) {      SensorManager.getOrientation(R, outR);     }     CameraPosition oldPosition = mMap.getCameraPosition();     // Quiero que sólo se actualice si hay una variación de mas de un grado     //if (Math.abs(Math.abs(oldPosition.bearing) - Math.abs(Math.toDegrees(outR[0])))>1){     CameraPosition newCameraPosition = new CameraPosition.Builder()     .target(oldPosition.target)      // Sets the center of the map to Mountain View     .zoom(oldPosition.zoom)                   // Sets the zoom     .bearing((float) Math.toDegrees(outR[0]))             .tilt(oldPosition.tilt)                      .build();                   // Creates a CameraPosition from the builder     mMap.moveCamera(CameraUpdateFactory.newCameraPosition(newCameraPosition));         }   }  } }}
```

Si te fijas el código es muy lineal, hay una secuencia de acontecimientos. Se pinta el icono sobre la meca y se centra la cámara en ese punto y cuando el dispositivo da una localización (onLocationChanged) si es la primera localización se inicializan los sensores y se lanza una animación de la cámara hasta nuestra posición.

  

Durante mis pruebas y errores me he encontrado con que el giro (la animación o el movimiento) de la cámara de acuerdo a los sensores interrumpía las animaciones del mapa, es decir, el movimiento de la cámara de un punto a otro, si éste movimiento se hacía por código, es decir, si hacia un movimiento desde La Meca hasta mi localización y empezaban a funcionar los sensores (onSensorChanged) el ajuste de la orientación de la cámara en ese método paraba la animación así que decidí meter un pequeño retardo de tres segundos en el evento la primera vez e inicializar los sensores una vez tuviera una localización. Así he conseguido que, primero el mapa nos muestre La Meca y una vez sepamos donde estamos movernos "elegantemente" hasta nuestra posición y, tres segundos después, orientar nuestro mapa de acuerdo a la brújula para saber en qué dirección se encuentra exáctamente La Meca. 

  

Hay que tener en cuenta también que si no hay ningún proveedor de localización éste código fallará y se cerrará la aplicación, por tanto lo que debemos hacer es obligar a que haya un proveedor de localización activo antes de poder lanzar ésta actividad. Para ello, en EntryPointActivity, tengo el siguiente código:

```
import android.location.LocationManager;import android.os.Bundle;import android.widget.Button;public class EntryPointActivity extends BaseActivity { /** Called when the activity is first created. */ @Override public void onCreate(Bundle savedInstanceState) {  super.onCreate(savedInstanceState);  setContentView(R.layout.main); }  @Override protected void onResume() {  setMapButtonVisibility();  super.onResume(); } private void setMapButtonVisibility() {  LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);  boolean network_enabled=locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);  boolean gps_enabled=locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);  Button mapButton = ((Button)this.findViewById(R.id.ep_map_button));   if (!(network_enabled || gps_enabled)){      mapButton.setEnabled(false);  }  else {   mapButton.setEnabled(true);  } }}
```

Lo último que nos queda por hacer antes de poder firmar y subir a Google Play es pulir detalles de interfaz de usuario y de usabilidad... vamos con ello:  
  
**Interfaz de Usuario**  
  
Que no se crea nadie que me he complicado demasiado, he buscado un mensaje que invita a la oración, lo he traducido al árabe y he incluido los dos textos, he buscado alguna imagen bonita de la Kaaba y la he centrado y colocado como background del layout principal, también he centrado los botones y buscado una imagen pequeña de la Kaaba para utilizarla como icono de la aplicación. Así ha quedado el xml (main.xml) de EntryPoint:  
  

```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"    android:layout_width="fill_parent"    android:layout_height="fill_parent"    android:background="@drawable/centered"    android:orientation="vertical" >    <TextView        android:layout_width="fill_parent"        android:layout_height="wrap_content"        android:layout_margin="5dp"        android:text="@string/intro_arabe" />    <TextView        android:layout_width="fill_parent"        android:layout_height="wrap_content"        android:layout_margin="5dp"        android:text="@string/intro" />    <RelativeLayout        android:layout_width="fill_parent"        android:layout_height="fill_parent"        android:layout_gravity="bottom|center_horizontal"        android:layout_marginBottom="1dip"        android:orientation="vertical" >        <Button            android:id="@+id/ep_gps_button"            android:layout_width="wrap_content"            android:layout_height="wrap_content"            android:layout_alignParentBottom="true"            android:layout_centerHorizontal="true"            android:layout_marginBottom="25dp"            android:onClick="onClickFeature"            android:text="@string/lanzar_configuracion_gps" />        <Button            android:id="@+id/ep_map_button"            android:layout_width="wrap_content"            android:layout_height="wrap_content"            android:layout_above="@+id/ep_gps_button"            android:layout_centerHorizontal="true"            android:layout_marginBottom="14dp"            android:onClick="onClickFeature"            android:text="@string/lanzar_mapa" />     </RelativeLayout></LinearLayout>
```

Respecto al centrado de la imagen, he creado un fichero en /res/drawable llamado centered.xml así:  
<?xml version="1.0" encoding="utf-8"?>  

```
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"    android:gravity="center"    android:src="@drawable/Kaaba_mirror_edit_jj" />
```

  

Esto hace que la imagen elegida quede centrada y no se deforme, ha quedado así a la primera y me ha gustado aunque quizá en móviles con la pantalla un poco más pequeña no quede del todo bien, ya me plantearé ese ajuste más adelante, de momento doy por terminado "el maquillaje" y voy a firmar la aplicación y a subirla a Google Play.

  

Para firmar la aplicación: Botón derecho sobre el proyecto -> Android Tools -> Export Signed Application Package... Pones tus credenciales, creas el apk, bas a [https://play.google.com/apps/publish](https://play.google.com/apps/publish)  y subes tu aplicación...

  

(siento haber resumido ésto tanto pero da para varias entradas y ya se ha escrito mucho sobre firmar aplicaciones y gestionar tus aplicaciones en Google Play, en cuanto esté activa pondré un enlace para que veáis el resultado)

  
  

Y como hoy es Noche Buena voy a ducharme y a vestirme para ir a cenar con mi familia, espero que éste artículo sirva como introducción a la programación de aplicaciones con Google Maps. En el próximo artículo me gustaría hacer una nueva versión de ésta aplicación donde aparezcan laas mezquitas más cercanas, tendré que buscar si existe esa información en algún sitio y hacer un poco de I+D, y eso será dentro de unos días...  
  
¡Hasta la próxima entrada!

  

Juan García Carmona

[d.jgc.it@gmail.com](mailto:d.jgc.it@gmail.com)  
[  
](mailto:d.jgc.it@gmail.com)[](mailto:d.jgc.it@gmail.com)  

[\--- Actualizado 25/12/2012 ---](mailto:d.jgc.it@gmail.com)

[  
](mailto:d.jgc.it@gmail.com)[Ayer subí la aplicación un poco deprisa y corriendo porque se me hacía tarde y hoy al probarla bajada desde Play Store me he dado cuenta de que no se veían los mapas, esto era por que no había utilizado una clave para el apk firmado. Desde la linea de comandos (cmd.exe) he hecho ésto:](mailto:d.jgc.it@gmail.com)  
[  
](mailto:d.jgc.it@gmail.com)  
[C:Program FilesJavajdk1.7.0\_03bin> keytool.exe -list -v -keystore D:WORKruta...Keystorekeystore](mailto:d.jgc.it@gmail.com)   
[  
](mailto:d.jgc.it@gmail.com)[Y eso me ha devuelto, entre otras cosas el SHA1 que he puesto en la zona correspondiente a la API de Google Maps (](mailto:d.jgc.it@gmail.com)[https://code.google.com/apis](https://code.google.com/apis)), también hay mucho escrito al respecto. Lo he probado y ahora si se ven los mapas. Ya estña disponible en Play Store aquí:  
  
[https://play.google.com/store/apps/details?id=com.jgc.lameca](https://play.google.com/store/apps/details?id=com.jgc.lameca)  
  
\--- Actualizado 25/12/2012 ---
