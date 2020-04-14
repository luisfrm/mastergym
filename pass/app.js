$(function(){
    $("#change").hide();
    $("#form-login").submit(function(e){
        let user=$("#user").val();
        let data={
            user:user,
            tipo:1
        }
        $.get('checkUser.php', data, function(response){
            //<option value="1">¿Nombre de mi canción favorita?</option>
            //<option value="2">¿Segundo nombre de mi mamá?</option>
            //<option value="3">¿Mejor amigo de la infancia?</option>
            //<option value="4">¿Nombre del primer colegio de primaria?</option>
            //<option value="5">¿Profesor favorito?</option>
            //<option value="6">¿Carrera siempre deseada de ejercer?</option>
            //<option value="7">¿Nombre de la primera pareja?</option>
            //<option value="8">¿Película favorita?</option>
            let user = JSON.parse(response);
            console.log(user);
            let id1=user[0].pregunta1;
            let id2=user[0].pregunta2;
            let pregunta1=""   ;
            let pregunta2="";
            if (id1==1) {
                pregunta1="¿Nombre de mi canción favorita?";
            }else if (id1==2) {
                pregunta1="¿Segundo nombre de mi mamá?";
            }else if (id1==3) {
                pregunta1="¿Mejor amigo de la infancia?";
            }else if (id1==4) {
                pregunta1="¿Nombre del primer colegio de primaria?";
            }else if (id1==5) {
                pregunta1="¿Profesor favorito?";
            }else if (id1==6) {
                pregunta1="¿Carrera siempre deseada de ejercer?";
            }else if (id1==7) {
                pregunta1="¿Nombre de la primera pareja?";
            }else if (id1==8) {
                pregunta1="¿Película favorita?";
            }

            if (id2==1) {
                pregunta2="¿Nombre de mi canción favorita?";
            }else if (id2==2) {
                pregunta2="¿Segundo nombre de mi mamá?";
            }else if (id2==3) {
                pregunta2="¿Mejor amigo de la infancia?";
            }else if (id2==4) {
                pregunta2="¿Nombre del primer colegio de primaria?";
            }else if (id2==5) {
                pregunta2="¿Profesor favorito?";
            }else if (id2==6) {
                pregunta2="¿Carrera siempre deseada de ejercer?";
            }else if (id2==7) {
                pregunta2="¿Nombre de la primera pareja?";
            }else if (id2==8) {
                pregunta2="¿Película favorita?";
            }



            $("#name").val($("#user").val());
            $("#user").val("");
            $("#checkUser").hide();
            $("#q1").html(pregunta1);
            $("#q2").html(pregunta2);
            $("#questions").show();
        })
        e.preventDefault();
    });

    $("#comprobar").submit(function(e){
        let data={
            tipo:2,
            user:$("#name").val()
        }
        $.get('checkUser.php', data, function(response){
            let dts = JSON.parse(response);

            if ($("#a1").val()==dts[0].respuesta1 && $("#a2").val()==dts[0].respuesta2) {
                $("#form1").hide();
                $("#change").show();
            }
        })
        e.preventDefault();
    })

    $("#change").submit(function(e){
        if ($("#pass1").val()==$("#pass2").val()) {
            let data={
                password:$("#pass1").val(),
                tipo:3,
                user:$("#name").val()
            }
            $.post("changePass.php", data, function(response){
                console.log(response);
                if(response==true){
                    alert("Cambio de contraseña exitoso");
                    window.location.href='../';
                }else{
                    alert(response);
                }
                    
            });
        }else{
            alert("Las contraseñas no coinciden.");
        }
        e.preventDefault();
    })
});