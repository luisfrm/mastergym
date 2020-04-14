<?php
include '../resources/scripts/conexion.php';
if (isset($_POST['vencimiento']) and isset($_POST['tarifa']) and isset($_POST['idCliente']) and isset($_POST['idEntrenador']) and isset($_POST['idDivisa'])) {
    $vencimiento=$_POST['vencimiento'];
    $tarifa=$_POST['tarifa'];
    $idCliente=$_POST['idCliente'];
    $idEntrenador=$_POST['idEntrenador'];
    $idDivisa=$_POST['idDivisa'];

    $query="INSERT INTO entrenador_cliente(vencimiento, tarifa, idEntrenador, idCliente, idDivisa) VALUES('$vencimiento', $tarifa, $idEntrenador, $idCliente, $idDivisa)";
    $result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
    echo true;
}else {
    echo "Faltan datos por ingresar";
}

?>