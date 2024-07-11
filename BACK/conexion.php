<?php
//HostMio
/*
$host = 'localhost'; // Dirección del servidor de la base de datos
$user = 'root'; // Usuario de la base de datos
$password = ''; // Contraseña del usuario de la base de datos
$dbname = 'peliculas'; // Nombre de la base de datos a la que se desea conectar
$port = 3306; // Puerto del servidor de la base de datos (3306 es el puerto predeterminado para MySQL)
*/

// host 000WebHost

$host = 'localhost'; // Dirección del servidor de la base de datos
$user = 'id22300033_cerebro2005fsa'; // Usuario de la base de datos
$password = 'Maurene1@'; // Contraseña del usuario de la base de datos
$dbname = 'id22300033_pelicula'; // Nombre de la base de datos a la que se desea conectar
$port = 21; // Puerto del servidor de la base de datos (3306 es el puerto predeterminado para MySQL)


// Crea una nueva conexión a la base de datos MySQL
$conn = new mysqli($host, $user, $password, $dbname, $port);

// Verifica si la conexión falló
if ($conn->connect_error) {
    // Si la conexión falla, detiene la ejecución del script y muestra un mensaje de error
    die("Conexión fallida: " . $conn->connect_error);
}
