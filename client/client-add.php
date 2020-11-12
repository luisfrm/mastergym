<?php
include '../resources/scripts/conexion.php';
$producto = $_POST['producto'];
$serial = $_POST['serial'];
$categoria = $_POST['categoria'];
$ubicacion = $_POST['ubicacion'];
$descripcion = $_POST['descripcion'];
/*$nameFile = $_FILES['archivo']['name'];
$typeFile = $_FILES['archivo']['type'];
$sizeFile = $_FILES['archivo']['size'];
$folder = $_SERVER['DOCUMENT_ROOT'] . "/uploads/";
move_uploaded_file($_FILES['archivo'].['tmp_name'], $folder . $nameFile);*/
echo $_SERVER['DOCUMENT_ROOT'];
if(!empty($producto) and !empty($serial) and !empty($categoria)){
    
    $query="INSERT INTO cliente(producto, serial, categoria, descripcion, ubicacion, link) VALUES('$producto', '$serial', '$categoria', '$descripcion', '$ubicacion')";
    $result=mysqli_query($conn, $query);

    if($result){
        echo true;
    }else{
        echo mysqli_error($conn);
    }
}

?>