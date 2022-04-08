const url = "http://localhost/RestServer/index.php";
const tbody = document.querySelector(".cabeza");

//Función para obtener los datos de la API
const obtenerClientes = async () => {
  const response = await fetch(url);
  const data = await response.json();
  let content = "";

  let clientes = Object.values(data);
  //console.log(clientes);

  clientes.map((cliente) => {
    content += `<tr>
                    <th scope="row">${cliente.Cedula}</th>
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Apellido}</td>
                    <td>${cliente.Ciudad}</td>
                    <td>${cliente.Telefono}</td>
                    <td>${cliente.Correo}</td>
                    <td>
                        <a href="" class="btn btn-primary">Editar</a>
                        <a href="" class="btn btn-danger">Eliminar</a>
                    </td>
                </tr>`;
  });

  tbody.innerHTML = content;
};

obtenerClientes();
