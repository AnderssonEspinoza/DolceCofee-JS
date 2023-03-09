// let descripcionProductosComprados = []; 
// let precioDeProductosComprados = []
// const productos = [
//     {
//         item: 'Capuccino',
//         price: 5.7
//     },
//     {
//         item: 'Espresso Lungo',
//         price: 7
//     },
//     {
//         item: 'Cafe Americano',
//         price: 3
//     }

// ] 


// const saludar = ()=> {
//    let nombre = prompt('Bienvenido a Dolce Coffe' + '\n' +'Ingrese su nombre')

//    while(!nombre){
//     if( nombre === null){
//         alert('Accion cancelada')
//         return null;
//     }
//     alert('Ingrese un nombre, por favor')
//     nombre =  prompt('Bienvenido a Dolce Coffe' + '\n' +'Ingrese su nombre')
//    }
//    return nombre;
// }

// const realizarPedido = (nombre) => {
//     if (nombre === null) {
//         return;
//     }

//     let pedido = prompt(`Un placer saludarte ${nombre}, ¿Desea realizar una compra?
//     1-Si
//     2-No`)
//     if (pedido === null){
//         alert('Accion cancelada');
//         return;
//     }
//     pedido = parseInt(pedido)

//     if (pedido === 1){
//         elegirProducto();
//         seguirComprando();
//     }
//     else if (pedido === 2) {
//         alert('Lamentamos que no desee comprar nuestros productos, estaremos siempre a su servicio')
//     }
//     else{
//         alert('Opcion no valida')
//     }
// }

// const mostrarProductos = productos => productos.map(({item, price}, index) => `${index +1}. ${item} -  $/${price}`).join('\n')


// function elegirProducto(){
//     let listaProductos = mostrarProductos(productos);
//     let producto = parseInt(prompt(`Nuestros productos son:
// ${listaProductos}
// Elija el numero segun el producto que desea comprar`))
   
  
//        if (producto <= productos.length && producto != 0){
//             agregarProductos(producto - 1);
//        }else{
//             alert('Opcion no valida')
//        }
// }


// const agregarProductos = (indice) =>{
//     const productoSeleccionado = productos[indice];
//     descripcionProductosComprados.push(productoSeleccionado);
//     precioDeProductosComprados.push(productoSeleccionado.price);
//     alert(`Su ${productoSeleccionado.item} estará listo en unos minutos`)
// }



// const mostrarProductosComprados = (descripcionProductosComprados) => descripcionProductosComprados.map(({item, price}, index) => `${index +1}. ${item} -  $/${price}`).join('\n')




// let seguirComprando = () =>{
//     let pregunta = parseInt(prompt(`¿Desea seguir comprando?
//     1- Si 
//     2- No`))
//     while (pregunta == 1){
//         elegirProducto()
//         pregunta = parseInt(prompt(`¿Desea seguir comprando?
//     1- Si 
//     2- No`))
//     }
//     let listaProductosComprados = mostrarProductosComprados(descripcionProductosComprados);
//     let totalPagar = precioTotal();
    
//     alert(`Su orden es:
// ${listaProductosComprados}
// Su importe total a pagar es: $/${totalPagar}`)

//     alert('Gracias por su compra, y recuerde inicie su dia con un buen Café...')

    
// }
// const precioTotal = () => precioDeProductosComprados.reduce((acum, price) => acum + price, 0)


// realizarPedido(saludar());

// 




const containerCartEmpy = document.querySelector('.container-cart-empty');
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const containerBtnCart = document.querySelector('.container-btn-cart');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');
// console.log(productsList);

// Variables de arreglos de productos 
let allProduct =[];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos')

const cartEmpty = document.querySelector('.cart-empty')
const cartTotal = document.querySelector('.cart-total')

document.addEventListener('DOMContentLoaded', () => {
    const savedProducts = localStorage.getItem('products-in-cart');
    if (savedProducts) {
      allProduct = JSON.parse(savedProducts);
      showHTML();
    }
  });

// Funcion para mostrar en el html
const showHTML = () =>{

    if(!allProduct.length){
        containerCartEmpy.style.display = 'flex';
        containerBtnCart.style.display='none'
        
        // cartTotal.style.display= 'block'
        // cartEmpty.style.display= 'block';
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        valorTotal.classList.add('hidden');
    } else {
        containerCartEmpy.style.display = 'none'
        containerBtnCart.style.display='flex'
        // cartTotal.style.display='none'
        // cartEmpty.style.display= 'none';
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        valorTotal.classList.remove('hidden');
    }

    // clear html
    rowProduct.innerHTML ='';

    let total = 0;
    let totalOfProducts = 0;

    allProduct.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product')
        containerProduct.innerHTML = `
        <div class="info-cart-product">
			<span class="cantidad-producto-carrito">${product.quantity}</span>
			<p class="titulo-producto-carrito">${product.title}</p>
			<span class="precio-producto-carrito">${product.price}</span>
            <img class= 'img-cart-products' src='${product.img}' style='width:40px; heigth:40px'></img>
		</div>
		<svg
		    xmlns="http://www.w3.org/2000/svg"
		    fill="none"
		    viewBox="0 0 24 24"
		    stroke-width="1.5"
		    stroke="currentColor"
		    class="icon-close"
		    >

		<path
		    stroke-linecap="round"
		    stroke-linejoin="round"
		    d="M6 18L18 6M6 6l12 12"
		/>
	    </svg>
        `
        rowProduct.append(containerProduct);
        total = total + parseFloat(product.quantity*product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
        
    })

    valorTotal.innerText = `$${total.toFixed(2)}`
    countProducts.innerText = totalOfProducts;
}




//Verificamos si en otra seccion de la pagina existe el una lista de productos
if(productsList !== null){

    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')){
            
            const product = e.target.parentElement;
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('p').textContent,
                price: product.querySelector('h5').textContent,
                img: product.querySelector('img').src         
            };
            
            const exist = allProduct.some(product => product.title === infoProduct.title);
            if (exist){
            const products = allProduct.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                } else{
                    return product;
                }
            })
            allProduct = [...products];
        }else{
            allProduct = [...allProduct, infoProduct];
        }
        // console.log('Productos guardados en localStorage:', allProduct);
        showHTML();
        localStorage.setItem('products-in-cart', JSON.stringify(allProduct));
        // sessionStorage.setItem('products-in-cart', JSON.stringify(allProduct));
    }
});

}

document.addEventListener('click', e => {
    
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        console.log(product)
        const title = product.querySelector('p').textContent;
        console.log(title)

        allProduct = allProduct.filter(product => product.title !== title);
        console.log(allProduct);
        showHTML();
        localStorage.setItem('products-in-cart', JSON.stringify(allProduct));
    }
})


  window.addEventListener('beforeunload', () => {
    localStorage.setItem('products-in-cart', JSON.stringify(allProduct));
  });


