<?php
require("../resources/scripts/conexion.php");

if (!isset($_POST['textosql'])) {
    echo (var_dump($_POST['textosql']));
    die();
}
$sentencias = $_POST['textosql'];
try {
  
if (mysqli_multi_query($conn, $sentencias)) {
    echo "Restaurado correcto";
}
else{
    echo "Todo mal";
    die();
}
    
} catch (\Throwable $th) {
    echo $th;
    die();
}
?>