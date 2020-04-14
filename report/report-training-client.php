<?php
include '../resources/scripts/conexion.php';
$cedula=$_GET["cedula"];
$query="SELECT entrenador.nombre AS 'entrenador', cliente.nombre, cliente.apellido, cliente.cedula, entrenador_cliente.tarifa, divisa.divisa, entrenador_cliente.vencimiento FROM entrenador INNER JOIN entrenador_cliente ON entrenador_cliente.idEntrenador=entrenador.id INNER JOIN cliente ON entrenador_cliente.idCliente=cliente.id INNER JOIN divisa ON entrenador_cliente.idDivisa=divisa.id WHERE entrenador.cedula='$cedula' ORDER BY entrenador_cliente.vencimiento DESC";
$result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
$json=[];
while ($row=mysqli_fetch_array($result)) {
    $json[]=array(
        "nombre"=>$row['nombre'] . " " .  $row['apellido'],
        "tarifa"=>$row['tarifa'],
        "divisa"=>$row['divisa'],
        "cedula"=>$row['cedula'],
        "vencimiento"=>$row['vencimiento']
    );

}

if(count($json)==0){
    echo '404';
}else{
    echo json_encode($json);
}

?>