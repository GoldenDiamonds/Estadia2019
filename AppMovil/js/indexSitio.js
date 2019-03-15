//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("dctipn", "1.0", "Base de datos de DCTIPN", 3*1024*1024);
} else {
    alert("¡Tu navegador web/browser no soporta WebSQL!");
}
//function to output the list of sitios in the database
function actualizarSitio(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the sitios list holder ul
    var listholder = document.getElementById("listaSitios");
    //clear sitios list ul
    listholder.innerHTML = "";
    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);
        listholder.innerHTML += "<li>" + row.Ciudad + "</li>";
        //+ " (<a href='javascript:void(0);' onclick='eliminarPersonal(" + row.id + ");'>Eliminar</a>)</li>";
    }
}

//function to get the list of sitios from the database
function salidaSitio() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the sitios from the database with a select statement, set outputSitiosList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM sitios", [], actualizarSitio);
        });
    } else {
       // alert("¡Tú navegador web/browser no soporta WebSQL!");
    }
}
salidaSitio();
