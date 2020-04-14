$(function(){
    $("#content").hide();
    $("#reporteCliente").hide();
    $("#info-cliente").hide();
    $("#ClienteEntrenador").hide();
    $("#unpay").hide();

    $("#opciones").click(function(){
        $("#content").hide();
        $("#report").toggle();
        $("#opcion").html('');
        $("#data").html('');
        $("#tipoReporte").val(0);
        $("#unpay").hide();
        $("#reporteCliente").hide();
        $("#info-cliente").hide();
        $("#ClienteEntrenador").hide();
    });

    $(document).on('change', '#mes', function() {
        let template="<option value='0'>Dia</option>";
        if($("#mes").val()=='01' || $("#mes").val()=='03' || $("#mes").val()=='05' || $("#mes").val()=='07' || $("#mes").val()=='08' || $("#mes").val()=='10' || $("#mes").val()=='12'){
            for(let i = 1; i<=31; i++){
                template+=`<option value='${i}'>${i}</option>`
            }
        }else if($("#mes").val()=='02'){
            for(let i = 1; i<=28; i++){
                template+=`<option value='${i}'>${i}</option>`
            }
        }else{
            for(let i = 1; i<=30; i++){
                template+=`<option value='${i}'>${i}</option>`;
            }
        }
        $("#dia").html(template);
    })

    $(document).on('change', '#mes2', function() {
        let template="<option value='0'>Dia</option>";
        if($("#mes2").val()=='01' || $("#mes2").val()=='03' || $("#mes2").val()=='05' || $("#mes2").val()=='07' || $("#mes2").val()=='08' || $("#mes2").val()=='10' || $("#mes2").val()=='12'){
            for(let i = 1; i<=31; i++){
                template+=`<option value='${i}'>${i}</option>`
            }
        }else if($("#mes2").val()=='02'){
            for(let i = 1; i<=28; i++){
                template+=`<option value='${i}'>${i}</option>`
            }
        }else{
            for(let i = 1; i<=30; i++){
                template+=`<option value='${i}'>${i}</option>`;
            }
        }
        $("#dia2").html(template);
    })

    $(document).on('click', '#btnReporte1', function(){
        
    if($("#mes").val()=="0" || $("#dia").val()=="0"){
        alert('Error. La fecha ingresada es invalida.');
    }else{
        let fecha=$("#año").val() + "-" + $("#mes").val() + "-" + $("#dia").val();
        data={
            tipo:1,
            fecha:fecha
        };
        $.get('report-pay.php', data, function(response){
            clients = JSON.parse(response);
            $("#body").html(`   <div id="tabla1"><table class="table table-bordered bg-light table-hover table-sm id='table-id'">
                                    <thead id="thead" style="font-weight: 600; color:lightblue;"></thead>
                                    <tbody id="tbody" style="font-weight: 400; font-size:14px"></tbody>
                                </table>
                                </div>
                                <label for="iva" style="font-weight:700; color:lightblue;">Total BsS</label>
                                <input class="form-control d-inline" style="width: 200px;font-size:14px" type="number" readonly="readonly" id="bs">
                                <label for="total" style="font-weight:700; color:lightblue;">Total USD</label>
                                <input class="form-control d-inline" style="width: 200px;font-size:14px" type="number" readonly="readonly" id="usd">                            
                                <button class="btn btn-primary" id="pdf1">Generar PDF</button>
                                <input type="hidden" id="r1f1">
                                `
            );
            let bs=0;
            let usd=0;
            let template="";
            let thead=`
            <tr class="text-center" style="font-weight: 500">
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Cedula</td>
                <td>Fecha de vencimiento</td>
                <td>Divisa</td>
                <td>Via de pago</td>
                <td>Monto</td>
                <td>Referencia</td>
            </tr>
                        `;
            console.log(clients);
            clients.forEach(client => {
                template+=  `<tr>
                                <td>${client.nombre}</td>
                                <td>${client.apellido}</td>
                                <td>${client.cedula}</td>
                                <td>${client.fechaVencimiento}</td>
                                <td>${client.divisa}</td>
                                <td>${client.viaPago}</td>
                                <td>${client.monto}</td>
                                <td>${client.referencia}</td>
                            </tr>`
                            if(client.divisa=="Bs"){
                                bs+=parseInt(client.monto)
                            }else{
                                usd+=parseInt(client.monto)
                            }
            });
            console.log("Dolares: " + usd);
            console.log("Bs: " + bs);
            $("#r1f1").val(fecha);
            $("#usd").val(usd);
            $("#bs").val(bs);
            $("#thead").html(thead);
            $("#tbody").html(template);
            $("#content").show();
            $("#opcion").html('');
            $("#data").html('');
            $("#report").hide();
            $("#unpay").hide();
            
        
        })
    }
    
    
    });

    $(document).on('click', '#btnReporte2', function(){
        
        if($("#mes").val()=="0" || $("#dia").val()=="0" || $("#mes2").val()=="0" || $("#dia2").val()=="0"){
            alert('Error. La fecha ingresada es invalida.');
        }else{
            let date1 = new Date($("#año").val(), parseInt($("#mes").val())-1, $("#dia").val());
            let date2 = new Date($("#año2").val(), parseInt($("#mes2").val())-1, $("#dia2").val());
            if(date1 > date2){
                alert("Error. La fecha de inicio no puede ser mayor que la del final.");
            }else{
                let fecha=$("#año").val() + "-" + $("#mes").val() + "-" + $("#dia").val();
                let fecha2=$("#año2").val() + "-" + $("#mes2").val() + "-" + $("#dia2").val();
                console.log(fecha);
                console.log(fecha2);
                let data={
                    tipo:2,
                    fecha:fecha,
                    fecha2:fecha2
                };
            $.get('report-pay.php', data, function(response){
                clients = JSON.parse(response);
                $("#body").html(`<table class="table table-bordered bg-light table-hover table-sm">
                                        <thead id="thead" style="font-weight: 600; color:lightblue;"></thead>
                                        <tbody id="tbody" style="font-weight: 400; font-size:14px"></tbody>
                                    </table>
                                    <label for="iva" style="font-weight:700; color:lightblue;">Total BsS</label>
                                    <input class="form-control d-inline" style="width: 200px;font-size:14px" type="number" readonly="readonly" id="bs">
                                    <label for="total" style="font-weight:700; color:lightblue;">Total USD</label>
                                    <input class="form-control d-inline" style="width: 200px;font-size:14px" type="number" readonly="readonly" id="usd">                            
                                    <button class="btn btn-primary" id="pdf2">Generar PDF</button>
                                    <input type="hidden" id="r2f1">
                                    <input type="hidden" id="r2f2">
                                    `
                );
                let bs=0;
                let usd=0;
                let template="";
                let thead=`
                <tr class="text-center" style="font-weight: 500">
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Cedula</td>
                    <td>Fecha de vencimiento</td>
                    <td>Divisa</td>
                    <td>Via de pago</td>
                    <td>Monto</td>
                    <td>Referencia</td>
                </tr>
                            `;
                console.log(clients);
                clients.forEach(client => {
                    template+=  `<tr>
                                    <td>${client.nombre}</td>
                                    <td>${client.apellido}</td>
                                    <td>${client.cedula}</td>
                                    <td>${client.fechaVencimiento}</td>
                                    <td>${client.divisa}</td>
                                    <td>${client.viaPago}</td>
                                    <td>${client.monto}</td>
                                    <td>${client.referencia}</td>
                                </tr>`
                                if(client.divisa=="Bs"){
                                    bs+=parseInt(client.monto)
                                }else{
                                    usd+=parseInt(client.monto)
                                }
                });
                console.log("Dolares: " + usd);
                console.log("Bs: " + bs);
                $("#r2f1").val(fecha);
                $("#r2f2").val(fecha2);
                $("#usd").val(usd);
                $("#bs").val(bs);
                $("#thead").html(thead);
                $("#tbody").html(template);
                $("#content").show();
                $("#opcion").html('');
                $("#data").html('');
                $("#report").hide();
                $("#unpay").hide();
            
            })
            }
            
        }
        
        
        });


    $(document).on('click', '#btnReporte3', function(){

        if ($("#client-id").val()!="") {
            let id=$("#client-id").val();
        let template="";
        $.get('../client/pay-client.php', {id}, function(response){
            console.log(response);
            let pays=JSON.parse(response);
            pays.forEach(element => {
               
                    template+=`
                    <tr pay-id="${element.id}">
                    <td>${element.monto}</td>
                    <td>${element.metodo}</td>
                    <td>${element.fechaPago}</td>
                    <td>${element.fechaVencimiento}</td>
                    </tr>
                    `
                
            });
            $("#cliente").html(pays[0].nombre);
            $("#tbody-pay").html(template);
            $("#idcliente").val(id);
            $("#opcion").html('');
            $("#data").html('');
            $("#report").hide();
            $("#ClienteEntrenador").hide();
            $("#reporteCliente").show();
            $("#unpay").hide();
        })
        }else{
            alert("Debe seleccionar un cliente para poder continuar.");
        }

    });

    $(document).on('click', '#btnReporte4', function(){
        let cedula=$("#letra").val() + $("#cedula").val();
        $.get('./data-client.php', {cedula}, function(response){
            let data=JSON.parse(response);
            console.log(data);
            
            if(data.length==0){
                alert("No existe un cliente con la cedula ingresada.");
            }else{
                $("#cliente1").html(data[0].nombre);
                $("#cedula2").html(data[0].cedula);
                $("#fechaPago2").html(data[0].fechaPago);
                $("#fechaVencimiento2").html(data[0].fechaVencimiento);
                $("#monto2").html(data[0].monto);
                $("#tiempo2").html(data[0].tiempo);
                $("#metodo2").html(data[0].viaPago);
                $("#divisa2").html(data[0].divisa);
                $("#referencia2").html(data[0].referencia);
                $("#cedula").val('');
                $("#letra").val('V-');
                $("#info-cliente").show();
                $("#cedulacliente").val(cedula);
                $("#opcion").html('');
                $("#data").html('');
                $("#report").hide();
                $("#reporteCliente").hide();
                $("#ClienteEntrenador").hide();
                $("#unpay").hide();
            }
            
            
            
        })
    });

    $(document).on('click', '#btnReporte5', function(){
        template="";
        $.get('client-unpay.php', {}, function(response){
            let clients = JSON.parse(response);
            clients.forEach(cliente => {
                template+=`
                    <tr><td>${cliente.nombre}</td>
                        <td>${cliente.cedula}</td>
                        <td>${cliente.fechaVencimiento}</td></tr>
                `;
            });
            $("#client-unpay").html(template);
        });
        $("#info-cliente").hide();
        $("#opcion").html('');
        $("#data").html('');
        $("#report").hide();
        $("#reporteCliente").hide();
        $("#ClienteEntrenador").hide();
        $("#unpay").show();
    });

    $(document).on('click', '#btnReporte6', function(){
        let cedula=$("#letra").val() + $("#cedula").val();
        $.get('report-training-client.php', {cedula}, function(response){
            
            if(response=="404"){
                alert("El entrenador no existe o no tiene clientes asociados.")
            }else{
                let template="";
                let clients = JSON.parse(response);
                console.log(clients);
                clients.forEach(element => {
                    template+=`<tr>
                    <td>${element.nombre}</td>
                    <td>${element.cedula}</td>
                    <td>${element.divisa}</td>
                    <td>${element.tarifa}</td>
                    <td>${element.vencimiento}</td>
                    </tr>
                    `
                });
                $("#clientes").html(template);
            }
        });
        $("#cedulaentrenador").val(cedula);
        $("#ClienteEntrenador").show();
        $("#info-cliente").hide();
        $("#opcion").html('');
        $("#data").html('');
        $("#report").hide();
        $("#reporteCliente").hide();
        $("#unpay").hide();
    })

    $(document).on('click', '#closemodal', function(){
        $("#report").hide();
    });

    $(document).on('change', '#tipoReporte', function(){
        let tipo=parseInt($("#tipoReporte").val());
        let template="";
        if (tipo==0) {
            $("#opcion").html('');
        }else if(tipo==1){
            template=`  <select class="form-control" id="opcionReporte">
                            <option value="0">Seleccione una opción</option>
                            <option value="1">Pagos por dia</option>
                            <option value="2">Pagos por rango de fecha</option>
                            <option value="3">Pagos por cliente</option>
                        </select>`;
        }else if(tipo==2){
            template=`  <select class="form-control" id="opcionReporte">
                            <option value="0">Seleccione una opción</option>
                            <option value="4">Datos de cliente</option>
                            <option value="5">Clientes insolventes</option>
                            <option value="8">Listado de clientes</option>
                        </select>`;
        }else if (tipo==3) {
            template=`  <select class="form-control" id="opcionReporte">
                            <option value="0">Seleccione una opción</option>
                            <option value="6">Relación entrenador-cliente</option>
                            <option value="7">Listado de entrenadores</option>
                        </select>`;            
        }
        $("#opcion").html(template);
        $("#body").html('');
        $("#data").html('');
        $("#content").hide();
        $("#reporteCliente").hide();
    });

    $(document).on('change', "#opcionReporte", function(){
        let opcion=parseInt($("#opcionReporte").val());
        let template="";
        html="";
        if(opcion==0){
            $("#data").html('');
        }else if(opcion==1){
            html=`<div class="form-group" id="fecha">
            <label for="mes" class="display-5" style="color: white;">Fecha:</label><br>
            <select id="año" class="form-control d-inline" style="width: 12%;">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
            <select id="mes" class="form-control d-inline" style="width: 20%;">
                <option value="0">Mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
            </select>
            <select id="dia" class="form-control d-inline" style="width: 10%;;">
                <option value="0">Dia</option>
            </select>
            <button class="btn btn-success" id="btnReporte1">Generar</button>
            
    </div>`;
        }else if(opcion==2){
            html=`<div class="form-group" id="fecha">
            <label for="mes" class="display-5" style="color: white;">Fecha:</label><br>
            <select id="año" class="form-control d-inline" style="width: 12%;">
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            </select>
            <select id="mes" class="form-control d-inline" style="width: 20%;">
                <option value="0">Mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
            </select>
            <select id="dia" class="form-control d-inline" style="width: 10%;;">
                <option value="0">Dia</option>
            </select>
            </div>
            <div class="form-group" id="fecha2">
            <label for="mes2" class="display-5" style="color: white;">Fecha:</label><br>
            <select id="año2" class="form-control d-inline" style="width: 12%;">
                <option value="2019">2019</option>
                <option value="2019">2020</option>
                <option value="2019">2021</option>
                <option value="2019">2022</option>
            </select>
            <select id="mes2" class="form-control d-inline" style="width: 20%;">
                <option value="0">Mes</option>
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
            </select>
            <select id="dia2" class="form-control d-inline" style="width: 10%;;">
                <option value="0">Dia</option>
            </select>
            </div>
            <button class="btn btn-success" id="btnReporte2">Generar</button>`;
        }else if (opcion==3) {
            html=`  <div class="form-group">
                        <span class="format">Selecciona un cliente</span><br>
                        <input type="text" id="client-id" class="text-center form-control d-inline" readonly="readonly" style="width: 90px" required>
                        <input type="text" id="client-nombre" class="form-control d-inline" readonly="readonly" style="width: 300px" required>
                        <a href="#client-list" data-toggle="modal" class="btn btn-primary d-inline" id="btnCliente" data-dismiss="modal" aria-hidden="true"> ... </a><br>
                    </div>
                    <button class="btn btn-success" id="btnReporte3">Generar</button>
                    `;
        }else if(opcion==4){
            html=`  <div class="form-group">
                        <select id="letra" class="form-control d-inline" style="width: 7%">
                            <option value="V-">V-</option>
                            <option value="E-">E-</option>
                        </select>
                        <input type="text"  class="form-control d-inline" placeholder="Cedula" id="cedula" style="width: 92%" maxlength="9" required pattern="[0-9]{7,9}">
                        <span class="format">Ej: '24623748'</span>
                    </div>
                    <button class="btn btn-success" id="btnReporte4">Generar</button>
            `
        }else if (opcion==5) {
            
            html=`
            <br><div class="form-group"><button class="btn btn-success" id="btnReporte5">Generar</button></div>
            `
            
            
        }else if (opcion==6) {
            html=`  <div class="form-group">
                        <select id="letra" class="form-control d-inline" style="width: 7%">
                            <option value="V-">V-</option>
                            <option value="E-">E-</option>
                        </select>
                        <input type="text"  class="form-control d-inline" placeholder="Cedula" id="cedula" style="width: 92%" maxlength="9" required pattern="[0-9]{7,9}">
                        <span class="format">Ej: '24623748'</span>
                    </div>
                    <button class="btn btn-success" id="btnReporte6">Generar</button>
            `            
        }else if(opcion==7){
            html="<br><br><button class='btn btn-primary' id='pdf7'>Listado de entrenadores</button>";
        }else if(opcion==8){
            html="<br><br><button class='btn btn-primary' id='pdf8'>Listado de clientes</button>";
        }

        $("#data").html(html);
        $("#body").html('');
        $("#content").hide();
    });

    $(document).on('click', '#pdf1', function(){
        window.open('pdf1.php?fecha=' + $("#r1f1").val() + '&usd=' + $("#usd").val() + '&bs=' + $("#bs").val() + '&access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf2', function(){
        window.open('pdf2.php?fecha=' + $("#r2f1").val() + '&fecha2=' + $("#r2f2").val() + '&usd=' + $("#usd").val() + '&bs=' + $("#bs").val() + '&access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf3', function(){
        window.open('pdf3.php?id=' +$("#idcliente").val() + '&access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf4', function(){
        window.open('pdf4.php?cedula=' +$("#cedulacliente").val() + '&access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf5', function(){
        window.open('pdf5.php?access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf6', function(){
        window.open('pdf6.php?cedula=' + $("#cedulaentrenador").val() + '&access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf7', function(){
        window.open('pdf7.php?access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
    });

    $(document).on('click', '#pdf8', function(){
        window.open('pdf8.php?access=true', '_blank', "toolbar=yes, location=no, directories=no, status=no, menubar=no, scrollbars=no, resisable=no, copyhistory=yes, wdith=1024, height=800");
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

    $(document).on('click', '.btnClient', function() {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('idclient');
        $.get('../client/client-single.php', {id}, function(response) {
            let client = JSON.parse(response);
            $("#client-id").val(client[0].id);
            $("#client-nombre").val(client[0].nombre + " " + client[0].apellido);
        });
        $("#client-valor").val('');
        fetchClient();
    })

    $(document).on('click', '#closeCliente', function(){
        $("#reporteCliente").hide();
    })

    $(document).on('click', '#closeunpay', function(){
        $("#unpay").hide();
    })

    $(document).on('click', '#close-info', function(){
        $("#info-cliente").hide();
    })

    $(document).on('click', '#closeTraining', function(){
        $("#ClienteEntrenador").hide();
        $("#clients").html('');
    });
});
