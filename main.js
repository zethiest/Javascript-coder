const Product = function (nombre, precio, id, stock,) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.stock = stock;
};
let producto1 = new Product("Lavarropas", 10000, 1, 10);
let producto2 = new Product("Microondas", 5000, 2, 2);
let producto3 = new Product("Aspiradora", 8000, 3, 7);
let producto4 = new Product("Hidrolavadora", 9500, 4, 1);

let productlist = [producto1, producto2, producto3, producto4]

if(localStorage.getItem("products")){
    productlist= JSON.parse(localStorage.getItem("products"))
}else{
    productlist=productlist
}
function filtrarProductos(){
    let palabraClave = prompt("ingresa el producto que buscas").trim().toUpperCase()
    let resultado = productlist.filter( (x)=> x.nombre.toUpperCase().includes(palabraClave)  )

    if(resultado.length >0){
        console.table(resultado)
    }else{
        alert("Ningun producto coincide con los datos ingresados")
    }
}
function venderProducto() {
    let options = productlist.map(p => `<option value="${p.id}">${p.nombre} (Stock: ${p.stock}, $${p.precio})</option>`).join("");

    Swal.fire({
        title: "Vender producto",
        html: `
        <div>
        <ul>
            <li><label>Producto:</label></li>
            <li><select id="producto-select" class="swal2-input">
                ${options}
            </select></li>
            <li><label>Cantidad:</label></li>
           <li> <input id="cantidad-input" class="swal2-input" type="number" min="1" step="1"></li>
            <li><label>Monto pagado:</label></li>
            <li><input id="monto-input" class="swal2-input" type="number" min="0" step="0.01"></li>
           </ul></div>
        `,
        showCancelButton: true,
        confirmButtonText: "Vender",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.isConfirmed) {
            let idSeleccionado = parseInt(document.getElementById("producto-select").value);
            let cantidad = parseInt(document.getElementById("cantidad-input").value);
            let montoPagado = parseFloat(document.getElementById("monto-input").value);

            let producto = productlist.find(p => p.id === idSeleccionado);

            if (isNaN(cantidad) || cantidad <= 0 || isNaN(montoPagado) || montoPagado <= 0) {
                Swal.fire("Error", "Datos inválidos", "error");
                return;
            }

            if (producto.stock < cantidad) {
                Swal.fire("Stock insuficiente", `Solo hay ${producto.stock} unidades disponibles`, "warning");
                return;
            }

            let totalVenta = producto.precio * cantidad;

            if (montoPagado < totalVenta) {
                Swal.fire("Monto insuficiente", `El total es $${totalVenta} y pagaste $${montoPagado}`, "error");
                return;
            }

            producto.stock -= cantidad;
            localStorage.setItem("products", JSON.stringify(productlist));

            Swal.fire({
                icon: "success",
                title: "Venta realizada",
                html: `
                    Vendiste ${cantidad} unidad(es) de <strong>${producto.nombre}</strong><br>
                    Precio unitario: $${producto.precio}<br>
                    Total: $${totalVenta}<br>
                `,
                timer: 3500
            });

            console.table(productlist);
        }
    });
}
let boton = document.getElementById("boton")
boton.addEventListener("click",venderProducto)