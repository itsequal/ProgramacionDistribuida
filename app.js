var ciclos = 0;
var procesos = [];
let probabilidad = () => Math.floor(Math.random() * (4) + 1);
var descuento = 1;
var llenado = 0;
var totalProcesos = 0;
var primerCiclo = 0;
var completados = 0;

function llenarProceso() {
    return procesos[procesos.lenght] = Math.floor(Math.random() * (9 - 4 + 1) + 4);
}

function descontarProceso(x) {
    return procesos[x - 1] -= 1;
}

for (ciclos = 0; ciclos <= 300; ciclos++) {
    longitud = procesos.length;

    //Llenado de procesos y registro del primer proceso generado y el total
    if (probabilidad() == 1) {
        procesos[longitud] = Math.floor(Math.random() * (9 - 4 + 1) + 4);
        longitud++;
        totalProcesos++;
        if (totalProcesos == 1) {
            primerCiclo = ciclos + 1;
        }
    }

    //Reinicio de posición en el vector para la resta
    if (descuento > longitud) {
        descuento = 1;
    }

    longitud = procesos.length;

    //Eliminacion de procesos al llegar a 0
    if (procesos[descuento - 1] == 0) {
        procesos.splice((descuento - 1), 1);
        completados++;
    }

   // Mostrar procesos
   // console.log(procesos);

    //Descuento de unidad de tiempo al proceso
    if (procesos[longitud - 1] !== undefined) {
        descontarProceso(descuento);
        descuento++;
    }
}

console.log("Primer procesos en el ciclo", primerCiclo);
console.log("Total de procesos", totalProcesos);
console.log("Procesos completados", completados);