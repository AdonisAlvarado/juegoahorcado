
var indexedDB = window.indexedDB || window.mozIndexedDB;
var db = null;

iniciarDB();


document.querySelector('#boton').addEventListener('click', agregar);



function PulsarTecla(event)
{
    tecla = event.keyCode;
 
    if(tecla==13) //numero es el keycode 
    {
       
       agregar();
    }
    
}
 
window.onkeydown=PulsarTecla;

function iniciarDB() {

    db = indexedDB.open('objeto', 1);

    db.onupgradeneeded = function (e) {
        var activo = db.result;
        var objeto = activo.createObjectStore('hagman', {keyPath: 'id', autoIncrement: true});
        objeto.createIndex('by_palabra', 'palabra', {unique : true});
    };

    db.onsuccess = function (e) {
        console.log('base de datos cargada');
        leer();
    };
    db.onerror = function (e) {
        console.log('error al cargar base de datos');
    }


}


function  leer(){
var activo = db.result;

    var datos = activo.transaction(['hagman'],'readwrite');
    var object = datos.objectStore('hagman');

object.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
        //console.log(cursor.key);
        console.log(cursor.value.palabra);
        //console.log(cursor.value.eMail);
        cursor.continue();
    } else {
        console.log("¡No hay más registros disponibles!");
    }
};

}



function agregar() {
    var activo = db.result;

    var datos = activo.transaction(['hagman'],'readwrite');
    var object = datos.objectStore('hagman');

  
    var recuest = object.put({
        palabra: document.querySelector('#palabra').value
    });




    recuest.onerror = function(e){
        console.log(recuest.error.name+"n\n" + recuest.error.message);

    }

    datos.oncomplete =function(e){
        document.querySelector('#palabra').value = '';
        console.log('se agrego correctamente');
        document.querySelector('#palabra').focus();

        leer();
    }







}