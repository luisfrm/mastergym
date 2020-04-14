<?php
include '../resources/scripts/conexion.php';
$json=[];
if(isset($_GET['campo']) && isset($_GET['valor'])){
    $campo=$_GET['campo'];
    $valor=$_GET['valor'];
    $query = "SELECT usuario.id, usuario.user, usuario.pass, nivel.cargo FROM usuario INNER JOIN nivel_usuario ON idUsuario=usuario.id INNER JOIN nivel ON nivel.id=nivel_usuario.idNivel WHERE user LIKE '$valor%'";
    $result = mysqli_query($conn, $query);
    if($result){
        while($row=mysqli_fetch_array($result)){
            $json[]=array(
                "id"=>$row['id'],
                "user"=>$row['user'],
                "pass"=>$row['pass'],
                "cargo"=>$row['cargo']
            );
        };
    };
}
    echo json_encode($json);
?>