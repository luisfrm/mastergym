<?php
include '../resources/scripts/conexion.php';
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

if(!empty($id) and !empty($nombre) and !empty($apellido) and !empty($cedula)){
    $query = "UPDATE cliente SET nombre='$nombre', apellido='$apellido', cedula='$cedula', direccion='$direccion', telefono='$telefono', correo='$correo' WHERE id=$id";
    $result=mysqli_query($conn, $query);

    if($result){
        echo true;
    }else{
        echo mysqli_error($conn);
    }
}


?>