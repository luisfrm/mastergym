<?php
include '../resources/scripts/conexion.php';
$id=$_POST['id'];

if(isset($id)){
    $query="DELETE FROM usuario WHERE id=$id";
    $result=mysqli_query($conn, $query) or die("Ha ocurrido un error. #".mysqli_errno($conn) . " " . mysqli_error($conn));
    echo true;

}

?>