export default class Base {

    constructor(nombre, minutos) {
        this._nombre = nombre;
        this._minutos = Number(minutos);
        this._siguiente = null;
        this._anterior = null;
    }

    info() {
        return `<b>Nombre:</b> ${this._nombre} <b>Minutos:</b> ${this._minutos}`
    }

}