<?php
include '../resources/scripts/conexion.php';
$id=$_POST['id'];

$query = "DELETE FROM pago WHERE id=$id";
$result = mysqli_query($conn, $query);

if($result){
    echo true;
}else{
    echo 'Ha ocurrido un error en la solicitud.';
}



?>