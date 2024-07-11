<?php
// Permitir el acceso desde cualquier origen y establecer los métodos y encabezados permitidos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Incluir el archivo de conexión a la base de datos
include_once 'conexion.php';

$method = $_SERVER['REQUEST_METHOD'];
parse_str(file_get_contents("php://input"), $put_vars);

if ($method == 'PUT') {
    $id = $put_vars['id'];
    $titulo = $put_vars['titulo'];
    $lanzamiento = $put_vars['lanzamiento'];
    $genero = $put_vars['genero'];
    $duracion = $put_vars['duracion'];
    $director = $put_vars['director'];
    $actores = $put_vars['actores'];
    $sinopsis = $put_vars['sinopsis'];

    $sql = "UPDATE peliculas SET 
            titulo='$titulo', 
            lanzamiento='$lanzamiento', 
            genero='$genero', 
            duracion='$duracion', 
            director='$director', 
            actores='$actores', 
            sinopsis='$sinopsis'
            WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Película actualizada correctamente"]);
    } else {
        echo json_encode(["error" => "Error actualizando película: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}

$conn->close();

