 // Palabra reservada + nombre = dato 



const Product = function (nombre, precio,id){
this.nombre = nombre
this.precio = precio
this.id = id
}
let producto1 = new Product ("Lavarropas", 10000, 1)
let producto2 = new Product ("Microondas", 5000, 2)
let producto3 = new Product ("Aspiradora", 8000, 3)
let producto4 = new Product ("Hidrolavadora", 9500, 4)

const productlist = [producto1,producto2,producto3,producto4]

function subasta (){
productlist.map(product => {
    alert(`Producto: ${product.nombre}\nPrecio: $${product.precio}\nID: ${product.id}`);
});
let Identificacion = (prompt("Para comprar, es necesario que sepamos tu nombre")).toUpperCase();
let idSelection = parseInt(prompt("Ingrese el ID del producto que desea comprar:"));
if (Identificacion === null || Identificacion.trim() === "" || idSelection === productlist.find(p => p)) {
    alert ("Que haces?")
    return;
}
let productoElegido = productlist.find(p => p.id === idSelection);
if (!productoElegido) {
    alert ("Ese producto no existe flaco");
    return;
}
let ofertaUsuario = parseFloat(prompt(`Ingresa su oferta para el ${productoElegido.nombre}`))
if (isNaN(ofertaUsuario) || ofertaUsuario <= 0) {
alert ("Flaco, esa oferta no es valida")
return;
}
if (ofertaUsuario < productoElegido.precio){
alert ("Todo bien loco, pero con eso no llegas, fijate bien")
}
else if (ofertaUsuario >= productoElegido.precio)

alert ("Joya maestro, hablame y coordinamos el envio")

}
subasta()
