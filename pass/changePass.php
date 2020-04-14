<?php
include '../resources/scripts/conexion.php';
$user = $_POST['user'];
$tipo = $_POST['tipo'];
$pass="";
if(isset($_POST['password'])){
    $pass=base64_encode($_POST['password']);
}

$query="UPDATE usuario SET pass='$pass', intento=0 WHERE user='$user'";
$result=mysqli_query($conn, $query) or die("Ha ocurrido un error en la actualización. #". mysqli_errno($conn));
if ($result) {
    echo true;
}else {
    echo "Ha ocurrido un error en la actualización. #". mysqli_errno($conn);
}

?>