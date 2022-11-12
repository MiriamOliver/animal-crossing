import './css/components.css'
import * as crud from './js/componentes';
//import {infoPersonajes} from './js/componentes';

crud.infoPersonajes();
crud.guardarPersonajes();
crud.modificarPersonajes();
crud.borrarPersonajes();

/* CRUD.getUsuario(1).then(console.log);
CRUD.crearUsuario({
    name: 'Inma',
    job: 'Software Engineer'
}).then(console.log);

CRUD.actualizarUsuario(1, {
    name: 'Melisa',
    job: 'DevOps'
}).then(console.log);

CRUD.borrarUsuario(1).then(console.log); */