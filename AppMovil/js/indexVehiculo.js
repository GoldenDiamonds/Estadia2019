//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("dctipn", "1.0", "Base de datos de DCTIPN", 3*1024*1024);
    //create the vehiculo table using SQL for the database using a transaction
    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS vehiculo (id INTEGER PRIMARY KEY ASC,numEco INTEGER, Placas TINYTEXT, Marca TINYTEXT, Modelo INTEGER, numSerie TINYTEXT)");
    });
} else {
    alert("¡Tu navegador web/browser no soporta WebSQL!");
}
//function to output the list of vehiculo in the database
function actualizarVehiculo(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("listaVehiculo");
    //clear vehiculo list ul
    listholder.innerHTML = "";
    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.numEco + " - " + row.Placas + " - " + row.Marca + " - " + row.Modelo + " - " + row.numSerie
        + "</li>";
        //+ " (<a href='javascript:void(0);' onclick='eliminarPersonal(" + row.id + ");'>Eliminar</a>)</li>";
    }
}
//function to get the list of vehiculo from the database
function salidaVehiculo() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the vehiculo from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM vehiculo", [], actualizarVehiculo);
        });
    } else {
       // alert("¡Tú navegador web/browser no soporta WebSQL!");
    }
}
salidaVehiculo();