$(function(){
        let pregunta1=0;
        let pregunta2=0;
        let edit=false;

        $("#btnForm").click(function(){
            $(".opcion").html('Registrar');
        });

        function fetchUser(){
        $.ajax({
            url:'user-list.php',
            type:'GET',
            success:function(response){
                let template='';
                users = JSON.parse(response);
                users.forEach(user => {
                    template+=`
                    <tr class="text-center" userId="${parseInt(user.id)}">
                    <td><a href="#formulario" data-toggle="modal" class='user-item'>${user.user}</a></td>
                    <td>${user.pass}</td>
                    <td>${user.cargo}</td>
                    <td><a class="btn btn-danger btn-sm user-delete" href="#delete-user" data-toggle="modal" aria-hidden="true">Eliminar</a></td>
                    </tr>
                    `
                });
                $("#users").html(template);
            }
        });
        }
        fetchUser();
    
        $(document).on('click', '#close', function(){
            limpiar();
        })

        $(document).on('click', '.user-delete', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('userId');
            $("#idUser").val(id);
        });

        $(document).on('click', '#btnEliminar', function(){
            let id=$("#idUser").val();
            $.post('user-delete.php', {id}, function(response){
                if(response==true){
                    console.log("Usuario eliminado satisfactoriamente.");
                    fetchUser();
                }else{
                    alert(response);
                }
            });
        })

        $("#user-form").submit(function(e) {
                const data={
                    'id':$("#id-user").val(),
                    'user':$("#usuario").val(),
                    'pass':$("#pass").val(),
                    'nivel':$('#nivel').val(),
                    'pregunta1':$('#pregunta1').val(),
                    'respuesta1':$('#respuesta1').val(),
                    'pregunta2':$('#pregunta2').val(),
                    'respuesta2':$('#respuesta2').val(),
                }
        if(data.usuario!="" && data.pass!="" && data.pregunta1!=0 && data.pregunta2!=0 && data.respuesta1!="" && data.respuesta2!="" && data.nivel!=0){
            let url = edit===false ? 'user-add.php' : 'user-update.php';
            $.post(url, data, function(response){
                if(response==true){
                    fetchUser();
                    limpiar();
                    alert('El usuario fue registrado de manera exitosa.');
                }else{
                    alert(response);
                }
            });
        }else{
            alert('Faltan datos por ingresar.');
        }
            e.preventDefault();
        });
        
        $(document).on('click', '.user-item', function(){
                let element=$(this)[0].parentElement.parentElement;
                let id=$(element).attr('userId');
                $.get('user-single.php', {id}, function(response){
                    let user=JSON.parse(response);
                    $("#id-user").val(user[0].id);
                    $("#usuario").val(user[0].user);
                    $("#pass").val(user[0].pass);
                    $("#nivel").val(parseInt(user[0].permiso));
                    $("#pregunta1").val(parseInt(user[0].pregunta1));
                    $("#pregunta2").val(parseInt(user[0].pregunta2));
                    $("#respuesta1").val(user[0].respuesta1);
                    $("#respuesta2").val(user[0].respuesta2);
                    pregunta1=parseInt(user[0].pregunta1);
                    pregunta2=parseInt(user[0].pregunta2);
                    $(".opcion").html("Modificar");
                    edit=true;
                    console.log(user[0]);
                    console.log('edit='+edit);
                })
        });

        $(document).on('change', '#pregunta1', function(){
                if($('#pregunta1').val()!=0 && ($('#pregunta1').val()==pregunta2)){
                    alert('La pregunta ya está seleccionada.');
                    $('#pregunta1').val(pregunta1);
                }else{
                    pregunta1=$('#pregunta1').val();
                }
        });


        $(document).on('change', '#pregunta2', function(){
                if($('#pregunta2').val()!=0 && ($('#pregunta2').val()==pregunta1)){
                    alert('La pregunta ya está seleccionada.');
                    $('#pregunta2').val(pregunta2);
                }else{
                    pregunta2=$('#pregunta2').val();
                }
        });


        $(document).on('click', '#limpiar', function(){
                limpiar();
        });

        $(document).on('keyup', '#buscar', function(){
            let data={
                campo:'user',
                valor:$("#buscar").val()
            };
            $.get('user-search.php', data, function(response){
                let template='';
                users = JSON.parse(response);
                users.forEach(user => {
                    template+=`
                    <tr class="text-center" userId="${parseInt(user.id)}">
                    <td><a href="#formulario" data-toggle="modal" class='user-item'>${user.user}</a></td>
                    <td>${user.pass}</td>
                    <td>${user.cargo}</td>
                    <td><button class="btn btn-danger btn-sm user-delete">Eliminar</button></td>
                    </tr>
                    `
                });
                $("#users").html(template);
            });
        });

        function limpiar(){
                edit=false;
                $("#usuario").val('');
                $("#pass").val('');
                $("#nivel").val(0);
                $("#pregunta1").val(0);
                $("#respuesta1").val('');
                $("#pregunta2").val(0);
                $("#respuesta2").val('');
                $("#btnGuardar").html("Guardar usuario");
                console.log('edit='+edit);

        }

        $(document).on('change', '#checkbox', function(){
            if(document.getElementById("checkbox").checked){
                document.getElementById("pass").type="text";
            }else{
                document.getElementById("pass").type="password";
            }
        })
});

