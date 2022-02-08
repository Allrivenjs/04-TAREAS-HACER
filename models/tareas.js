
const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {

    //bug encontrado que no ha sido arreglado ya que no tiene arreglo
        _listado = {};
    


    cargarTareas(tareas = []) {

        tareas.map(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    get ListadoArr() {
        const listado  = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];    
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.ListadoArr.map( (e,i) => {
            console.log( `${colors.green(i)}. ${e.desc} :: ${e.completadoEn === null ? 'Pendiente'.red: 'Completado'.green }  `);
        });
    
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        this.ListadoArr.map( (e,i) => {
            completadas ?
                (e.completadoEn !== null ? console.log( `${colors.green(i)}. ${e.desc} :: ${ 'Completado'.green } el ${e.completadoEn}`) : null)
            :
                (e.completadoEn === null ? console.log( `${colors.green(i)}. ${e.desc} :: ${ 'Pendiente'.red }  `)  : null)
            ;
        });
    
    }

    borrarTarrea(id = ''){
            if (this._listado[id]){
                delete this._listado[id];
                console.log('\nTarrea borrada con exito :D'.green);
            }

    }
}

module.exports = Tareas;