
const urlanimal = "https://acnhapi.com/v1/villagers/";
const buscar = document.querySelector('.buscar'),
      guardar = document.querySelector('.guardar'),
      modificar = document.querySelector('.modificar'),
      borrar = document.querySelector('.borrar'),
    divAnimales = document.querySelector('.infopersonaje');

export{
    infoPersonajes,
    guardarPersonajes,
    modificarPersonajes,
    borrarPersonajes
}


const init = async() => {
    const personajes = await obtenerPersonajes(); 
    return personajes;  
}

const obtenerPersonajes = async() => {
    const resp = await fetch(urlanimal);
    const personajes = await resp.json();
    return personajes;
}

const infoPersonajes = () => {
    buscar.addEventListener('click', async() =>{
        divAnimales.innerHTML = '';
        const animal = document.querySelector('.name').value;
        let personajes = await init();
        getPersonaje(personajes, animal);
    });
}

const guardarPersonajes = () => {
    guardar.addEventListener('click', () =>{
        divAnimales.innerHTML = '';
        const animal = document.querySelector('.name').value;
        crearPersonaje(animal);
    });
}

const modificarPersonajes = () => {
    modificar.addEventListener('click', async() =>{
        divAnimales.innerHTML = '';
        const animal = document.querySelector('.name').value;
        let personajes = await init();
        modificarPersonaje(personajes, animal);
    });
}

const borrarPersonajes = () => {
    borrar.addEventListener('click', async() =>{
        divAnimales.innerHTML = '';
        const animal = document.querySelector('.name').value;
        let personajes = await init();
        borrarPersonaje(personajes, animal);
    });
}

const getPersonaje = async(personajes, animal) => {
    const person = Object.entries(personajes);
    let animales = person.find(personaje => personaje[1].name["name-EUes"].toLowerCase().includes(animal.toLowerCase()));
    const resp = await fetch(`${ urlanimal }${animales[1].id}`);
    const personaje = await resp.json();
    crearHTML (personaje);
}

const crearPersonaje = async(animal) => {
    const resp = await fetch(urlanimal, {
        method: 'POST',
        body: JSON.stringify(animal),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    return await resp.json();
}

const modificarPersonaje = async(personajes, animal) => {
    const person = Object.entries(personajes);
    let animales = person.find(personaje => personaje[1].name["name-EUes"].toLowerCase().includes(animal.toLowerCase()));
    const resp = await fetch(`${urlanimal}${animales[1].id}`, {
        method: 'PUT',
        body: JSON.stringify(animal),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    return await resp.json();
}

const borrarPersonaje = async(personajes, animal) => {
    const person = Object.entries(personajes);
    let animales = person.find(personaje => personaje[1].name["name-EUes"].toLowerCase().includes(animal.toLowerCase()));
    const resp = await fetch(`${ urlanimal }${animales[1].id}`, {
        method: 'DELETE' 
    });
    let result = ( resp.ok ) ? 'Borrado': 'No se pudo eliminar';
    crearHTMLresultado(result);
} 

const crearHTML = (personaje) => {
    const htmlPers = `
    <div id="${personaje.id}" class="peli">
        <img src="${ personaje.image_uri }" class="img-per">
        <div class="info">
            <h2>${personaje.name["name-EUes"]}</h2>
            <ul>
                <li>Original title : ${personaje.personality}</li>
                <li>Original title romanised : ${personaje.birthday}</li>
                <li>Description : ${personaje.species}</li>
                <li>Director : ${personaje.hobby}</li>
                <li>Date : ${personaje.gender}</li>
            </ul>
        </div>
    </div>
    `;

    const div = document.createElement('div'); 
    div.innerHTML = htmlPers;
    divAnimales.append(div.lastElementChild);
}

const crearHTMLresultado = (result) => {
    const htmlPers = `
    <div>
        <p>${result}</p>
    </div>
    `;
    const div = document.createElement('div'); 
    div.innerHTML = htmlPers;
    divAnimales.append(div.lastElementChild);
}


