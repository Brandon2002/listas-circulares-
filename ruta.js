export default class Ruta {
    
    // Constructor
    constructor() {
        this._inicio = null;
        this._ultimo = null;
    }

    // Agregar Base
    agregarBase(base) {

        if (this._inicio === null) {
            this._inicio = base;
            this._ultimo = this._inicio;
            this._inicio._siguiente = this._inicio;
            this._inicio._anterior = this._inicio;
            return base;
        } else {

            if (base._nombre === this._ultimo._nombre || base._nombre === this._ultimo._siguiente._nombre) {
                return null;
            }
            this._ultimo._siguiente = base;
            this._ultimo._siguiente._anterior = this._ultimo;
            this._ultimo = this._ultimo._siguiente;
            this._ultimo._siguiente = this._inicio;
            this._inicio._anterior = this._ultimo;
            return base;
        }

    }

    eliminarBase(base) {

        if (this._inicio === null) {
            console.log('No se puede se realizar la acción');
            return null;
        }

        if (this._inicio == this._ultimo) {
            this._inicio = null;
            this._ultimo = null;
            return base;
        }

        if (this._inicio._siguiente._nombre == this._inicio._nombre || this._inicio._anterior._nombre == this._inicio._nombre) {
            this._inicio = null;
            this._ultimo = null;
            return new Ruta();
        }

        this._eliminarPorBusqueda(base);

    }

    _eliminarPorBusqueda(elemento) {

        let elim=null;
        if (elemento._nombre == this._inicio._nombre){
            elim = this._inicio;
            this._inicio=this._inicio._siguiente;
            this._inicio._anterior=this._ultimo;
            this._ultimo._siguiente = this._inicio;
            elim._siguiente=null;
            console.log('Borrado satisfactoriamente');
            return elim;
        }

        let temp = this._inicio;
        let temp2;
        while(temp._siguiente != this._inicio){
          if (temp._siguiente._nombre == elemento._nombre) {
            elim=temp._siguiente;
            temp._siguiente=temp._siguiente._siguiente;
            temp._siguiente._anterior = temp;
            elim._siguiente=null;
            this._ultimo = this._inicio._anterior;
            temp2 = elim;
            return temp2;
          } else {
            temp=temp._siguiente;
          }
        }
        return null;
    }

    listar() {
        return this._inicio;
    }

    crearTarjeta(base, hora, minutos) {
        const dev = new Array;
        if (this._inicio._nombre == this._ultimo._nombre) {
            return null;
        }
        if (this._inicio != null) {

            let temp = this._inicio;
            while (base != temp._nombre) {
                temp = temp._siguiente;
            }
    
            let fecha = new Date(2000, 0, 1, Number(hora.substr(0,2)), Number(hora.substr(3,5)));
            let min = Number(minutos);

            dev.push(`La ruta saldrá de ${temp._nombre} a las ${this.tiempo(fecha.getHours(), fecha.getMinutes())}`);

            do {
                if (min < temp._siguiente._minutos) {
                    break;
                }
                fecha.setTime(fecha.getTime() + (temp._siguiente._minutos * 60000));
                dev.push(`La ruta llegará a ${temp._siguiente._nombre} a las ${this.tiempo(fecha.getHours(), fecha.getMinutes())}`)
                min -= temp._siguiente._minutos;
                temp = temp._siguiente;
            } while (min > 0);
        } else {
            return null;
        }
        return dev;
    }

    tiempo(hours, minutes) {

        let horas = hours.toString();
        let minutos = minutes.toString();
        if (horas.length == 1) {
            horas = `0${horas}`
        }
        if (minutos.length == 1) {
            minutos = `0${minutos}`
        }
        return `${horas}:${minutos}`
    }
}