<?php
include '../resources/scripts/conexion.php';

$id = $_POST['id'];

if(!empty($id)){
    $query="DELETE FROM entrenador_cliente WHERE id=$id";
    $result = mysqli_query($conn, $query);

    if(!$result){
        die("An ocurred a error in the query.");
    }

    Echo "Assoc deleted succesfully.";
}



?>