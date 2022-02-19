
var indexedDB = window.indexedDB || window.mozIndexedDB;
var db = null;
var palabraAleatoria = ["AHORCADO"];
var palabras = [];
var pantalla;
var pincel;

dibujarCanvas();
dibujaHorca();
iniciarDB();


function iniciarDB() {

    db = indexedDB.open('objeto', 1);

    db.onupgradeneeded = function (e) {
        var activo = db.result;
        var objeto = activo.createObjectStore('hagman', {keyPath: 'id', autoIncrement: true});
        objeto.createIndex('by_palabra', 'palabra', {unique: true});
    };

    db.onsuccess = function (e) {
        console.log('base de datos cargada');
        leer();
    };
    db.onerror = function (e) {
        console.log('error al cargar base de datos');
    }


}


function  leer() {

    var activo = db.result;

    var datos = activo.transaction(['hagman'], 'readwrite');
    var object = datos.objectStore('hagman');

    object.openCursor().onsuccess = function
            (event) {


        var cursor = event.target.result;
        if (cursor) {

            palabras.push(cursor.value.palabra);

            cursor.continue();

        } else {
            console.log("¡No hay más registros disponibles!");
            console.log(palabras)
            palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)]


            let contadorFallos = 0;

            let palabraConGuiones = palabraAleatoria.replace(/./g, "_ ");

            console.log(palabraAleatoria)



            document.querySelector('#salida').innerHTML = palabraConGuiones;


            document.querySelector('#evaluarLetra').addEventListener('click', evaluar);
            


            function evaluar() {


                var letra = document.querySelector('#letra').value;

                let haFallado = true;
                for (var i in palabraAleatoria) {

                    if (letra == palabraAleatoria[i]) {

                        palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
                        haFallado = false;
                    }

                }

                if (haFallado) {
                    contadorFallos++;


                    if (contadorFallos == 1) {
                        dibujarcabesa();

                    }
                    if (contadorFallos == 2) {
                        dibujaCuerpo();

                    }
                    if (contadorFallos == 3) {
                        dibujaBrazoDer();



                    }
                    if (contadorFallos == 4) {
                        dibujaBrazoIzq()


                    }
                    if (contadorFallos == 5) {

                        dibujaPiernaDer();



                    }
                    if (contadorFallos == 6) {

                        dibujaPiernaIzq();

                        document.querySelector('#hasPerdido').innerHTML = "Has fallado";
                        document.querySelector('#salida2').innerHTML = palabraAleatoria;




                    }



                } else {
                    if (palabraConGuiones.indexOf('_') < 0) {
                        document.querySelector('#hasGanado').innerHTML = "Has ganado";
                       
                       


                    }


                }






                document.querySelector('#letra').value = "";
                document.querySelector('#letra').focus();
                document.querySelector('#salida').innerHTML = palabraConGuiones;


            }

            String.prototype.replaceAt = function (index, character) {

                return this.substr(0, index) + character + this.substr(index + character.length)
            }

        }




    };

}








function dibujarCanvas() {
    pantalla = document.querySelector("canvas"); //recibe el canvas
    pincel = pantalla.getContext("2d");     //se disena el dos dimenciones 
    pincel.fillStyle = "transparent";
}





function dibujarcabesa() {


    pincel.beginPath(); //inica el graficoo
    pincel.arc(172, 52, 33, 0, 2 * Math.PI); // crea el circulo
    pincel.fill();

}

function dibujaHorca() {
    pincel.fillStyle = 'white';



    pincel.fillRect(64, 9, 26, 237);
    pincel.fillRect(175, 193, 26, 53);
    pincel.fillRect(64, 193, 136, 15);
    pincel.fillRect(64, 9, 115, 11);
    pincel.beginPath();
    pincel.moveTo(64, 65);
    pincel.lineTo(64, 80);
    pincel.lineTo(133, 11);
    pincel.lineTo(118, 11);
    pincel.fill();
}
function dibujaCuerpo() {
    pincel.beginPath();
    pincel.moveTo(171, 82);
    pincel.lineTo(168, 119);
    pincel.lineTo(162, 147);
    pincel.lineTo(189, 149);
    pincel.lineTo(185, 111);
    pincel.lineTo(183, 83);
    pincel.fill()
}
function dibujaBrazoIzq() {
    pincel.beginPath();
    pincel.moveTo(173, 102);
    pincel.lineTo(140, 128);
    pincel.lineTo(155, 133);
    pincel.lineTo(178, 114);
    pincel.fill()
}
function dibujaBrazoDer() {
    pincel.beginPath();
    pincel.moveTo(180, 99);
    pincel.lineTo(222, 121);
    pincel.lineTo(209, 133);
    pincel.lineTo(183, 110);
    pincel.fill()
}
function dibujaPiernaIzq() {
    pincel.beginPath();
    pincel.moveTo(166, 142);
    pincel.lineTo(139, 175);
    pincel.lineTo(164, 178);
    pincel.lineTo(175, 144);
    pincel.fill()
}
function dibujaPiernaDer() {
    pincel.beginPath();
    pincel.moveTo(178, 145);
    pincel.lineTo(193, 178);
    pincel.lineTo(212, 170);
    pincel.lineTo(188, 142);
    pincel.fill()
}