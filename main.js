import Base from './base.js';
import Ruta from './ruta.js'
import Actualizar from './actualizar.js'

let newRu = new Ruta();
let act = new Actualizar();

const list = () => {
    act.html(newRu.listar(), false);
}

const listInvert = () => {
    act.html(newRu.listar(), true);
}

const addBase = () => {
    let baseName = document.querySelector('#baseName').value;
    let baseMinutes = document.querySelector('#baseMinutes').value;
    if (baseName == "" || baseMinutes == "" || baseName == " " || baseMinutes == " ") {
        alert('Faltan campos por rellenar')
        return null;
    }

    let nuevaBase = new Base(baseName, baseMinutes);
    if (newRu.agregarBase(nuevaBase) === null) {
        alert('La misma base no se puede agregar');
    }

    act.updateRutaSelect(nuevaBase);
    list();
}

const removeBase = () => {
    let baseName = (document.getElementById('selectRuta').value);
    let temp = new Base(baseName, null);
    if (baseName == "" || baseName == "null" || baseName == " " || baseName == null) {
        alert('Selecciona un valor primero.')
        return null;
    }

    let temp2 = newRu.eliminarBase(temp);
    if (temp2 === null || temp2 == "null") {
        alert('No es posible eliminar, no existe');
  
    } else {
        alert(`Se ha eliminado: ${temp._nombre}`)
    }
    act.removeRutaSelect(temp);
    list();
}

const crearTarjeta = () => {

    let baseName = (document.getElementById('selectRuta').value);
    let hour = (document.getElementById('horaSalida').value);
    let minutes = (document.getElementById('minutosCirculacion'));

    if (minutes.value > 2880) {
        minutes.value = 2880;
        minutes = minutes.value;
        alert('Solo 48 horas máximo');
    } else {
        minutes = minutes = minutes.value;
    }

    if (baseName == "" || baseName == "null" || baseName == " " || baseName == null) {
        alert('Todos los campos requeridos');
        act.deleteCard();
        return null;
    }

    let temp = newRu.crearTarjeta(baseName, hour, minutes);
    if (temp === null) {
        alert('Mínimo dos bases agregadas');
        act.deleteCard();
    } else {
        act.mostrarTarjeta(temp);
    }
}

let btnList = document.querySelector('#btnList');
btnList.addEventListener('click', list);

let btnListInvert = document.querySelector('#btnListInvert');
btnListInvert.addEventListener('click', listInvert);

let btnAdd = document.querySelector('#btnAdd');
btnAdd.addEventListener('click', addBase);

let btnRemove = document.querySelector('#deleteBase');
btnRemove.addEventListener('click', removeBase);

let btnAddCard = document.querySelector('#createCard');
btnAddCard.addEventListener('click', crearTarjeta);