const url = "http://localhost/RestServer/index.php";
const tbody = document.querySelector(".cabeza");
const formulario = document.getElementById("EditarCliente");

const eliminarCliente = async (cedula) => {
  const response = await fetch(`${url}/?cedula=${cedula}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    /*Swal.fire({
      icon: "success",
      title: "Oops...",
      text: "Something went wrong!",
    });*/
  } else {
    /*Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });*/
    console.log("Error");
  }
};

const validarCliente = (e) => {
  e.preventDefault();
  let cedula = document.getElementById("Cedula").value;
  let banderaCedula = true;

  let nombre = document.getElementById("Nombre").value;
  let banderaNombre = true;

  let apellido = document.getElementById("Apellido").value;
  let banderaApellido = true;

  let ciudad = document.getElementById("Ciudad").value;
  let banderaCiudad = true;

  let telefono = document.getElementById("Telefono").value;
  let banderaTelefono = true;

  let correo = document.getElementById("Correo").value;
  let banderaCorreo = true;

  //Validación cedula
  if (cedula == "") {
    banderaCedula = false;
  } else {
    if (isNaN(cedula)) {
    } else {
      banderaCedula = true;
    }
  }

  //Validación Nombre
  if (nombre !== "") {
    banderaNombre = true;
  } else {
    banderaNombre = false;
  }

  //Validación apellido
  if (apellido !== "") {
    banderaApellido = true;
  } else {
    banderaApellido = false;
  }

  //Validación ciudad
  if (ciudad !== "") {
    banderaCiudad = true;
  } else {
    banderaCiudad = false;
  }

  //Validación correo
  if (correo !== "") {
    banderaCorreo = true;
  } else {
    banderaCorreo = false;
  }

  //Validación telefono
  if (telefono == "") {
    banderaTelefono = false;
  } else {
    if (isNaN(telefono)) {
    } else {
      banderaTelefono = true;
    }
  }

  if (
    banderaCedula == true &&
    banderaNombre == true &&
    banderaApellido == true &&
    banderaCiudad == true &&
    banderaCorreo == true &&
    banderaTelefono == true
  ) {
    actualizarCliente(cedula, nombre, apellido, ciudad, correo, telefono);
  } else {
    console.log("Error");
  }
};

const actualizarCliente = async (cedula, nombre, apellido, ciudad, correo, telefono) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ciudad: ciudad,
      telefono: telefono,
      correo: correo,
    }),
  });

  const data = await response.json();

  Swal.fire({
    icon: "success",
    title: "¡Cliente Actualizado!",
    text: "Se actualizó el cliente correctamente",
  });

  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const buscarCliente = async (cedula) => {
  const response = await fetch(`${url}/?cedula=${cedula}`);
  const data = await response.json();

  const cliente = Object.values(data);
  console.log(cliente[0].Nombre);

  let inputCedula = document.getElementById("Cedula");
  let nombre = document.getElementById("Nombre");
  let apellido = document.getElementById("Apellido");
  let ciudad = document.getElementById("Ciudad");
  let telefono = document.getElementById("Telefono");
  let correo = document.getElementById("Correo");

  inputCedula.value = cliente[0].Cedula;
  nombre.value = cliente[0].Nombre;
  apellido.value = cliente[0].Apellido;
  ciudad.value = cliente[0].Ciudad;
  telefono.value = cliente[0].Telefono;
  correo.value = cliente[0].Correo;
};

//Función para obtener los datos de la API
const obtenerClientes = async () => {
  const response = await fetch(url);
  const data = await response.json();
  let content = "";

  let clientes = Object.values(data);
  //console.log(clientes);

  if (clientes[1] === "Error") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: clientes[0],
    });
  } else {
    clientes.map((cliente) => {
      content += `<tr>
                    <th scope="row">${cliente.Cedula}</th>
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Apellido}</td>
                    <td>${cliente.Ciudad}</td>
                    <td>${cliente.Telefono}</td>
                    <td>${cliente.Correo}</td>
                    <td>
                        <a href="" onclick="buscarCliente(${cliente.Cedula})" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#EditarCliente">Editar</a>
                        <a href="" onclick="eliminarCliente(${cliente.Cedula})" class="btn btn-danger">Eliminar</a>
                    </td>
                </tr>`;
    });

    tbody.innerHTML = content;
  }
};

obtenerClientes();
formulario.addEventListener("submit", validarCliente);
