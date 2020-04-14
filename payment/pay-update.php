<?php
    include '../resources/scripts/conexion.php';
    $id = $_POST['id'];
    $idPago = $_POST['idPago'];
    $monto = $_POST['monto'];
    $fechaPago = $_POST['fechaPago'];
    $fechaVencimiento = $_POST['fechaVencimiento'];
    $referencia = $_POST['referencia'];
    $divisa = $_POST['divisa'];
    $metodo = $_POST['viaPago'];
    $idCliente = $_POST['idCliente'];
if(!empty($id) and !empty($monto) and !empty($fechaPago) and !empty($fechaVencimiento) and !empty($divisa) and !empty($metodo) and !empty($idCliente) and !empty($idPago)){
    $query="UPDATE pago_cliente SET fechaVencimiento='$fechaVencimiento', idCliente=$idCliente, idDivisa=$divisa, idMetodo=$metodo WHERE id=$id";
    $result = mysqli_query($conn, $query);
    if($result){
        $query2="UPDATE pago SET monto=$monto, fechaPago='$fechaPago', referencia='$referencia' WHERE id=$idPago";
        $result2 = mysqli_query($conn, $query2);
        if ($result2) {
            echo true;
        }else{
            echo mysqli_error($conn);
        }
    }else {
        echo mysqli_error($conn);
    }
    
}else{
    echo "La solicitud no ha podido ser procesada.";
}
?>