<?php
include '../resources/scripts/conexion.php';
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$cedula = $_POST['cedula'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

if(!empty($nombre) and !empty($apellido) and !empty($cedula)){
    
    $query="INSERT INTO cliente(nombre, apellido, cedula, telefono, direccion, correo) VALUES('$nombre', '$apellido', '$cedula', '$telefono', '$direccion', '$correo')";
    $result=mysqli_query($conn, $query);

    if($result){
        echo true;
    }else{
        echo mysqli_error($conn);
    }
}

?>