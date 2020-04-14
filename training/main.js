$(function(){
    let edit=false;
    let permiso = parseInt(sessionStorage.getItem('permiso'));
        console.log('jQuery is working');
        if(permiso==3){
            console.log("Sesión iniciada como cajero.");
            $("#btnUsuario").hide();
            $("#btnReporte").hide();
            $("#btnHerramienta").hide();
    
        }else if(permiso==2){
            console.log("Sesión iniciada como encargado.");
            $("#btnUsuario").hide();
        }else{
            console.log("Sesión iniciada como administrador.");
        }

        $("#btnForm").click(function(){
            $(".opcion").html('Registrar');
        });

        function fetchTrainer() {
            $.ajax({
                url:'training-list.php',
                type:'GET',
                success:function(response){
                    let template='';
                    trainers = JSON.parse(response);
                    trainers.forEach(trainer => {
                        if (permiso==3) {
                            template+=`
                            <tr class="text-center" trainer-id="${trainer.id}">
                            <td>${trainer.nombre}</td>
                            <td><a href="#trainer-client" data-toggle="modal" class="modal-trainer">${trainer.cedula}</a></td>
                            <td>${trainer.numCuenta}</td>
                            <td>${trainer.telefono}</td>
                            <td>${trainer.correo}</td>
                            <td>${trainer.direccion}</td>
                            <td></td>
                            </tr>
                            `
                        }else{
                            template+=`
                            <tr class="text-center" trainer-id="${trainer.id}">
                            <td><a href="#col-training" data-toggle="modal" class='trainer-item'>${trainer.nombre}</a></td>
                            <td><a href="#trainer-client" data-toggle="modal" class="modal-trainer">${trainer.cedula}</a></td>
                            <td>${trainer.numCuenta}</td>
                            <td>${trainer.telefono}</td>
                            <td>${trainer.correo}</td>
                            <td>${trainer.direccion}</td>
                            <td><a class="btn btn-danger btn-sm trainer-delete" href="#delete-training" data-toggle="modal">Eliminar</a></td>
                            </tr>
                            `

                        }
                    });
                    $("#trainers").html(template);
                }
            });
        }
        
        fetchTrainer();

        function fetchClient(){
            let data={tipo:1}
            $.ajax({
                url:'../client/client-list.php',
                data:data,
                type:'GET',
                success:function(response){
                    let template="";
                    let clients = JSON.parse(response);
                    clients.forEach(element => {
                        template+=`<tr idclient='${element.id}'>
                        <td><a href="#registro" data-dismiss="modal" aria-hidden="true" data-toggle="modal" class="btnClient">${element.nombre}</a></td>
                        <td>${element.apellido}</td>
                        <td>${element.cedula}</td>
                        </tr>
                        `
                    });
                    $("#tbody-client").html(template);
                }
                
            });
        }
        fetchClient();
        
        $(document).on('click', '#btnAsociar', function(){
            data={
                idEntrenador:$("#idEntrenador").val(),
                tarifa:$("#monto").val(),
                vencimiento:$("#añoVencimiento").val()+'-'+$("#mesVencimiento").val()+"-"+$("#diaVencimiento").val(),
                idCliente:$("#client-id").val(),
                idDivisa:$("#divisa").val()
            }
            $.post('training-client-add.php', data, function(response){
                if(response==true){
                    alert("Asociación entrenador-cliente realizada correctamente.");
                    let id = data.idEntrenador;
                    $.get('training-client-list.php', {id}, function(response){
                        let template="";
                        let clients = JSON.parse(response);
                        console.log(clients);
                        clients.forEach(element => {
                            if(permiso==3){
                                template+=`<tr trainerClient-id=${element.id}>
                                <td>${element.nombre}</td>
                                <td>${element.divisa}</td>
                                <td>${element.tarifa}</td>
                                <td>${element.vencimiento}</td>
                                </tr>
                                `
                            }else{
                                template+=`<tr trainerClient-id=${element.id}>
                            <td>${element.nombre}</td>
                            <td>${element.divisa}</td>
                            <td>${element.tarifa}</td>
                            <td>${element.vencimiento}</td>
                            <td><button class="btn btn-danger btn-sm trainerClientDelete">Eliminar</button></td>
                            </tr>
                            `
                            }
                            
                        });
                        $("#clientes").html(template);
                    });
                }else{
                    alert(response);
                }
            })
        });

        $(document).on('change', '#mesVencimiento', function() {
            diaDeVencimiento();
        })

        function diaDeVencimiento() {
            let template="<option>Dia</option>";
            if($("#mesVencimiento").val()=='01' || $("#mesVencimiento").val()=='03' || $("#mesVencimiento").val()=='05' || $("#mesVencimiento").val()=='07' || $("#mesVencimiento").val()=='08' || $("#mesVencimiento").val()=='10' || $("#mesVencimiento").val()=='12'){
                for(let i = 1; i<=31; i++){
                    template+=`<option>${i}</option>`
                }
            }else if($("#mesVencimiento").val()=='02'){
                for(let i = 1; i<=28; i++){
                    template+=`<option>${i}</option>`
                }
            }else{
                for(let i = 1; i<=30; i++){
                    template+=`<option>${i}</option>`
                }
            }
            $("#diaVencimiento").html(template);
        }

        $(document).on('click', '.btnClient', function() {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('idclient');
            $.get('../client/client-single.php', {id}, function(response) {
                let client = JSON.parse(response);
                $("#idEntrenador").val($("#entrenador-id").val());
                $("#client-id").val(client[0].id);
                $("#client-nombre").val(client[0].nombre + " " + client[0].apellido);
            });
    
        });

        $(document).on('keyup', '#client-valor', function(){
            let valor= $("#client-valor").val();
            if(valor==''){
                fetchClient();
            }else{
                data={
                    tipo:1,
                    campo:$("#client-campo").val(),
                    valor:$("#client-valor").val()
                }
                $.get('../client/client-list.php', data, function(dts){
                    let clients = JSON.parse(dts);
                    console.log(clients);
                    let template="";
                    clients.forEach(element => {
                        template+=`<tr idclient='${element.id}'>
                                        <td><a href="#formulario" data-dismiss="modal" aria-hidden="true" data-toggle="modal" class="btnClient">${element.nombre}</a></td>
                                        <td>${element.apellido}</td>
                                        <td>${element.cedula}</td>
                                    </tr>`
                    });
                    $("#tbody-client").html(template);
                })
            }
        })


        $(document).on('click', '.modal-trainer', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('trainer-id');
            $("#entrenador-id").val(id);
            $.get('training-client-list.php', {id}, function(response){
                let template="";
                let clients = JSON.parse(response);
                console.log(clients);
                clients.forEach(element => {
                    if(permiso==3){
                        template+=`<tr trainerClient-id=${element.id}>
                        <td>${element.nombre}</td>
                        <td>${element.divisa}</td>
                        <td>${element.tarifa}</td>
                        <td>${element.vencimiento}</td>
                        </tr>
                        `
                    }else{
                        template+=`<tr trainerClient-id=${element.id}>
                    <td>${element.nombre}</td>
                    <td>${element.divisa}</td>
                    <td>${element.tarifa}</td>
                    <td>${element.vencimiento}</td>
                    <td><button class="btn btn-danger btn-sm trainerClientDelete">Eliminar</button></td>
                    </tr>
                    `
                    }
                    
                });
                $("#clientes").html(template);
            });
        })

        $(document).on('click', '.trainerClientDelete', function(e){
            e.preventDefault();
            $(this).closest('tr').remove();
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr("trainerClient-id");
            $.post('training-client-delete.php', {id}, function(response){
                console.log(response);
                
            });
        });

        $(document).on('click', '.trainer-item', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id = $(element).attr('trainer-id');
            $.get('training-single.php', {id}, function(response){
                trainer=JSON.parse(response);
                let cedula=trainer[0].cedula.split('-');
                let telefono=trainer[0].telefono.split('-');
                $('#id-trainer').val(trainer[0].id);
                $('#nombre').val(trainer[0].nombre);
                $('#numCuenta').val(trainer[0].numCuenta);
                $('#letra').val(cedula[0]+'-');
                $('#cedula').val(cedula[1]);
                $('#codigo').val(telefono[0]+'-');
                $('#telefono').val(telefono[1]);
                $('#direccion').val(trainer[0].direccion);
                $('#correo').val(trainer[0].correo);
                $(".opcion").html('Modificar');
            });
            edit=true;
            $("#col-trainer").show();
        });
        
        $(document).on('click', '.trainer-delete', function(){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('trainer-id');
            $("#idTrainer").val(id);
        });
        
        $(document).on('click', '#btnEliminar', function() {
            let id = $("#idTrainer").val();
            $.post('training-delete.php', {id}, function(response) {
               console.log(response);
               fetchTrainer();
            });
        })
        
        $(document).on('change', '#mes', function() {
            let mes = parseInt($("#mes").val());
            let output='<option value="nothing">Dia</option>';
            if (mes==1 || mes==3 || mes==5 || mes==7 || mes==8 || mes==10 || mes==12) {
                for (let i = 1; i <= 31; i++){
                    output+="<option value='"+ parseInt(i) +"'>" +parseInt(i)+ "</option>";
                }
            }else if(mes==2){
                for (let i = 1; i <= 28; i++){
                    output+="<option value='"+ i +"'>" +i+ "</option>";
                }
            }else{
                for (let i = 1; i <= 30; i++){
                    output+="<option value='"+ i +"'>" +i+ "</option>";   
                }
            }
            console.log(output);
            $("#dia").html(output);
        });
        
        $("#training-form").submit(function(e){
            let url = edit===false ? 'training-add.php' : 'training-update.php';
            const data = {
                id:$('#id-trainer').val(),
                nombre:$('#nombre').val(),
                numCuenta:$('#numCuenta').val(),
                cedula:$('#letra').val() + $('#cedula').val(),
                direccion:$('#direccion').val(),
                correo:$('#correo').val(),
                telefono:$("#codigo").val()+$('#telefono').val()
            };
            console.log(data);
            if(data.nombre!="" && data.cedula!="" && $("#telefono").val().lenght!==7){
                $.post(url, data, function(response){
        
                    if(url=='training-add.php'){
                    if(response==true){
                        console.log('El entrenador ha sido añadido exitosamente');
                        limpiar();
                        fetchTrainer();
                    }else{
                        let palabras=response.split(" ");
                        if(palabras[4]=='key' && palabras[5]=="'cedula'"){
                            alert("Error. La cedula ingresada ya está registrada en el sistema.");
                        }else{
                            alert('La base de datos ha reportador el siguiente mensaje de error: ' + response);
                        }
                        console.log('Ha ocurrido algun error añadiendo al entrenador.');
                    }
                }else{
                    if(response==true){
                        console.log('El entrenador ha sido modificado exitosamente');
                        limpiar();
                        fetchTrainer();
                    }else{
                        let palabras=response.split(" ");
                        if(palabras[4]=='key' && palabras[5]=="'cedula'"){
                            alert("Error. La cedula ingresada ya está registrada en el sistema.");
                        }else{
                            alert(response);
                        }
                        console.log('Ha habido un error en la modificacion del cliente');
                    }
                }
        
                });
            }else{
                alert("Faltan datos para poder realizar el registro/modificacion del cliente.");
            }
            e.preventDefault();
        });
        
        $(document).on('click', '#limpiar', function() {
            limpiar();
           edit=false;
        });
        
        $(document).on('click', '#close', function(){
            limpiar();
        })

        function limpiar(){
            $("#nombre").val('');
            $("#letra").val('V-');
            $("#cedula").val('');
            $("#telefono").val('');
            $("#codigo").val('0414');
            $("#direccion").val('');
            $("#correo").val('');
            $("#numCuenta").val('');
            edit=false;
        };

        $(document).on('keyup', '#buscar', function() {
            let campo='cedula';
            let valor=$("#buscar").val();
            if(valor==""){
                fetchTrainer();
            }else{
                let data = {
                    tipo:1,
                    campo:campo,
                    valor:valor
                }
                $.get('training-list.php', data, function(response){
                        let trainers=JSON.parse(response);
                        let template='';
                        trainers = JSON.parse(response);
                        trainers.forEach(trainer => {
                            if (permiso==3) {
                                template+=`
                                <tr class="text-center" trainer-id="${trainer.id}">
                                <td>${trainer.nombre}</td>
                                <td><a href="#trainer-client" data-toggle="modal" class="modal-trainer">${trainer.cedula}</a></td>
                                <td>${trainer.numCuenta}</td>
                                <td>${trainer.telefono}</td>
                                <td>${trainer.correo}</td>
                                <td>${trainer.direccion}</td>
                                <td></td>
                                </tr>
                                `
                            }else{
                                template+=`
                                <tr class="text-center" trainer-id="${trainer.id}">
                                <td><a href="#col-training" data-toggle="modal" class='trainer-item'>${trainer.nombre}</a></td>
                                <td><a href="#trainer-client" data-toggle="modal" class="modal-trainer">${trainer.cedula}</a></td>
                                <td>${trainer.numCuenta}</td>
                                <td>${trainer.telefono}</td>
                                <td>${trainer.correo}</td>
                                <td>${trainer.direccion}</td>
                                <td><a class="btn btn-danger btn-sm trainer-delete" href="#delete-training" data-toggle="modal">Eliminar</a></td>
                                </tr>
                                `
    
                            }
                        });
                    $("#trainers").html(template);
                })
            }
        })

        $(document).on('keyup', '#limpiar', function() {
            limpiar();
        })

});