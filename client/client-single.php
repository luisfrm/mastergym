<?php
include '../resources/scripts/conexion.php';
$id = $_GET['id'];

if(!empty($id)){
    $query="SELECT * FROM cliente WHERE id=$id";
    $result=mysqli_query($conn, $query);
    $json=array();
    while ($row=mysqli_fetch_array($result)) {
        $json[]=array(
            'id'=>$row['id'],
            'nombre'=>$row['nombre'],
            'apellido'=>$row['apellido'],
            'cedula'=>$row['cedula'],
            'telefono'=>$row['telefono'],
            'direccion'=>$row['direccion'],
            'correo'=>$row['correo']
        );
    };

    $jsonString = json_encode($json);
    echo $jsonString;
}



?>