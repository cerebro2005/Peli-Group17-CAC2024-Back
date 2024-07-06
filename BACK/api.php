<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json'); // Establece el tipo de contenido de la respuesta HTTP como JSON
include_once 'conexion.php'; // Incluye el archivo de conexión a la base de datos

$method = $_SERVER['REQUEST_METHOD']; // Obtiene el método de solicitud HTTP (GET o POST)

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM pelicula"; // Consulta SQL para obtener todas las películas
        $result = $conn->query($sql); // Ejecuta la consulta y almacena el resultado

        if ($result) { // Verifica si la consulta se ejecutó correctamente
            $peliculas = [];    // Inicializa el array peliculas vacío
            while ($row = $result->fetch_assoc()) { // Recorre los resultados
                $peliculas[] = $row; // Almacena cada fila en el array $peliculas
            }
            echo json_encode($peliculas); // Devuelve las películas en formato JSON
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]); // Devuelve un mensaje de error si la consulta falla
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true); // Decodifica el JSON recibido en un array asociativo

        if (isset($data['accion'])) {
            $accion = $data['accion'];

            switch ($accion) {
                case 'modificar':
                    if (!empty($data['id']) && !empty($data['titulo']) && !empty($data['lanzamiento']) && !empty($data['genero']) && !empty($data['duracion']) && !empty($data['director']) && !empty($data['actores']) && !empty($data['sinopsis']) && !empty($data['imagen'])) {
                        $id = $conn->real_escape_string($data['id']);
                        $titulo = $conn->real_escape_string($data['titulo']);
                        $lanzamiento = $conn->real_escape_string($data['lanzamiento']);
                        $genero = $conn->real_escape_string($data['genero']);
                        $duracion = $conn->real_escape_string($data['duracion']);
                        $director = $conn->real_escape_string($data['director']);
                        $actores = $conn->real_escape_string($data['actores']);
                        $sinopsis = $conn->real_escape_string($data['sinopsis']);
                        $imagen = $conn->real_escape_string($data['imagen']);

                        $sql = "UPDATE pelicula SET titulo='$titulo', lanzamiento='$lanzamiento', genero='$genero', duracion='$duracion', director='$director', actores='$actores', sinopsis='$sinopsis', imagen='$imagen' WHERE id='$id'";
                        if ($conn->query($sql) === TRUE) {
                            echo json_encode(["message" => "Película modificada con éxito"]);
                        } else {
                            echo json_encode(["message" => "Error: " . $conn->error]);
                        }
                    } else {
                        echo json_encode(["message" => "Datos incompletos para la modificación"]);
                    }
                    break;

                case 'eliminar':
                    if (!empty($data['id'])) {
                        $id = $conn->real_escape_string($data['id']);
                        $sql = "DELETE FROM pelicula WHERE id='$id'";
                        if ($conn->query($sql) === TRUE) {
                            echo json_encode(["message" => "Película eliminada con éxito"]);
                        } else {
                            echo json_encode(["message" => "Error: " . $conn->error]);
                        }
                    } else {
                        echo json_encode(["message" => "ID no proporcionado para la eliminación"]);
                    }
                    break;

                default:
                    echo json_encode(["message" => "Acción no soportada"]);
                    break;
            }
        } else {
            if (!empty($data['titulo']) && !empty($data['lanzamiento']) && !empty($data['genero']) && !empty($data['duracion']) && !empty($data['director']) && !empty($data['actores']) && !empty($data['sinopsis']) && !empty($data['imagen'])) {
                $titulo = $conn->real_escape_string($data['titulo']);
                $lanzamiento = $conn->real_escape_string($data['lanzamiento']);
                $genero = $conn->real_escape_string($data['genero']);
                $duracion = $conn->real_escape_string($data['duracion']);
                $director = $conn->real_escape_string($data['director']);
                $actores = $conn->real_escape_string($data['actores']);
                $sinopsis = $conn->real_escape_string($data['sinopsis']);
                $imagen = $conn->real_escape_string($data['imagen']);

                $sql = "INSERT INTO pelicula (titulo, lanzamiento, genero, duracion, director, actores, sinopsis, imagen) VALUES ('$titulo', '$lanzamiento', '$genero', '$duracion', '$director', '$actores', '$sinopsis', '$imagen')";
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(["message" => "Película añadida con éxito"]);
                } else {
                    echo json_encode(["message" => "Error: " . $conn->error]);
                }
            } else {
                echo json_encode(["message" => "Datos incompletos para añadir"]);
            }
        }
        break;

    default:
        echo json_encode(["message" => "Método no soportado"]); // Devuelve un mensaje de error si el método HTTP no está soportado
        break;
}

$conn->close(); // Cierra la conexión a la base de datos
