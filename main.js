function Login() {
    Swal.fire({
        title: "Iniciar sesión",
        html: `
            <input id="swal-user" class="swal2-input" placeholder="Usuario">
            <input id="swal-pass" type="password" class="swal2-input" placeholder="Contraseña">
            <input id="swal-email" class="swal2-input" placeholder="Email">
          `,
        showCancelButton: false,
        confirmButtonText: "Ingresar",
        preConfirm: () => {
            const user = document.getElementById("swal-user").value.trim();
            const pass = document.getElementById("swal-pass").value.trim();
            const email = document.getElementById("swal-email").value.trim();

            if (!user || !email || !pass) {
                Swal.showValidationMessage("Todos los campos son obligatorios");
                return false;
            }
            if (isNaN(pass) || pass === "") {
                Swal.showValidationMessage("La contraseña tiene que ser un numero");
                return false;
            }
            if (user === "") {
                Swal.showValidationMessage("El usuario no puede estar vacio");
                return false;
            }

            if (email.includes("@") && email.endsWith(".com")) {
                return { user, email };
            } else {
                Swal.showValidationMessage("El email ingresado no es valido");
                return false;
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Has iniciado sesión exitosamente",
                `Hola ${result.value.user}!`,
                "success"
            ).then(() => {
                sellProduct();
            });
        }
    });
}
Login();

let productlist = [];
if (localStorage.getItem("products")) {
    productlist = JSON.parse(localStorage.getItem("products"));
} else {
    fetch("productos.json")
        .then((response) => response.json())
        .then((data) => {
            productlist = data;
            localStorage.setItem("products", JSON.stringify(productlist));
        })
        .catch((error) => {
            console.error("Hubo un error al cargar los productos:", error);
            Swal.fire("Error", "No fue posible cargar los productos", "error");
        });
}

function sellProduct() {
    let options = productlist
        .map(
            (p) =>
                `<option value="${p.id}">${p.nombre}, Marca (${p.marca}) (Stock: ${p.stock}, $${p.precio})</option>`
        )
        .join("");

    Swal.fire({
        title: "Selecciona el producto deseado",
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
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let idSeleccionado = parseInt(
                document.getElementById("producto-select").value
            );
            let cantidad = parseInt(document.getElementById("cantidad-input").value);
            let montoPagado = parseFloat(
                document.getElementById("monto-input").value
            );

            let producto = productlist.find((p) => p.id === idSeleccionado);

            if (
                isNaN(cantidad) ||
                cantidad <= 0 ||
                isNaN(montoPagado) ||
                montoPagado <= 0
            ) {
                Swal.fire("Error", "Los datos ingresados son invalidos", "error");
                return;
            }

            if (producto.stock < cantidad) {
                Swal.fire(
                    "Stock insuficiente",
                    `Solo hay ${producto.stock} unidades disponibles`,
                    "warning"
                );
                return;
            }

            let totalVenta = producto.precio * cantidad;

            if (montoPagado < totalVenta) {
                Swal.fire(
                    "El monto ingresado no es suficiente",
                    `El total es $${totalVenta} y pagaste $${montoPagado}`,
                    "error"
                );
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
                timer: 3500,
            });

            console.table(productlist);
        }
    });
}
