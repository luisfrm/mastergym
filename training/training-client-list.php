<?php
include '../resources/scripts/conexion.php';
$id=$_GET["id"];
$query="SELECT entrenador_cliente.id, cliente.nombre, cliente.apellido, entrenador_cliente.tarifa, divisa.divisa, entrenador_cliente.vencimiento FROM entrenador INNER JOIN entrenador_cliente ON entrenador_cliente.idEntrenador=entrenador.id INNER JOIN cliente ON entrenador_cliente.idCliente=cliente.id INNER JOIN divisa ON entrenador_cliente.idDivisa=divisa.id WHERE entrenador.id=$id ORDER BY entrenador_cliente.vencimiento DESC";
$result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
$json=[];
while ($row=mysqli_fetch_array($result)) {
    $json[]=array(
        "nombre"=>$row['nombre'] . " " .  $row['apellido'],
        "tarifa"=>$row['tarifa'],
        "id"=>$row['id'],
        "divisa"=>$row['divisa'],
        "vencimiento"=>$row['vencimiento']
    );

}

echo json_encode($json);

?>