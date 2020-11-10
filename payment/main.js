$(function(){
  let edit=false;
  let permiso = parseInt(sessionStorage.getItem('permiso'));
  let pagos={};
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
	
 	$(document).on('click', "#btnForm", function(){
    $(".opcion").html('Registrar');
  });

  function fetchPays(){
    $.ajax({
      url:'pay-list.php',
      type:'GET',
      success:function(dts){
        let template='';
        dts = JSON.parse(dts);
        pagos=dts;
        dts.forEach(pay => {
          if(permiso!=3){
            template+=`
            <tr class="text-center" pay-id="${pay.id}">
            <td><a href="#formulario" data-toggle="modal" class="pay-item">${pay.nombre}</a></td>
            <td>${pay.apellido}</td>
            <td>${pay.cedula}</td>
            <td>${pay.monto}</td>
            <td>${pay.viaPago}</td>
            <td>${pay.divisa}</td>
            <td>${pay.referencia}</td>
            <td>${pay.fechaPago}</td>
            <td>${pay.fechaVencimiento}</td>
            <td><a href="#delete-pay" class="btn btn-danger btn-sm pay-delete" data-toggle="modal">Eliminar</a></td>
            </tr>
            `;
          }else{
            template+=`
            	<tr class="text-center" pay-id="${pay.id}">
            		<td>${pay.nombre}</td>
            		<td>${pay.apellido}</td>
            		<td>${pay.cedula}</td>
            		<td>${pay.monto}</td>
            		<td>${pay.viaPago}</td>
            		<td>${pay.divisa}</td>
            		<td>${pay.referencia}</td>
            		<td>${pay.fechaPago}</td>
            		<td>${pay.fechaVencimiento}</td>
            	</tr>
            `; 
          }
        });
        $("#tbody").html(template);
      }
    });
	};
		
	fetchPays();
		
    //Modificar pago
    $(document).on('click', '.pay-item', function() {
      let element=$(this)[0].parentElement.parentElement;
      let id=$(element).attr('pay-id');
      $.get('pay-single.php', {id}, function(response){
        pay=JSON.parse(response);
        fechaPago=pay[0].fechaPago.split('-');
        fechaVencimiento=pay[0].fechaVencimiento.split('-');
        $('#paymentId').val(pay[0].id);
        $('#idPago').val(pay[0].idPago);
        $("#client-id").val(pay[0].idCliente);
        $("#client-nombre").val(pay[0].nombre + " " + pay[0].apellido);
        $("#monto").val(pay[0].monto);
        $("#referencia").val(pay[0].referencia);
        $('#divisa').val(pay[0].idDivisa);
        $('#via').val(pay[0].idMetodo);
        $('#mesPago').val(fechaPago[1]);
        $('#mesVencimiento').val(fechaVencimiento[1]);
        diaDePago();
        diaDeVencimiento();
        $('#diaPago').val(parseInt(fechaPago[2]));
        $('#diaVencimiento').val(parseInt(fechaVencimiento[2]));
        $('#idPay').val()
        $(".opcion").html('Modificar');
      });
      edit=true;    
    });

    //Listado de clientes
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
            	<td><a href="#formulario" data-dismiss="modal" aria-hidden="true" data-toggle="modal" class="btnClient">${element.nombre}</a></td>
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

    $(document).on('click', '#btnEliminar', function(){
      if (permiso<3) {
        let data={
            id:$("#idPay").val()
        }
        $.post('pay-delete.php', data, function(response){
            fetchPays();
        })
      }else{
        alert("No tiene permiso para realizar esta acción.");
      }
    });

    $(document).on('click', '.pay-delete', function(){
      let element=$(this)[0].parentElement.parentElement;
      let id=$(element).attr('pay-id');
      $("#idPay").val(id);
    });

    $(document).on('click', '.btnClient', function() {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('idclient');
      $.get('../client/client-single.php', {id}, function(response) {
        let client = JSON.parse(response);
        $("#client-id").val(client[0].id);
        $("#client-nombre").val(client[0].nombre + " " + client[0].apellido);
      });
    })

    $(document).on('change', '#mesVencimiento', function() {
      diaDeVencimiento();
    })

    $(document).on('change', '#mesPago', function() {
      diaDePago();
    });

    function diaDePago() {
      let template="<option value='00'>Dia</option>";
      if($("#mesPago").val()=='01' || $("#mesPago").val()=='03' || $("#mesPago").val()=='05' || $("#mesPago").val()=='07' || $("#mesPago").val()=='08' || $("#mesPago").val()=='10' || $("#mesPago").val()=='12'){
        for(let i = 1; i<=31; i++){
          template+=`<option value="${i}">${i}</option>`
				}
      }else if($("#mesPago").val()=='02'){
          for(let i = 1; i<=28; i++){
            template+=`<option value="${i}">${i}</option>`
          }
      }else{
          for(let i = 1; i<=30; i++){
            template+=`<option value="${i}">${i}</option>`;
          }
      }
      $("#diaPago").html(template);
    }

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

    $("#register").submit(function(e){
        let url=edit===false ? 'pay-add.php' : 'pay-update.php';
        let data={};
        data.id=$('#paymentId').val();
        data.idPago=$('#idPago').val();
        data.idCliente=$("#client-id").val();
        data.monto=$("#monto").val();
        data.fechaPago=$("#añoPago").val() + "-" + $("#mesPago").val() + "-" + $("#diaPago").val();
        data.fechaVencimiento=$("#añoVencimiento").val()+'-'+$("#mesVencimiento").val()+"-"+$("#diaVencimiento").val();
        data.divisa=$("#divisa").val();
        data.referencia=$("#referencia").val();
        data.viaPago=$("#via").val();
        let fp=new Date($("#añoPago").val(), parseInt($("#mesPago").val())-1, $("#diaPago").val());
        let fv=new Date($("#añoVencimiento").val(), parseInt($("#mesVencimiento").val())-1, $("#diaVencimiento").val());
        
        if($("#client-id").val!="" && $("#divisa").val()!=0 && $("#mesPago").val()!=0 && $("#mesVencimiento").val()!=0 && $("#diaPago").val()!=0 && $("#mesPago").val()!=0){
            if(fp>fv){
                alert("La fecha de vencimiento no puede ser mayor a la de pago.");
            }else{

                if (data.viaPago==1 && data.referencia=="") {
                    alert("Si la vía de pago es transferencia entonces la referencia no puede estar vacía.");
                }else {
                    let error=false;
                    if(edit==false && data.viaPago==1){
                    pagos.forEach(element => {
                        if (data.referencia==element.referencia) {
                            error=true;
                        }
                    });
                }
                    if (error) {
                        alert("La referencia ingresada ya existe.");
                    }else{
                        $.post(url, data, function(response){
                            if(response==true){
                                console.log("El pago fue añadido/modificado correctamente.");
                                limpiar();
                                fetchPays();
                                edit=false;
                            }else{
                                let palabras=response.split(" ");
                                if (palabras[4]=='key' && palabras[5]=='referencia') {
                                    alert("La referencia ingresada ya está registrada.");
                                }else{
                                    alert(response);
                                }
                            }
                        })
                    }
                }

               
            }
        }else{
            alert("Faltan datos por ingresar.");
        }

        e.preventDefault();
        
    });  
    
    function limpiar(){
        $('#divisa').val(0);
        $('#via').val(0);
        $("#client-id").val("");
        $("#client-nombre").val("");
        $("#monto").val("");
        $("#referencia").val("");
        $("#mesVencimiento").val(0);
        $("#mesPago").val(0);
        $("#diaPago").val(0);
        $("#diaVencimiento").val(0);
        edit=false;
    }

    $(document).on('keyup', '#buscar', function(){
        if ($("#buscar").val()!=="") {
            data={
                campo:"cedula",
                valor:$("#buscar").val()
            };
            $.get('pay-search.php', data, function (response) {
                let template='';
                response = JSON.parse(response);
                response.forEach(pay => {
                    if(permiso==3){
                        template+=`
                        <tr class="text-center" pay-id="${pay.id}">
                        <td>${pay.nombre}</td>
                        <td>${pay.apellido}</td>
                        <td>${pay.cedula}</td>
                        <td>${pay.fechaPago}</td>
                        <td>${pay.monto}</td>
                        <td>${pay.viaPago}</td>
                        <td>${pay.divisa}</td>
                        <td>${pay.referencia}</td>
                        <td>${pay.fechaVencimiento}</td>
                        <td></td>
                        </tr>
                        `;
                    }else{
                        template+=`
                        <tr class="text-center" pay-id="${pay.id}">
                        <td><a href="#formulario" data-toggle="modal" class="pay-item">${pay.nombre}</a></td>
                        <td>${pay.apellido}</td>
                        <td>${pay.cedula}</td>
                        <td>${pay.fechaPago}</td>
                        <td>${pay.monto}</td>
                        <td>${pay.viaPago}</td>
                        <td>${pay.divisa}</td>
                        <td>${pay.referencia}</td>
                        <td>${pay.fechaVencimiento}</td>
                        <td><button type="button" class="btn btn-danger btn-sm pay-delete">Eliminar</td>
                        </tr>
                        `;
                    }
                    
                });

                $("#tbody").html(template);
                
            })
        }else{
            fetchPays();
        }
    })

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

    $(document).on('click', '#closemodal', function () {
        limpiar();
    })

    $(document).on('click', '#limpiar', function(){
        limpiar();
    })

    function limpiarCliente() {
        $('#nombre').val('');
        $('#apellido').val('');
        $('#cedula').val('');
        $('#letra').val('V-');
        $('#correo').val('');
        $('#telefono').val('');
        $('#direccion').val('');
    }

    $(document).on('submit', '#client-form', function (e) {
        
        let url='../client/client-add.php';
        const data = {
            id:$('#clientId').val(),
            nombre:$('#nombre').val(),
            apellido:$('#apellido').val(),
            cedula:$('#letra').val() + $('#cedula').val(),
            direccion:$('#direccion').val(),
            correo:$('#correo').val(),
            telefono:$("#codigo").val() + $('#telefono').val()
        };
        
        if(data.nombre!="" && data.apellido!="" && data.cedula!=""){
            $.post(url, data, function(response){
    
                if(response==true){
                    console.log('El cliente ha sido añadido exitosamente');
                    limpiarCliente();
                    fetchClient();
                }else{
                    let palabras=response.split(" ");
                    if(palabras[4]=='key' && palabras[5]=="'cedula'"){
                        alert("Error. La cedula ingresada ya está registrada en el sistema.");
                    }else{
                        alert(response);
                    }
                    console.log('Ha ocurrido algun error añadiendo al cliente.');
                }
            
    
            });
        }else{
            alert("Faltan datos para poder realizar el registro del cliente.");
        }
        e.preventDefault();
    });

    $(document).on('click', '#closemodal', function(){
        limpiar();
    });
});
