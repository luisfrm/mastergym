<?php
include '../resources/scripts/conexion.php';

$id = $_POST['id'];

if(!empty($id)){
    $query="DELETE FROM cliente WHERE id=$id";
    $result = mysqli_query($conn, $query);

    if(!$result){
        die("An ocurred a error in the query.");
    }

    Echo "Client deleted succesfully.";
}



?>