sessionStorage.clear();
$(function(){
    if(typeof(Storage!=='undefined')) {
      $("#btnSubmit").click(function() {
          const data={
            user:$("#user").val(),
            pass:$("#pass").val()
      }
      
      if(data.user!="" && data.pass!="") {
          $.ajax({
            url:'./login/login.php',
            data:data,
            type: 'POST',
            beforeSend: function () {
              $("#btnSubmit").html("Ingresando");
            },
            success: function(response){
              $("#btnSubmit").html("<i class='fas fa-sign-in-alt'></i>  Login");
              if(response=="#404"){
                alert("El usuario ingresado no existe.");
              }else if (response=="#400") {
                alert("La clave introducida es inválida. Al tercer intento inválido su usuario será bloqueado.");
              }else if (response=="#401") {
                alert("El usuario está bloqueado. Vaya a la opción de 'Recordar contraseña' o comuniquese con el administrador.");
              }else if(response.includes("Ha habido un error")){
                alert(response);
                }else{
                  console.log('Todo bien')
                  usuario=JSON.parse(response);
                  usuario=usuario[0];
                  sessionStorage.setItem('permiso', usuario.nivel);
                  sessionStorage.setItem('user', usuario.user);
                  location.href="./payment/";
                }
              }
      });
      }else{
          alert("Faltan datos por ingresar.");
      }
    });

    $('#checkbox').change(function(){
      if(document.getElementById("checkbox").checked){
          document.getElementById("pass").type="text";
      }else{
          document.getElementById("pass").type="password";
      }
    })
  }else{alert('El navegador no soporta Storage')}
    
});