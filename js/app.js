const url = "http://localhost/RestServer/index.php";
const formulario = document.getElementById("formularioRegistro");

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
    crearCliente(cedula, nombre, apellido, ciudad, correo, telefono);
  } else {
    console.log("Error");
  }
};

const crearCliente = async (cedula, nombre, apellido, ciudad, correo, telefono) => {
  const response = await fetch(url, {
    method: "POST",
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
    title: "¡Cliente registrado!",
    text: "Se registro el cliente correctamente",
  });

  setTimeout(() => {
    window.location.replace("http://127.0.0.1:5500/clientes.html");
  }, 2000);
};

formulario.addEventListener("submit", validarCliente);
