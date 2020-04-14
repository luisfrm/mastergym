<?php
include '../resources/scripts/conexion.php';

if (isset($_GET['id'])) {
    $id=$_GET['id'];
    $query="SELECT pago.id, cliente.nombre, cliente.apellido, pago.fechaPago, pago.monto, metodo_pago.metodo,
     divisa.divisa, pago.referencia, pago_cliente.fechaVencimiento, pago.fechaIngreso FROM pago_cliente 
     INNER JOIN cliente ON cliente.id=pago_cliente.idCliente INNER JOIN pago ON pago.id = pago_cliente.idPago INNER JOIN 
     metodo_pago ON metodo_pago.id = pago_cliente.idMetodo INNER JOIN divisa ON divisa.id=pago_cliente.idDivisa WHERE
      pago_cliente.idCliente=$id ORDER BY pago_cliente.fechaVencimiento DESC";
    $result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
    $json=[];
    while ($row=mysqli_fetch_array($result)) {
        $json[]=array(
            "id"=>$row['id'],
            "nombre"=>$row['nombre'] . " " . $row['apellido'],
            "fechaPago"=>$row['fechaPago'],
            "fechaVencimiento"=>$row['fechaVencimiento'],
            "monto"=>$row['monto'],
            "metodo"=>$row['metodo']
        );
    }
    echo json_encode($json);
}
?>