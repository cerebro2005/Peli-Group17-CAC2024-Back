document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-peliculas');
    const listaPeliculas = document.getElementById('listaPeliculas');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nuevaPelicula = {
            titulo: form.titulo.value.trim(),
            fechaLanzamiento: form.fechaLanzamiento.value,
            genero: form.genero.value.trim(),
            duracion: form.duracion.value.trim(),
            director: form.director.value.trim(),
            reparto: form.reparto.value.trim(),
            sinopsis: form.sinopsis.value.trim(),
            imagen: form.imagen.files[0]
        };

        agregarPelicula(nuevaPelicula);
        form.reset();
    });

    const agregarPelicula = (pelicula) => {
        const peliculaElement = document.createElement('div');
        peliculaElement.classList.add('pelicula-item');

        const img = document.createElement('img');
        img.src = URL.createObjectURL(pelicula.imagen);
        img.alt = `Imagen de ${pelicula.titulo}`;
        img.classList.add('imgPelicula');

        const detalles = document.createElement('div');
        detalles.classList.add('detallesPelicula');

        const titulo = document.createElement('h3');
        titulo.textContent = pelicula.titulo;

        const info = document.createElement('p');
        info.textContent = `
            Fecha de Lanzamiento: ${pelicula.fechaLanzamiento} | 
            Género: ${pelicula.genero} | 
            Duración: ${pelicula.duracion} minutos | 
            Director: ${pelicula.director} | 
            Reparto: ${pelicula.reparto}
        `;

        const sinopsis = document.createElement('p');
        sinopsis.textContent = pelicula.sinopsis;

        detalles.appendChild(titulo);
        detalles.appendChild(info);
        detalles.appendChild(sinopsis);

        peliculaElement.appendChild(img);
        peliculaElement.appendChild(detalles);

        listaPeliculas.appendChild(peliculaElement);
    };
});
