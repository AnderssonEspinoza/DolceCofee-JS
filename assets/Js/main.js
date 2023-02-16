let descripcionProductosComprados = []; 
let precioDeProductosComprados = []
const productos = [
    {
        item: 'Capuccino',
        price: 5.7
    },
    {
        item: 'Espresso Lungo',
        price: 7
    },
    {
        item: 'Cafe Americano',
        price: 3
    }

] 


const saludar = ()=> {
   let nombre = prompt('Bienvenido a Dolce Coffe' + '\n' +'Ingrese su nombre')

   while(!nombre){
    if( nombre === null){
        alert('Accion cancelada')
        return null;
    }
    alert('Ingrese un nombre, por favor')
    nombre =  prompt('Bienvenido a Dolce Coffe' + '\n' +'Ingrese su nombre')
   }
   return nombre;
}

const realizarPedido = (nombre) => {
    if (nombre === null) {
        return;
    }

    let pedido = prompt(`Un placer saludarte ${nombre}, ¿Desea realizar una compra?
    1-Si
    2-No`)
    if (pedido === null){
        alert('Accion cancelada');
        return;
    }
    pedido = parseInt(pedido)

    if (pedido === 1){
        elegirProducto();
        seguirComprando();
    }
    else if (pedido === 2) {
        alert('Lamentamos que no desee comprar nuestros productos, estaremos siempre a su servicio')
    }
    else{
        alert('Opcion no valida')
    }
}

const mostrarProductos = productos => productos.map(({item, price}, index) => `${index +1}. ${item} -  $/${price}`).join('\n')


function elegirProducto(){
    let listaProductos = mostrarProductos(productos);
    let producto = parseInt(prompt(`Nuestros productos son:
${listaProductos}
Elija el numero segun el producto que desea comprar`))
   
  
       if (producto <= productos.length && producto != 0){
            agregarProductos(producto - 1);
       }else{
            alert('Opcion no valida')
       }
}


const agregarProductos = (indice) =>{
    const productoSeleccionado = productos[indice];
    descripcionProductosComprados.push(productoSeleccionado);
    precioDeProductosComprados.push(productoSeleccionado.price);
    alert(`Su ${productoSeleccionado.item} estará listo en unos minutos`)
}



const mostrarProductosComprados = (descripcionProductosComprados) => descripcionProductosComprados.map(({item, price}, index) => `${index +1}. ${item} -  $/${price}`).join('\n')




let seguirComprando = () =>{
    let pregunta = parseInt(prompt(`¿Desea seguir comprando?
    1- Si 
    2- No`))
    while (pregunta == 1){
        elegirProducto()
        pregunta = parseInt(prompt(`¿Desea seguir comprando?
    1- Si 
    2- No`))
    }
    let listaProductosComprados = mostrarProductosComprados(descripcionProductosComprados);
    let totalPagar = precioTotal();
    
    alert(`Su orden es:
    ${listaProductosComprados}
    Su importe total a pagar es: ${totalPagar}`)

    alert('Gracias por su compra, y recuerde inicie su dia con un buen Café...')

    
}
const precioTotal = () => precioDeProductosComprados.reduce((acum, price) => acum + price, 0)


realizarPedido(saludar());