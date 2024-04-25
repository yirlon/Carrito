//*Selectores
const carrito = document.querySelector('#carrito')
const listaCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaProductos = document.querySelector('#lista-cursos')

let carritoCompra = []

eventosClick()
function eventosClick(){ 
    listaProductos.addEventListener('click', agregarCarrito)
    carrito.addEventListener('click', eliminarProducto) 
    vaciarCarrito.addEventListener('click', () =>{
        carritoCompra = [] 
        evitarDuplicadosHtml()
    })
}

function agregarCarrito(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const product = e.target.parentElement.parentElement                     
        verProducto(product) 
    }
}

function verProducto(producto){ 
    const objetoPorducto = {
            imagen: producto.querySelector('img').src,
            precio: producto.querySelector('.precio span').textContent,
            titulo: producto.querySelector('h4').textContent,
            cantidad:1,
            id: producto.querySelector('a').getAttribute('data-id')
        }
    comprobarProducto(objetoPorducto)
}

function comprobarProducto(productoss){
    const siExisteNo = carritoCompra.some( (productos) =>{  
        return productos.id === productoss.id;
    })

   if (siExisteNo){ 
    const prod = carritoCompra.map( produc =>{
            if (produc.id === productoss.id){
                produc.cantidad ++; 
                return produc 
            }else{
                return produc 
                         
            }
    })
    carritoCompra = [...prod]  
   }else{  
    carritoCompra = [...carritoCompra, productoss] 
    }
crearHtml(carritoCompra)
}

function crearHtml(prod){
    evitarDuplicadosHtml()

    prod.forEach( producto =>{
    const row = document.createElement('tr')// creacion dinámica
    row.innerHTML =`
    <td><img src='${producto.imagen}' width="100"></td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>${producto.cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${producto.id}">X </a></td>
    `
    listaCarrito.appendChild(row)
    });
}

function evitarDuplicadosHtml(){ 
    while (listaCarrito.firstChild){ 
        listaCarrito.removeChild(listaCarrito.firstChild) 
    }
}

function eliminarProducto(e){
    if (e.target.classList.contains('borrar-curso')){
        const productoId = e.target.getAttribute('data-id')
        carritoCompra = carritoCompra.filter( producto => producto.id !== productoId)
        crearHtml(carritoCompra);
    }
}