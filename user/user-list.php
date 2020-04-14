<?php
include '../resources/scripts/conexion.php';

$query="SELECT usuario.id, usuario.user, usuario.pass, nivel.cargo FROM usuario INNER JOIN nivel_usuario ON idUsuario=usuario.id INNER JOIN nivel ON nivel.id=nivel_usuario.idNivel ORDER BY nivel.cargo";
$result=mysqli_query($conn, $query);
$json=array();
if($result){
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            "id"=>$row['id'],
            "user"=>$row['user'],
            "pass"=>$row['pass'],
            "cargo"=>$row['cargo'],
        );
    }
}

echo json_encode($json);
?>