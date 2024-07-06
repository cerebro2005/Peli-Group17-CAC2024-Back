// URL del servidor API
const SERVIDOR_API = 'http://localhost/CaC2024/BACK/api.php';

// Cuando el documento HTML ha terminado de cargarse
document.addEventListener('DOMContentLoaded', () => {
    const bodyTablePeliculas = document.getElementById('bodyTablePeliculas'); // Obtiene el cuerpo de la tabla donde se mostrarán las películas
    const form = document.getElementById('pelicula-form'); // Obtiene el formulario para añadir nuevas películas

    // Función para obtener las películas del servidor
    const fetchPeliculas = async () => {
        try {
            const response = await fetch(SERVIDOR_API); // Hace una solicitud GET a la API
            if (!response.ok) throw new Error('La respuesta de la red no fue satisfactoria'); // Si la respuesta no es satisfactoria, lanza un error
            const peliculas = await response.json(); // Convierte la respuesta en un objeto JSON

            bodyTablePeliculas.innerHTML = ''; // Limpia el contenido del cuerpo de la tabla

            // Recorre el array de películas y las añade a la tabla
            peliculas.forEach(pelicula => {
                const tr = document.createElement('tr'); // Crea una nueva fila en la tabla
                tr.innerHTML = `
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.lanzamiento}</td>
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.duracion}</td>
                    <td><img width="150px" src="${pelicula.imagen}" alt="${pelicula.titulo}"></td>
                    <td>
                        <button class="btn btn-sm btn-warning" id="edit-${pelicula.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" id="delete-${pelicula.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `; // Se rellena la fila con los datos de la película

                bodyTablePeliculas.appendChild(tr); // Añade la fila al cuerpo de la tabla

                // Añade el evento click al botón de modificar
                document.getElementById(`edit-${pelicula.id}`).addEventListener('click', () => {
                    // Aquí puedes solicitar los nuevos datos al usuario, por ejemplo, con un formulario
                    const nuevosDatos = {
                        titulo: prompt("Nuevo título:", pelicula.titulo),
                        lanzamiento: prompt("Nuevo lanzamiento:", pelicula.lanzamiento),
                        genero: prompt("Nuevo género:", pelicula.genero),
                        duracion: prompt("Nueva duración:", pelicula.duracion),
                        director: prompt("Nuevo director:", pelicula.director),
                        actores: prompt("Nuevos actores:", pelicula.actores),
                        sinopsis: prompt("Nueva sinopsis:", pelicula.sinopsis),
                        imagen: prompt("Nueva URL de la imagen:", pelicula.imagen)
                    };

                    fetch(SERVIDOR_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            accion: 'modificar',
                            id: pelicula.id,
                            ...nuevosDatos
                        })
                    }).then(response => response.json())
                    .then(data => {
                        console.log('Película modificada:', data);
                        // Aquí puedes añadir código adicional para manejar la respuesta
                        // Por ejemplo, puedes actualizar la fila en la tabla con los nuevos datos
                    }).catch(error => {
                        console.error('Error al modificar la película:', error);
                    });
                });

                // Añade el evento click al botón de eliminar
                document.getElementById(`delete-${pelicula.id}`).addEventListener('click', () => {
                    fetch(SERVIDOR_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            accion: 'eliminar',
                            id: pelicula.id
                        })
                    }).then(response => response.json())
                    .then(data => {
                        console.log('Película eliminada:', data);
                        // Aquí puedes añadir código adicional para manejar la respuesta
                        // Por ejemplo, puedes eliminar la fila de la tabla
                        tr.remove();
                    }).catch(error => {
                        console.error('Error al eliminar la película:', error);
                    });
                });
            });
        } catch (error) {
            console.log('Error al obtener las películas:', error); // Muestra un mensaje de error en la consola si ocurre algún problema
        }
    };

    fetchPeliculas(); // Llama a la función para obtener las películas del servidor
});
