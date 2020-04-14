<?php
include '../resources/scripts/conexion.php';
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$cedula = $_POST['cedula'];
$numCuenta = $_POST['numCuenta'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$correo = $_POST['correo'];

if(!empty($id) and !empty($nombre) and !empty($cedula)){
    $query = "UPDATE entrenador SET nombre='$nombre', numCuenta='$numCuenta', cedula='$cedula', direccion='$direccion', telefono='$telefono', correo='$correo' WHERE id=$id";
    $result=mysqli_query($conn, $query);

    if($result){
        echo true;
    }else{
        //echo mysqli_error($conn);
        echo $query;
    }
}


?>