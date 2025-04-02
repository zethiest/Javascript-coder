 // Palabra reservada + nombre = dato 

 document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        Swal.fire({
            title: `Bienvenido de nuevo, ${usuario.nombre}`,
            text: "Ya has iniciado sesión anteriormente.",
            icon: "success",
            confirmButtonText: "Continuar",
        }).then(() => {
            subasta();
        });
    } else {
        login();
    }
});

function login() {
    Swal.fire({
        title: "Estas por ingresar a una subasta de productos, para identificarte necesitamos que ingreses los siguientes datos",
        html: `
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
          <input type="text" id="apellido" class="swal2-input" placeholder="Apellido">
          <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">`,
        showCancelButton: true,
        confirmButtonText: "Ingresar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const apellido = document.getElementById("apellido").value.trim();

            if (!nombre || !email || !apellido) {
                Swal.showValidationMessage("Por favor, completa todos los campos.");
                return false;
            }
            const usuario = { nombre, email, apellido };
            localStorage.setItem("usuario", JSON.stringify(usuario));

            return usuario;
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `¡Bienvenido, ${result.value.nombre}!`,
                text: "Tu sesión ha sido guardada.",
                icon: "success",
                confirmButtonText: "Continuar",
            }).then(() => {
                subasta();
            });
        }
    });
}

const Product = function (nombre, precio, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
};
let producto1 = new Product("Lavarropas", 10000, 1);
let producto2 = new Product("Microondas", 5000, 2);
let producto3 = new Product("Aspiradora", 8000, 3);
let producto4 = new Product("Hidrolavadora", 9500, 4);

const productlist = [producto1, producto2, producto3, producto4];

function subasta() {
    Swal.fire({
        title: "Selecciona un producto",
        input: "select",
        inputOptions: productlist.reduce((options, product) => {
            options[product.id] = `${product.nombre} - $${product.precio}`;
            return options;
        }, {}),
        inputPlaceholder: "Elige un producto",
        showCancelButton: true,
        confirmButtonText: "Seleccionar",
        preConfirm: (idInput) => {
            const product = productlist.find((p) => p.id == idInput);
            if (!product) {
                Swal.showValidationMessage("El ID no es válido");
                return false;
            }
            return product;
        },
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const selectedProduct = result.value;

            Swal.fire({
                title: `Ingresa tu oferta para el ${selectedProduct.nombre}`,
                input: "number",
                inputPlaceholder: "Ingresa tu oferta en $",
                showCancelButton: true,
                confirmButtonText: "Ofertar",
                preConfirm: (ofertaUsuario) => {
                    ofertaUsuario = parseFloat(ofertaUsuario);
                    if (isNaN(ofertaUsuario) || ofertaUsuario <= 0) {
                        Swal.showValidationMessage("Por favor ingresa un monto válido.");
                        return false;
                    }
                    return ofertaUsuario;
                },
            }).then((ofertaResult) => {
                if (ofertaResult.isConfirmed) {
                    const ofertaUsuario = ofertaResult.value;

                    if (ofertaUsuario < selectedProduct.precio) {
                        Swal.fire(
                            "Oferta rechazada",
                            "La oferta ingresada es menor al precio requerido.",
                            "error"
                        ).then(() => {
                            subasta();
                        });
                    } else {
                        Swal.fire(
                            "Oferta aceptada",
                            "Tu oferta es correcta y aceptada. Por favor, omunicate con nosotros para organizar el envio.",
                            "success"
                        );
                    }
                }
            });
        }
    });
}
