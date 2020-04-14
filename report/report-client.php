<?php
include '../resources/scripts/conexion.php';
$query="SELECT cliente.nombre, cliente.apellido, cliente.cedula, pago.fechaVencimiento FROM pago INNER JOIN cliente ON cliente.id=pago.idCliente where pago.fechaVencimiento < CURRENT_DATE";
$result=mysqli_query($conn, $query);
$json=[];
if($result){
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            "nombre"=>$row['nombre'],
            "apellido"=>$row['apellido'],
            "cedula"=>$row['cedula'],
            "fechaVencimiento"=>$row['fechaVencimiento']
        );
    }
}
echo json_encode($json);
?>