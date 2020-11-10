$(function(){
    let edit=false;
    let permiso = parseInt(sessionStorage.getItem('permiso'));
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
        console.log($("#table-id").get());
        console.log('jQuery is working');
        //FUNCIÓN PARA LLENAR LA TABLA DE DATOS.
        function fetchCliente() {
            $.ajax({
                url:'client-list.php',
                type:'GET',
                success:function(response){
                    let template='';
                    clients = JSON.parse(response);
                    clients.forEach(client => {
                        if (permiso<3) {
                            template+=`
                            <tr class="text-center" clientId="${client.id}">
                            <td><a href="#col-client" data-toggle="modal" class='client-item'>${client.nombre}</a></td>
                            <td><a href="#pay-client" data-toggle="modal" class="pays">${client.apellido}</a></td>
                            <td>${client.cedula}</td>
                            <td>${client.telefono}</td>
                            <td>${client.correo}</td>
                            <td>${client.direccion}</td>
                            <td>
                            <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                            <a class="btn btn-danger btn-sm client-delete" href="#delete-client" data-toggle="modal">Eliminar</a>
                            </td>
                            </tr>
                            `
                        }else{
                            template+=`
                            <tr class="text-center" clientId="${client.id}">
                            <td>${client.nombre}</td>
                            <td><a href="#pay-client" data-toggle="modal" class="pays">${client.apellido}</a></td>
                            <td>${client.cedula}</td>
                            <td>${client.telefono}</td>
                            <td>${client.correo}</td>
                            <td>${client.direccion}</td>
                            <td>
                            <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                            </td>
                            </tr>
                            `
                        }
                    });
                    $("#clients").html(template);
                }
            });
        }
        
        fetchCliente();

        $(document).on('click', '#btnForm', function(){
            $(".opcion").html('Registrar');
        });
        
        //EVENTO PARA RELLENAR LA TABLA DE MODIFICACION DE CLIENTE -SOLO ADMINISTRADOR Y ENCARGADO-.
        $(document).on('click', '.client-item', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id = $(element).attr('clientId');
            $.get('client-single.php', {id}, function(response){
                client=JSON.parse(response);
                let cedula=client[0].cedula.split('-');
                let telefono=client[0].telefono.split('-');
                $('#clientId').val(client[0].id);
                $('#nombre').val(client[0].nombre);
                $('#apellido').val(client[0].apellido);
                $('#letra').val(cedula[0]+'-');
                $('#cedula').val(cedula[1]);
                $('#codigo').val(telefono[0]+'-');
                $('#telefono').val(telefono[1]);
                $('#direccion').val(client[0].direccion);
                $('#correo').val(client[0].correo);
                $('.opcion').html('Modificar');
            });
            edit=true;
            $("#col-client").show();
        });
        
        //EVENTO PARA REALIZAR ELIMINACIÓN. -SOLO ADMINISTRADOR Y ENCARGADO-
        $(document).on('click', '.client-delete', function(){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('clientid');
            $("#idClient").val(id);
        });
        
        //BOTÓN PARA CONFIMAR ELIMINACIÓN.
        $(document).on('click', '#btnEliminar', function() {
            let id = $("#idClient").val();
            $.post('client-delete.php', {id}, function(response) {
               console.log(response);
               fetchCliente();
            });
        })
        
        //EVENTO QUE DEPENDIENDO DEL MES SE RELLENA EL SELECT DE DIAS.
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
        
        //ENVIO DE INFORMACIÓN AL SERVIDOR.
        $("#client-form").submit(function(e){
            let url = edit===false ? 'client-add.php' : 'client-update.php';
            const data = {
                id:$('#clientId').val(),
                nombre:$('#nombre').val(),
                apellido:$('#apellido').val(),
                cedula:$('#letra').val() + $('#cedula').val(),
                direccion:$('#direccion').val(),
                correo:$('#correo').val(),
                telefono:$("#codigo").val()+$('#telefono').val()
            };
            console.log(data);
            if(data.nombre!="" && data.apellido!="" && $('#cedula').val()!="" && data.correo!="" && data.telefono!="" && data.direccion!="" && ($('#cedula').val().length>6 && $('#cedula').val().length<10)){
                $.post(url, data, function(response){
                    console.log(response);
        
                    if(url=='client-add.php'){
                    if(response==true){
                        console.log('El cliente ha sido añadido exitosamente');
                        limpiar();
                        fetchCliente();
                    }else{
                        let palabras=response.split(" ");
                        if(palabras[4]=='key' && palabras[5]=="'cedula'"){
                            alert("Error. La cedula ingresada ya está registrada en el sistema.");
                        }else{
                            alert(response);
                        }
                        console.log('Ha ocurrido algun error añadiendo al cliente.');
                    }
                }else{
                    if(response==true){
                        console.log('El cliente ha sido modificado exitosamente');
                        limpiar();
                        fetchCliente();
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
                alert("Hay datos invalidos el registro/modificacion del cliente.");
            }
            e.preventDefault();
        });
        
        //EVENTO PARA LLAMAR A LA FUNCIÓN LIMPIAR.
        $(document).on('click', '#limpiar', function() {
            limpiar();
           edit=false;
        });
        
        //FUNCIÓN PARA REINICIAR LOS CAMPOS.
        function limpiar(){
            $("#nombre").val('');
            $("#apellido").val('');
            $("#cedula").val('');
            $("#correo").val('');
            $("#telefono").val('');
            $("#direccion").val('');
            edit=false;
        };

        $(document).on('click', '#closemodal', function(){
            limpiar();
        });

        $(document).on('keyup', '#buscar', function() {
            let campo='cedula';
            let valor=$("#buscar").val();
            if(valor==""){
                fetchCliente();
            }else{
                let data = {
                    tipo:1,
                    campo:campo,
                    valor:valor
                }
                $.get('client-list.php', data, function(response){ let template='';
                clients = JSON.parse(response);
                clients.forEach(client => {
                    if (permiso<3) {
                        template+=`
                        <tr class="text-center" clientId="${client.id}">
                        <td><a href="#col-client" data-toggle="modal" class='client-item'>${client.nombre}</a></td>
                        <td><a href="#pay-client" data-toggle="modal" class="pays">${client.apellido}</a></td>
                        <td>${client.cedula}</td>
                        <td>${client.telefono}</td>
                        <td>${client.correo}</td>
                        <td>${client.direccion}</td>
                        <td>
                        <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                        <a class="btn btn-danger btn-sm client-delete" href="#delete-client" data-toggle="modal">Eliminar</a>
                        </td>
                        </tr>
                        `
                    }else{
                        template+=`
                        <tr class="text-center" clientId="${client.id}">
                        <td>${client.nombre}</td>
                        <td><a href="#pay-client" data-toggle="modal" class="pays">${client.apellido}</a></td>
                        <td>${client.cedula}</td>
                        <td>${client.telefono}</td>
                        <td>${client.correo}</td>
                        <td>${client.direccion}</td>
                        <td>
                        <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                        </td>
                        </tr>
                        `
                    }
                });
                    $("#clients").html(template);
                })
            }
        })

        $(document).on('click', '.pays', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('clientId');
            let template="";
            $.get('pay-client.php', {id}, function(response){
                console.log(response);
                let pays=JSON.parse(response);
                pays.forEach(element => {
                    if(permiso<3){
                        template+=`
                        <tr pay-id="${element.id}">
                        <td>${element.monto}</td>
                        <td>${element.metodo}</td>
                        <td>${element.fechaPago}</td>
                        <td>${element.fechaVencimiento}</td>
                        <td><a href="#delete-pay" class="btn btn-danger btn-sm delete">Eliminar</a></td>
                        </tr>
                        `
                    }else{
                        template+=`
                        <tr pay-id="${element.id}">
                        <td>${element.monto}</td>
                        <td>${element.metodo}</td>
                        <td>${element.fechaPago}</td>
                        <td>${element.fechaVencimiento}</td>
                        </tr>
                        `
                    }
                });
                $("#cliente").html(pays[0].nombre);
                $("#tbody-pay").html(template);
            })

        });

        $(document).on('click', '.delete', function(){
            permiso=sessionStorage.getItem('permiso');
            if (permiso==3) {
                alert('No tienes permiso para ejecutar esta acción.');
            }else{
                let element=$(this)[0].parentElement.parentElement;
                let id=$(element).attr('pay-id');
                $.post('../payment/pay-delete.php', {id}, function(response){
                    if (response=true) {
                        console.log("Pago eliminado correctamente");
                        
                    }else{
                        console.log(response);
                    }
                })
            }
        });

        $(document).on('click', '.client-view', function(){
            let element=$(this)[0].parentElement.parentElement;
            let id=$(element).attr('clientid');
            $.get('./view-client.php', {id}, function(response){
              let data=JSON.parse(response);
              console.log(data);
              $("#cliente1").html(data[0].nombre);
              $("#cedula2").html(data[0].cedula);
              $("#fechaPago2").html(data[0].fechaPago);
              $("#fechaVencimiento2").html(data[0].fechaVencimiento);
              $("#monto2").html(data[0].monto);
              $("#tiempo2").html(data[0].tiempo);
              $("#metodo2").html(data[0].viaPago);
              $("#divisa2").html(data[0].divisa);
              $("#referencia2").html(data[0].referencia);
            })
        });

        $(document).on('change', '#ubicacion', ()=>{
            const ubicacion = $('#ubicacion').val();
            if (parseInt(ubicacion) > 5) {
							$('#ala').addClass("d-none");
							$('#ala').removeClass("d-inline");
							console.log("funciona")
            }else {
							$('#ala').removeClass("d-none");
							$('#ala').addClass("d-inline");
							console.log("no funciona")
						}
				});
				
				$(document).on('change', '#archivo', ()=>{
					const file = document.getElementById('archivo').files;
					if (file.length > 0) {
						let fileReader = new FileReader();

						fileReader.onload = (e)=>{
							document.getElementById("preview").setAttribute("src", e.target.result);
						}

						fileReader.readAsDataURL(file[0]);
					}
				})

				function previewImage() {
					
				}
});