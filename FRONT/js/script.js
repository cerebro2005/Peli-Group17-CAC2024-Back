const API_SERVER_GET_POST = 'http://localhost/CaC2024/BACK/api_get_post.php';
const API_SERVER_DELETE = 'http://localhost/CaC2024/BACK/api_delete.php';
const API_SERVER_PUT = 'http://localhost/CaC2024/BACK/api_put.php';

document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar las películas al cargar la página
    cargarPeliculas();

    // Event listener para el formulario de agregar película
    document.getElementById('pelicula-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente

        // Obtener los datos del formulario
        let formData = new FormData(this);

        // Realizar la solicitud POST para agregar la película
        fetch(API_SERVER_GET_POST, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Película agregada:', data);
            // Limpiar el formulario después de agregar la película
            this.reset();
            // Volver a cargar la lista de películas actualizada
            cargarPeliculas();
        })
        .catch(error => {
            console.error('Error al agregar película:', error);
        });
    });

    // Función para cargar las películas desde el servidor
    function cargarPeliculas() {
        fetch(API_SERVER_GET_POST)
        .then(response => response.json())
        .then(data => {
            // console.log('Películas cargadas:', data);
            // Limpiar la tabla antes de agregar las nuevas filas
            document.getElementById('bodyTablePeliculas').innerHTML = '';

            // Recorrer los datos y crear las filas de la tabla
            data.forEach(function(pelicula) {
                let imagenSrc = pelicula.imagen ? `../assets/img/agregadas/${pelicula.imagen}` : '';
                let row = `
                    <tr>
                        <td style="text-align: center;">${pelicula.id}</td>
                        <td style="text-align: center;">${pelicula.titulo}</td>
                        <td style="text-align: center;">${pelicula.lanzamiento}</td>
                        <td style="text-align: center;">${pelicula.genero}</td>
                        <td style="text-align: center;">${pelicula.duracion}</td>
                        <td style="text-align: center;">${pelicula.imagen ? `<img src="${imagenSrc}" class="img-thumbnail" style="max-width: 100px;" />` : 'Sin imagen'}</td>
                        <td style="text-align: center;">
                            <button class="btn btn-warning btn-sm" onclick="editarPelicula(${pelicula.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                document.getElementById('bodyTablePeliculas').innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error al cargar películas:', error);
        });
    }

    // Función para editar una película (a implementar según tu necesidad)
    function editarPelicula(id) {
        // Aquí puedes implementar la lógica para editar una película
        alert('Esta funcionalidad se encuentra en construccion');
        //console.log('Editar película con ID:', id);
    }

    // Función para eliminar una película
    function eliminarPelicula(id) {
        fetch(API_SERVER_DELETE, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ id: id })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Película eliminada:', data);
            cargarPeliculas();
        })
        .catch(function(error) {
            console.error('Error al eliminar película:', error);
        });
    }

    // Hacer las funciones accesibles globalmente
    window.editarPelicula = editarPelicula;
    window.eliminarPelicula = eliminarPelicula;
});
