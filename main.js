 // Palabra reservada + nombre = dato 

function subasta (){
alert ("Subasto este producto, el precio base es 5000")
let PrecioBase = 5000
do {
let Identificacion = (prompt("Para ofertar, es necesario que sepamos tu nombre")).toUpperCase();
let ofertadelUsuario = parseFloat(prompt("Ingrese su oferta: "))
if (Identificacion === null || Identificacion.trim() === "" || ofertadelUsuario === null || isNaN (ofertadelUsuario)) {
    alert ("Que haces?")
    break;
}
if (ofertadelUsuario < 4000) {
alert ("Te pensas que estamos boludeando flaco?")}
else if (ofertadelUsuario < PrecioBase){
alert ("Pone unos pesos mas y hablamos cabezon")}
else if (ofertadelUsuario > PrecioBase){
alert ("Por fin alguien que pone la tarasca, felicidades maestro, te lo llevaste")
break}
else if (ofertadelUsuario === PrecioBase){ 
alert ("Loco, esta bien que sea el precio de arranque pero poneme unos pesos de mas al menos")
}
}
while (true)
}
subasta()