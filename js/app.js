document.addEventListener('DOMContentLoaded', () => {
    const filtro = document.querySelector('#resultados');
    const personaje = document.querySelector('#personaje');
    const condicion = document.querySelector('#condicion');

    obtenerInformacion();

    personaje.addEventListener('input', () => {
        obtenerInformacion(personaje.value, condicion.value);
    });

    condicion.addEventListener('change', () => {
        obtenerInformacion(personaje.value, condicion.value);
    });

    // Obtener informacion de la api
    async function obtenerInformacion(name, status) {
        // Sección para extraer información del formulario
        url = 'https://rickandmortyapi.com/api/character/?';

        if (name) {
            url += `name=${name}&`;
        }
        if (status) {
            url += `status=${status}`;
        }

        try {
            const resultados = await fetch(url);
            const data = await resultados.json();
            limpiarHTML();
            mostrarInformacionHTML(data.results);
        } catch (error) {
            mostrarAlerta('Corrige la búsqueda');
        }
    }

    function mostrarInformacionHTML(data) {
        const fotos = document.createElement('div');
        fotos.classList.add('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-4');

        data.forEach((element) => {
            const { name, status, image, species } = element;
            const card = document.createElement('div');
            card.classList.add(
                'max-w-sm',
                'p-6',
                'bg-white',
                'border',
                'border-gray-200',
                'rounded-lg',
                'shadow',
                'dark:bg-gray-800',
                'dark:border-gray-700'
            );
            card.innerHTML = `
                <img src="${image}" class="rounded"></img>
                <p class="text-xl text-blue-600 text-center mt-2 mb-2">${name}</p>
                <p class="text-center">Especie: ${species}</p>
                <p class="text-center">Estado: ${status}</p>
            `;
            fotos.appendChild(card);
            filtro.appendChild(fotos);
        });
    }

    function limpiarHTML() {
        while (filtro.firstChild) {
            filtro.removeChild(filtro.firstChild);
        }
    }

    function mostrarAlerta(mensaje) {
        const alerta = document.querySelector('.bg-red-300');
        // Revisa si no existe la clase para mostrar el error
        if (!alerta) {
            // Crear alerta
            const alerta = document.createElement('div');
            alerta.classList.add(
                'px-4',
                'py-3',
                'mt-10',
                'text-sm',
                'text-center',
                'text-red-800',
                'rounded-lg',
                'bg-red-300',
                'mx-auto',
                'max-w-sm'
            );

            alerta.innerHTML = `
            <span class="font-medium">¡Error!</span> ${mensaje}
            `;
            filtro.appendChild(alerta);

            // Se elimine la alerta después de 3 segundos
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
    }
});
