//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("dctipn", "1.0", "Base de datos de DCTIPN", 3*1024*1024);

} else {
    alert("¡Tu navegador web/browser no soporta WebSQL!");
}

//function to output the list of personal in the database
function actualizarPersonal(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("lista_Personal");

    //clear personal list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);


        listholder.innerHTML += "<li>" + row.ficha + " - " + row.Nombre + " - " + row.Categoria + " - " + row.Nivel 
        + "</li>";
//        + " (<a href='javascript:void(0);' onclick='eliminarPersonal(" + row.id + ");'>Eliminar</a>)</li>";
    }

}

//function to get the list of personal from the database
function salidaPersonal() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputPerosnalList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM personal", [], actualizarPersonal);
        });
    } else {
       // alert("¡Tú navegador web/browser no soporta WebSQL!");
    }
}

salidaPersonal();