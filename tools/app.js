$(function(){
    
    $("#respaldo").click(function(){
        setTimeout(function(){
            alert("El respaldo ha sido realizado de manera exitosa.");
        }, 1500);
    });

});


function leerRespaldo() {
    console.log("Enviar Respaldo");
    var archivo = document.getElementById("restaurar").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {

        enviarRespaldo(e.target.result);
        //console.log(textosql);
    };
  

    reader.readAsText(archivo);


}

function enviarRespaldo(textosql) {
    $.ajax({
        url: "restaurar.php",
        type: "POST",
        data: { textosql: textosql },
        success: function (response) {
            console.log(response);
        },
        async: false
    });

}





