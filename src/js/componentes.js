
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
        let animal = obtenerinfo();
        crearPersonaje(animal);
    });
}

const modificarPersonajes = () => {
    modificar.addEventListener('click', async() =>{
        divAnimales.innerHTML = '';
        let personajes = await init();
        let animal = obtenerinfo();
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

const obtenerinfo = () => {
    let name = document.querySelector('.nombre').value;
    let img = document.querySelector('.imagen').value;
    let birthday = document.querySelector('.birthday').value;
    let hobby = document.querySelector('.hobby').value;
    let personalidad = document.querySelector('.personality').value;
    let sexo = document.querySelector('.gender').value;
    let especie = document.querySelector('.species').value;
    let animal = {name, img, birthday, hobby, personalidad, sexo, especie };
    return animal;
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
    let result = ( resp.ok ) ? 'Insertado': 'No se pudo insertar';
    crearHTMLresultado(result);
}

const modificarPersonaje = async(personajes, animal) => {
    const person = Object.entries(personajes);
    let animales = person.find(personaje => personaje[1].name["name-EUes"].toLowerCase().includes(animal.name.toLowerCase()));
    const resp = await fetch(`${urlanimal}${animales[1].id}`, {
        method: 'PUT',
        body: JSON.stringify(animal),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    let result = ( resp.ok ) ? 'Modificado': 'No se pudo modificar';
    crearHTMLresultado(result);
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
                <li>Personality : ${personaje.personality}</li>
                <li>Birthday : ${personaje.birthday}</li>
                <li>Species : ${personaje.species}</li>
                <li>Hobby : ${personaje.hobby}</li>
                <li>Gender : ${personaje.gender}</li>
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