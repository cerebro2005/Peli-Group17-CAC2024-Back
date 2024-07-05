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
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.lanzamiento}</td>
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.duracion}</td>
                    <td>${pelicula.director}</td>
                    <td>${pelicula.actores}</td>
                    <td><img width="150px" src="${pelicula.imagen}" alt="${pelicula.titulo}"></td>
                `; // Se rellena la fila con los datos de la película
                // la sinopsis de la pelicula no se muestra en el listado ya que esta puede ser muy larga
                //<td>${pelicula.sinopsis}</td>
                bodyTablePeliculas.appendChild(tr); // Añade la fila al cuerpo de la tabla
            });
        } catch (error) {
            console.log('Error al obtener las películas:', error); // Muestra un mensaje de error en la consola si ocurre algún problema
        }
    };

    // Evento que se dispara al enviar el formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene que el formulario se envíe de manera predeterminada (es decir, que recargue la página)
        const titulo = document.getElementById('titulo').value; // Obtiene el valor del campo título
        const lanzamiento = document.getElementById('lanzamiento').value; // Obtiene el valor del campo lanzamiento
        const genero = document.getElementById('genero').value; // Obtiene el valor del campo género
        const duracion = document.getElementById('duracion').value; // Obtiene el valor del campo duración
        const director = document.getElementById('director').value; // Obtiene el valor del campo director
        const actores = document.getElementById('actores').value; // Obtiene el valor del campo actores
        const sinopsis = document.getElementById('sinopsis').value; // Obtiene el valor del campo sinopsis
        const imagen = document.getElementById('imagen').value; // Obtiene el valor del campo imagen

        // Realiza una solicitud POST a la API para añadir una nueva película
        try {
            const response = await fetch(SERVIDOR_API, {
                method: 'POST', // Indica que la solicitud es de tipo POST
                headers: {
                    'Content-Type': 'application/json' // Establece el tipo de contenido como JSON
                },
                body: JSON.stringify({ titulo, lanzamiento, genero, duracion, director, actores, sinopsis, imagen }) // Convierte los datos del formulario a JSON
            });

            if (!response.ok) throw new Error('La respuesta de la red no fue satisfactoria'); // Si la respuesta no es satisfactoria, lanza un error
            const result = await response.json(); // Convierte la respuesta en un objeto JSON
            alert(result.message); // Muestra un mensaje de alerta con el resultado
            fetchPeliculas(); // Vuelve a obtener y mostrar las películas
            form.reset(); // Reinicia el formulario para que quede vacío
        } catch (error) {
            console.log('Error al enviar el formulario:', error); // Muestra un mensaje de error en la consola si ocurre algún problema
        }
    });

    fetchPeliculas(); // Obtiene y muestra las películas cuando la página se carga
});
