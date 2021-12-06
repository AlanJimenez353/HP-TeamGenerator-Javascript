class  Personaje{

    constructor(obj){
        this.nombre=obj.nombre.toUpperCase();
        this.casa=obj.casa.toUpperCase(); //puede fallar      
        this.id=parseFloat(obj.id);
    }
}
const listaPersonajes = [];

let personajes=[{
    nombre: "Harry Potter",
    casa:"Grifindor",
    id: 1    
},
    {
        nombre: "Dumbledore",
        casa:"Grifindor",
        id: 2
    },
    {
        nombre: "Severus Snape ",
        casa:"Slifering ",
        id: 3
    },
];


/** Metodos JSON */

//Almacenar Personajes
function almacenarEventos(personajes){

    const guardarLocal= (clave,valor) => {localStorage.setItem(clave,valor)};
    for (const Personaje of personajes ){
        guardarLocal("listPersonajes", JSON.stringify(personajes));
    }
}
 
    
//Json to Object
function crearListaEventosLocal(listaPersonajes){
    const personajesJson = JSON.parse(localStorage.getItem("listPersonajes"));
    for(const objeto of personajesJson){
        listaPersonajes.push(new Personaje(objeto));
    }    
}



function agregarPersonaje(){
    let nombre=prompt("ingrese nombre Personaje");
    let casa=prompt("ingrese casa del personaje");
    let id=prompt("ingrese id del personaje");
    let maxim=0;
    let added=new Personaje({nombre:""+nombre,casa:""+casa,id:""+id});
    
    personajes.push(added);
    localStorage.clear();    
    almacenarEventos(personajes);
}

function eliminarEvento2(){
    let ref=prompt("ingrese id del Personaje a eliminar");
    
    personajes=personajes.filter(personajes =>personajes.id!=ref);

    alert("Se elimino el personje")
    alert("Refresque la tabla")
    localStorage.clear();    
    almacenarEventos(this.personajes);
}

function refreshTable(){
    const $elemento = document.querySelector("#myDynamicTable");
    $elemento.innerHTML = "";
    $("#myDynamicTable").load( "index.html #myDynamicTable" );
    crearTabla(listaPersonajes);
}
//--BOTONES
let botonEliminar=document.getElementById("btnElim");
let botonAgregar=document.getElementById("btnAdd");

/**METODOS HTML */
  

function crearTabla(listaPersonajes){
    let myTableDiv = document.getElementById("myDynamicTable");
  
    let table = document.createElement('TABLE');
    table.className="table table-dark";
    
    let tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    
    for (const Personaje of personajes) {
      let tr = document.createElement('TR');
      tableBody.appendChild(tr);
  
        let td = document.createElement('TD');
        td.width = '600 ';
        td.appendChild(document.createTextNode("Personaje: " + Personaje.nombre+ " ----- "));
        tr.appendChild(td);

        td.appendChild(document.createTextNode("      Casa: " + Personaje.casa +"  ----- "));
        tr.appendChild(td);

        td.appendChild(document.createTextNode("      ID: " + Personaje.id));
        tr.appendChild(td);
      
    }

    let h=document.createElement('h3')
    h.appendChild(document.createTextNode("Este es tu equipo !"))
    myTableDiv.appendChild(h)

    myTableDiv.appendChild(table);
  }

  ///JQuery

$(document).ready(function(){
    $('#btnMostrar').on('click' ,() =>{
      $('#app').slideToggle();
    });
  });

  $(document).ready(() =>{ 
      $('#formulario').submit(function(){
          let idPersonaje= $('#id').val();
          let casaPersonaje= $('#casa').val();
          let nombrePersonaje=$('#nombre').val();
          let added=new Personaje({nombre:""+nombrePersonaje,casa:""+casaPersonaje,id:""+idPersonaje});
          personajes.push(added);
          localStorage.clear();    
          almacenarEventos(personajes);
          alert("Se añadio un nuevo Personaje");
          alert("REFRESQUE LA TABLA");

      });
  });

  //AYAX

  $(document).ready(function(){
    const URLGET="http://hp-api.herokuapp.com/api/characters/students"
    //$("btn").prepend('<button id ="btn2">GET</button>');
    $("#btnAPI").click(()=>{ 

        $.get(URLGET,function (respuesta, estado){
            if(estado == "success"){
                let misDatos=respuesta;
                let id=prompt("ingrese un id y se agregara un estudiante de hogwarts traido desde la API a la lista")
                let personaje=misDatos[id]
                alert("El nombre del nuevo personaje es: "+personaje.name)
                
                let added=new Personaje({nombre:""+personaje.name,casa:""+personaje.house,id:""+id});
                personajes.push(added);
                localStorage.clear();    
                almacenarEventos(personajes);
                alert("Se añadio un Personaje, REFRESQUE LA TABLA");
             
            }
        });


    });


  });


  almacenarEventos(personajes);
  crearListaEventosLocal(listaPersonajes);  
  crearTabla(listaPersonajes);




