const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList

     } = require('./helpers/inquirer');

const Tareas = require('./models/tareas')
require('colors');


const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareas(tareasDB);
    }

    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break
            case '3':
                tareas.listarPendientesCompletadas();
                break
            case '4':
                tareas.listarPendientesCompletadas(false);
                break
            case '5':
                const ids = await mostrarListadoCheckList( tareas.ListadoArr );
                console.log({ids})
                break
            case '6':
                const id = await listadoTareasBorrar(tareas.ListadoArr);
                if(id !==0){
                    const ok = await confirmar('Estas seguro?'.red);                
                    if(ok) tareas.borrarTarrea(id);    
                }
                break
        }
        
        guardarDB(tareas.ListadoArr);
        
        if (opt !== '0') await pausa(); console.clear();

    }while(opt !== '0');
    
}

main();