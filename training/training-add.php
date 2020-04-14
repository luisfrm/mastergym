<?php
include '../resources/scripts/conexion.php';
$nombre = $_POST['nombre'];
$cedula = $_POST['cedula'];
$numCuenta = $_POST['numCuenta'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$correo = $_POST['correo'];

if(!empty($nombre) and !empty($cedula)){
    
    $query="INSERT INTO entrenador(nombre, numCuenta, cedula, telefono, direccion, correo) VALUES('$nombre', '$numCuenta', '$cedula', '$telefono', '$direccion', '$correo')";
    $result=mysqli_query($conn, $query);

    if($result){
        echo true;
    }else{
        echo mysqli_error($conn);
    }
}

?>