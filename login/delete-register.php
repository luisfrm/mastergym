<?php
include '../resources/scripts/conexion.php';

$query="DELETE FROM olddata WHERE fecha<CURRENT_DATE";
$result = mysqli_query($conn, $query);

if ($result) {
    echo "Eliminación de registros correcta.";
} else {
    echo "Ha ocurrido un error con la eliminación de registros #" . mysqli_errno($result) . ": " . mysqli_error($result);
}




?>