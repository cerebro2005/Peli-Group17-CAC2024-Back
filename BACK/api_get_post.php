<?php
// Permitir el acceso desde cualquier origen y establecer los métodos y encabezados permitidos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Incluir el archivo de conexión a la base de datos
include_once 'conexion.php';

// Directorio de destino para las imágenes en la parte frontal
$targetDir = '../FRONT/assets/img/agregadas/';

// Obtener el método de la solicitud HTTP (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Manejar las solicitudes según el método
switch ($method) {
    case 'GET':
        // Consulta para obtener todas las películas
        $sql = "SELECT * FROM pelicula ORDER BY id DESC";
        $result = $conn->query($sql);

        $peliculas = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $peliculas[] = $row;
            }
        }
        echo json_encode($peliculas);
        break;

    case 'POST':
        // Manejar una solicitud POST para agregar una nueva película
        $titulo = $_POST['titulo'] ?? ''; // solo el titulo es obligatorio
        $lanzamiento = $_POST['lanzamiento'] ?? '';
        $genero = $_POST['genero'] ?? '';
        $duracion = $_POST['duracion'] ?? '';
        $director = $_POST['director'] ?? '';
        $actores = $_POST['actores'] ?? '';
        $sinopsis = $_POST['sinopsis'] ?? '';
        $imagen = $_FILES['imagen'] ?? null; // Obtener el archivo de imagen enviado

        // Verificar si se envió una imagen válida
        if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
            // Generar un nombre único para la imagen
            $nombreImagen = uniqid('imagen_') . '_' . basename($imagen['name']);
            $rutaImagen = $targetDir . $nombreImagen;

            // Mover el archivo de imagen al directorio de destino
            if (move_uploaded_file($imagen['tmp_name'], $rutaImagen)) {
                // Preparar la consulta SQL segura para inserción con imagen
                $sql = "INSERT INTO pelicula (titulo, lanzamiento, genero, duracion, director, actores, sinopsis, imagen)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssssss", $titulo, $lanzamiento, $genero, $duracion, $director, $actores, $sinopsis, $nombreImagen);

                // Ejecutar la consulta preparada
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Película agregada correctamente']);
                } else {
                    http_response_code(500); // Internal Server Error
                    echo json_encode(['error' => 'Error al agregar la película']);
                }
                $stmt->close();
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(['error' => 'Error al mover el archivo de imagen']);
            }
        } else {
            // Preparar la consulta SQL segura para inserción sin imagen
            $sql = "INSERT INTO pelicula (titulo, lanzamiento, genero, duracion, director, actores, sinopsis)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssssss", $titulo, $lanzamiento, $genero, $duracion, $director, $actores, $sinopsis);

            // Ejecutar la consulta preparada
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Película agregada correctamente']);
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(['error' => 'Error al agregar la película']);
            }
            $stmt->close();
        }
        break;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
