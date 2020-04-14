<?php
include '../resources/scripts/conexion.php';
$query="SELECT * FROM cliente ORDER BY id DESC LIMIT 1";
$resultado=mysqli_query($conn, $query);
$id=0;
$json=[];
if($row=mysqli_fetch_array($resultado)){
    $id=$row['id'];
}

for($i=1; $i <= $id; $i++) { 
    $query="SELECT cliente.nombre, cliente.apellido, cliente.cedula, pago_cliente.fechaVencimiento FROM cliente INNER JOIN pago_cliente ON pago_cliente.idCliente=cliente.id WHERE cliente.id=$i and pago_cliente.fechaVencimiento < current_date() ORDER BY pago_cliente.fechaVencimiento DESC LIMIT 1";
    $resultado=mysqli_query($conn, $query);

    if($row=mysqli_fetch_array($resultado)){
        $json[]=array(
            "nombre"=>($row["nombre"] . " " . $row["apellido"]),
            "cedula"=>$row["cedula"],
            "fechaVencimiento"=>$row["fechaVencimiento"]
        );
    }
}

echo json_encode($json);

?>