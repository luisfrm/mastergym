$(function() {

    $("#txt").html(getParameterByName("user"));

    $("#form-expired").submit(function(e) {

        

        if ($("#newuser1").val()!=$("#newuser2").val()) {
            alert("Los usuarios ingresados no son iguales.");
        } else if ($("#newpass1").val()!=$("#newpass2").val()) {
            alert("Las contraseñas ingresadas no son iguales.");
        }else{
            let data={
                user:$("#newuser1").val(),
                pass:$("#newpass1").val(),
                old:getParameterByName("user")
            };
            
            $.post("update.php", data, function(response){
                console.log(response);
                if (response=="#400"){
                    alert("La actualización ha sido exitosa.");
                    location.href="../";
                } else if(response=="#401"){
                    alert("Usuario ingresado ha sido registrado en los ultimos 45 dias, ingrese uno nuevo.");
                }else if(response=="#402"){
                    alert("Contraseña ingresada ha sido registrada en los ultimos 45 dias, ingrese una nueva.");
                }
            });    
        }
        e.preventDefault();
    });

    $('#checkbox').change(function(){
        if(document.getElementById("checkbox").checked){
            document.getElementById("newpass1").type="text";
            document.getElementById("newpass2").type="text";
        }else{
            document.getElementById("newpass1").type="password";
            document.getElementById("newpass2").type="password";
        }
    })

    $("#btn").click(function(){
        console.log();
    })

    function getParameterByName(name){
        name=name.replace(/[\[]/, "\\]").replace(/[\]]/, "\\]");
        let regex= new RegExp("[\\?&]" + name + "=([^&#]*)");
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});





















