<?php
include '../resources/scripts/conexion.php';
$monto = $_POST['monto'];
$fechaPago = $_POST['fechaPago'];
$fechaVencimiento = $_POST['fechaVencimiento'];
$referencia = $_POST['referencia'];
$divisa = $_POST['divisa'];
$viaPago = $_POST['viaPago'];
$idCliente = $_POST['idCliente'];

//echo "monto: $monto, tiempo: $tiempo, fechaPago: $fechaPago, fechaVencimiento: $fechaVencimiento, referencia: $referencia, divisa: $divisa, viaPago: $viaPago, idCliente: $idCliente";


if (!empty($monto) and !empty($fechaPago) and !empty($divisa) and !empty($fechaVencimiento) and !empty($viaPago) and !empty($idCliente)) {
    $query = "INSERT INTO pago(monto, fechaPago, fechaIngreso, referencia) VALUES($monto, '$fechaPago', CURRENT_DATE(), '$referencia')";
    $result = mysqli_query($conn, $query);
    if($result){

        $query = "SELECT id FROM pago ORDER BY id DESC LIMIT 1";
        $result = mysqli_query($conn, $query);
        while ($row=mysqli_fetch_array($result)) {
            $idPago=$row['id'];
        }

        $query = "INSERT INTO pago_cliente(fechaVencimiento, idPago, idCliente, idDivisa, idMetodo) VALUES('$fechaVencimiento', $idPago, $idCliente, $divisa, $viaPago)";
        $result = mysqli_query($conn, $query);
        if($result){
            echo true;
        }else {
            echo false;
        }
    }else{
        echo mysqli_error($conn);
    }
} else {
    echo 'Faltan datos para completar el registro';
}



?>