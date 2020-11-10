<?php
include '../resources/scripts/conexion.php';
$user = $_GET['user'];
$json=[];
$query="SELECT usuario.id, usuario.user, usuario.pass, nivel.id as 'permiso', intento FROM usuario INNER JOIN nivel_usuario ON idUsuario=usuario.id INNER JOIN nivel ON nivel.id=nivel_usuario.idNivel WHERE usuario.user='$user'";
$result = mysqli_query($conn, $query) or die('Ha habido un error en la consulta: #'.mysqli_errno($conn) . ': ' . mysqli_error($conn));

    while($row = mysqli_fetch_array($result)) {
        $json[0]=array(
            "id"=>$row['id'],
            "user"=>$row['user'],
            "permiso"=>$row['permiso']
        );
    };

    echo json_encode($json);
?>