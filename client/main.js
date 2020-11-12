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
                            <tr class="text-center" productId="${client.id}">
                            <td><a href="#col-client" data-toggle="modal" class='client-item'>${client.producto}</a></td>
                            <td><a href="#pay-client" data-toggle="modal" class="pays">${client.serial}</a></td>
                            <td>${client.categoria}</td>
                            <td>${client.ubicacion}</td>
                            <td>${client.descripcion}</td>
                            <td>${client.archivo}</td>
                            <td>
                            <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                            <a class="btn btn-danger btn-sm client-delete" href="#delete-client" data-toggle="modal">Eliminar</a>
                            </td>
                            </tr>
                            `
                        }else{
                            template+=`
                            <tr class="text-center" productId="${client.id}">
                            <td>${client.producto}</td>
                            <td><a href="#pay-client" data-toggle="modal" class="pays">${client.serial}</a></td>
                            <td>${client.categoria}</td>
                            <td>${client.ubicacion}</td>
                            <td>${client.descripcion}</td>
                            <td>${client.archivo}</td>
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
            let id = $(element).attr('productId');
            $.get('client-single.php', {id}, function(response){
                client=JSON.parse(response);
                let categoria=client[0].categoria;
                let ubicacion=client[0].ubicacion;
                $('#productId').val(client[0].id);
                $('#producto').val(client[0].producto);
                $('#serial').val(client[0].serial);
                $('#ubicacion').val(client[0].ubicacion);
                $('#descripcion').val(client[0].descripcion);
                $('.opcion').html('Modificar');
            });
            edit=true;
            $("#col-client").show();
        });
        
        //EVENTO PARA REALIZAR ELIMINACIÓN. -SOLO ADMINISTRADOR Y ENCARGADO-
        $(document).on('click', '.client-delete', function(){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('productId');
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
            e.preventDefault();
            let url = edit===false ? 'client-add.php' : 'client-update.php';
            const data = {
                id:$('#productId').val(),
                producto:$('#producto').val(),
                serial:$('#serial').val(),
                categoria:$('#categoria').val(),
                ubicacion:$('#ubicacion').val(),
                descripcion:$('#descripcion').val(),
                archivo:$("#archivo")[0].files[0]
            };
            
            console.log(data);
            if(data.producto!="" && data.serial!="" && $('#categoria').val()!="" && data.descripcion!="" && data.ubicacion!="" && data.ubicacion!="") {
                $.post(url, data, function(response){
                    console.log(response);
        
                    if(url=='client-add.php'){
                    if(response==true){
                        console.log('El cliente ha sido añadido exitosamente');
                        limpiar();
                        fetchCliente();
                    }else{
                        let palabras=response.split(" ");
                        if(palabras[4]=='key' && palabras[5]=="'categoria'"){
                            alert("Error. La categoria ingresada ya está registrada en el sistema.");
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
                        if(palabras[4]=='key' && palabras[5]=="'categoria'"){
                            alert("Error. La categoria ingresada ya está registrada en el sistema.");
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
        });
        
        //EVENTO PARA LLAMAR A LA FUNCIÓN LIMPIAR.
        $(document).on('click', '#limpiar', function() {
            limpiar();
           edit=false;
        });
        
        //FUNCIÓN PARA REINICIAR LOS CAMPOS.
        function limpiar(){
            $("#producto").val('');
            $("#serial").val('');
            $("#categoria").val('');
            $("#descripcion").val('');
            $("#ubicacion").val('');
            $("#ubicacion").val('');
            edit=false;
        };

        $(document).on('click', '#closemodal', function(){
            limpiar();
        });

        $(document).on('keyup', '#buscar', function() {
            let campo='categoria';
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
                        <tr class="text-center" productId="${client.id}">
                        <td><a href="#col-client" data-toggle="modal" class='client-item'>${client.producto}</a></td>
                        <td><a href="#pay-client" data-toggle="modal" class="pays">${client.serial}</a></td>
                        <td>${client.categoria}</td>
                        <td>${client.ubicacion}</td>
                        <td>${client.descripcion}</td>
                        <td>${client.ubicacion}</td>
                        <td>
                        <a class="btn btn-primary btn-sm client-view" href="#view-client" data-toggle="modal">Ver más</a>
                        <a class="btn btn-danger btn-sm client-delete" href="#delete-client" data-toggle="modal">Eliminar</a>
                        </td>
                        </tr>
                        `
                    }else{
                        template+=`
                        <tr class="text-center" productId="${client.id}">
                        <td>${client.producto}</td>
                        <td><a href="#pay-client" data-toggle="modal" class="pays">${client.serial}</a></td>
                        <td>${client.categoria}</td>
                        <td>${client.ubicacion}</td>
                        <td>${client.descripcion}</td>
                        <td>${client.ubicacion}</td>
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
            let id=$(element).attr('productId');
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
            let id=$(element).attr('productId');
            $.get('./view-client.php', {id}, function(response){
              let data=JSON.parse(response);
              console.log(data);
              $("#cliente1").html(data[0].nombre);
              $("#categoria2").html(data[0].categoria);
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
					const file = document.getElementById('archivo').files[0];
					if (file) {
						let fileReader = new FileReader();

						fileReader.onload = (e)=>{
							document.getElementById("preview").setAttribute("src", e.target.result);
						}

						fileReader.readAsDataURL(file);
					}
				})

				function previewImage() {
					
				}
});