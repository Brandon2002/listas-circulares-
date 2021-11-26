export default class Actualizar {

    html(lista, boolean) {

        let array = this.getProductsList(lista);
        
        this.deleteHtml();

        let block_to_insert;
        let container_block;

        if (array != null) {
            array.forEach(element => {
                block_to_insert = document.createElement( 'div' );
                block_to_insert.classList.add("productsIndex");
                block_to_insert.innerHTML = `${element.info()}`;
                 
                container_block = document.getElementById('listaHtml');

                if (boolean) {
                    container_block.prepend(block_to_insert);
                } else {
                    container_block.appendChild(block_to_insert);
                }
            });   
        }
    }

    mostrarTarjeta(lista) {

        this.deleteCard();

        let block_to_insert;
        let container_block;

        if (lista != null || lista.length > 0) {
            lista.forEach(element => {
                block_to_insert = document.createElement( 'div' );
                block_to_insert.classList.add("cardElements");
                block_to_insert.innerHTML = `${element}`;
                 
                container_block = document.getElementById('tarjetaCreada');
                container_block.appendChild(block_to_insert);
            });   
        }
    }

    getProductsList(lista) {
        let list = [];
        let current = lista;
        
        do {
            if (current != null) {
                list.push(current);
                current = current._siguiente;   
            } else {
                list = null;
                break;
            }
        } while (current._nombre != lista._nombre);
        return list;
    }

    deleteHtml() {
        const elements = document.getElementsByClassName('productsIndex');
        while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
        }
    }

    deleteCard() {
        const elements = document.getElementsByClassName('cardElements');
        while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
        }
    }

    updateRutaSelect(ruta) {
        let selector = document.getElementById("selectRuta");
        var option = document.createElement("option");
        option.setAttribute('id',ruta._nombre);
        option.text = ruta._nombre;
        option.value = ruta._nombre;
        selector.add(option);
        return ruta;
    }

    removeRutaSelect(ruta) {
        let selector = document.getElementById(`${ruta._nombre}`);
        selector.remove();
        return ruta;
    }

  

}