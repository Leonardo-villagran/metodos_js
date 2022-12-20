//Definir variables globales.

const total = document.querySelector("#total")
const tbody = document.querySelector("tbody")
const agregar = document.querySelector("#agregar")
const boton = document.querySelector("#boton")
const completados = document.querySelector("#completados")

//3 tareas iniciales en el arreglo.

let nuevos = [
  { id: 1, nombre: "Generar idea de nueva web.", completado:false },
  { id: 2, nombre: "Crear esquema inicial.", completado:false},
  { id: 3, nombre: "Programar html base.", completado:false  }
  ];

//Imprimir en pantalla tareas iniciales del arreglo.  
realizar_seleccion();

//Función que recibe los datos del input para su proceso.
boton.addEventListener("click", () => {

  let espacios=agregar.value;
  //Quitar espacios en blanco en el input.
  espacios=espacios.trim();

  //Ingresar un nuevo objeto si el contenido no es vacío.

  if (espacios === "") {
    agregar.value = "";
    alert("No dejar espacios vacíos");
  }
  else {

    //Agregar un objeto al arreglo con un nuevo id que sea mayor en uno, que el último objeto.
    const nuevo = agregar.value;
    const contar= obtener_ultimo_id(nuevos)+1;
    nuevos.push({ id: contar, nombre: nuevo, completado:false})
    agregar.value = "";
    realizar_seleccion();
  }
}
)

//Función para generar cada objeto dependiendo del estado en completado.
function realizar_seleccion()
{
    //Variable que se utiliza para almacenar el html de las filas que serán impresas. 
    let html = "";
    //Recorrer arreglo para determinar si cada objeto tiene estado verdadero o falso.
    for (let invitado of nuevos) {

      if (invitado.completado==true){
        html += `<tr class="bg-success"><td>${invitado.id}</td><td>${invitado.nombre}</td>
        <td><button class="bg-secondary text-light rounded" onclick="check(${invitado.id})">Completado</button></td>
        <td><button class="bg-danger text-light rounded"
        onclick="borrar(${invitado.id})"> x </button></td>
        </tr>`;
      }
      else{
        html += `<tr><td>${invitado.id}</td><td>${invitado.nombre}</td>
        <td><button  class="bg-secondary text-light rounded" onclick="check(${invitado.id})">Cambiar</button></td>
        <td><button class="bg-danger text-light rounded"
        onclick="borrar(${invitado.id})"> x </button></td>
        </tr>`;
      }
      
    }
    
    //Filtrar los objetos que tengan estado verdadero.
    const comple= nuevos.filter(nuevo => nuevo.completado ==true);
    
    //Contar la cantidad de objetos con estado verdadero.
    const contador_completados=comple.length;

    //Imprimir las filas en el html.
    tbody.innerHTML = html;

    //Imprimir el total de objetos.
    total.innerHTML = nuevos.length;

    //Imprimir la cantidad de objetos con estado completado verdadero.
    completados.innerHTML = contador_completados;
    
}

//Borrar el objeto que tenga el id del objeto seleccionado.
function borrar(id){
  const index = nuevos.findIndex((x) => x.id == id) /* 2.1 */
  nuevos.splice(index, 1) /* 2.2 */
  realizar_seleccion(); //

}

// Función que cambia el estado del objeto de verdadero a falso y viceversa. La búsqueda se realiza a través del id del objeto.
function check(id){
  let nombrex="";
  let completadox="";
    //Buscar el objeto con el id entregado al presionar el botón de cambiar.
    for (let buscar of nuevos) {
      if (buscar.id ==id){
        nombrex=buscar.nombre;
        //Cambio de estado. Se cambia al estado contrario con el comando de negación. 
        completadox=!(buscar.completado);
      }
    }
    //Elimina el objeto con el estado antiguo.
    const index = nuevos.findIndex((x) => x.id == id) 
    nuevos.splice(index, 1) 
    const idx= id;
    
    //Se agrega el nuevo objeto con el mismo id y nombre, pero con el nuevo estado
    nuevos.push({ id: idx, nombre:nombrex , completado:completadox});
    agregar.value = "";
    
    //Se ordenan los resultados por id, para dar orden. 
    nuevos = nuevos.sort((x,y) => x.id - y.id)
    //Se imprime el arreglo de objetos. 
    realizar_seleccion();

}

//Función para obtener el el último id del arreglo de datos.
function obtener_ultimo_id(objeto){
  let mayor=0;
  for (let buscar of objeto) {
    if (buscar.id > mayor) {
      mayor=buscar.id;
    }
  }
  return mayor;
}