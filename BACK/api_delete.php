<?php
// Permitir el acceso desde cualquier origen y establecer los métodos y encabezados permitidos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Incluir el archivo de conexión a la base de datos
include_once 'conexion.php';

// Obtener el método de la solicitud HTTP (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Manejar las solicitudes según el método
if ($method === 'DELETE') {
    // Manejar una solicitud DELETE para eliminar una película
    parse_str(file_get_contents("php://input"), $delete_vars);
    $id = $delete_vars['id'];

    // Preparar la consulta SQL segura para eliminación
    $sql = "DELETE FROM pelicula WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    // Ejecutar la consulta preparada
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Película eliminada correctamente']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Error al eliminar la película']);
    }
    $stmt->close();
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
