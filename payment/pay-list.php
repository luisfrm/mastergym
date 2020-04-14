<?php
include '../resources/scripts/conexion.php';

$query="SELECT pago_cliente.id, cliente.nombre, cliente.apellido, cliente.cedula, pago.fechaPago, pago.monto, metodo_pago.metodo, divisa.divisa, pago.referencia, pago_cliente.fechaVencimiento, pago.fechaIngreso FROM pago_cliente INNER JOIN cliente ON cliente.id=pago_cliente.idCliente INNER JOIN pago ON pago.id = pago_cliente.idPago INNER JOIN metodo_pago ON metodo_pago.id = pago_cliente.idMetodo INNER JOIN divisa ON divisa.id=pago_cliente.idDivisa ORDER BY pago.id DESC";
$result=mysqli_query($conn, $query);
$json=[];

if($result){
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'id'=>$row['id'],
            'nombre'=>$row['nombre'],
            'apellido'=>$row['apellido'],
            'cedula'=>$row['cedula'],
            'fechaPago'=>$row['fechaPago'],
            'monto'=>$row['monto'],
            'viaPago'=>$row['metodo'],
            'fechaVencimiento'=>$row['fechaVencimiento'],
            'referencia'=>$row['referencia'],
            'divisa'=>$row['divisa']
        );
    }
    echo json_encode($json);
}else{
    echo 'Ha ocurrido un error con la consulta.';
}


?>