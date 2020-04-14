<?php
include '../resources/scripts/conexion.php';
$id = $_GET['id'];
$json=[];
$json2=[];
$query="SELECT usuario.id, usuario.user, usuario.pass, nivel.id as 'permiso' FROM usuario INNER JOIN nivel_usuario ON idUsuario=usuario.id INNER JOIN nivel ON nivel.id=nivel_usuario.idNivel WHERE usuario.id=$id";
$result = mysqli_query($conn, $query) or die('Ha habido un error en la consulta: #'.mysqli_errno($conn) . ': ' . mysqli_error($conn));

    while($row = mysqli_fetch_array($result)) {
        $query2="SELECT pregunta.id, respuesta.respuesta from usuario INNER JOIN respuesta ON respuesta.idUsuario=usuario.id 
        INNER JOIN pregunta ON pregunta.id = respuesta.idPregunta WHERE usuario.id=$id";
        $result2=mysqli_query($conn, $query2) or die('Ha habido un error en la consulta: #'.mysqli_errno($conn) . ': ' . mysqli_error($conn));
        while ($row2=mysqli_fetch_array($result2)) {
            $json2[]=array(
                "id"=>$row2['id'],
                "respuesta"=>$row2['respuesta']
            );
        }
        $json[0]=array(
            "id"=>$id,
            "user"=>$row['user'],
            "pass"=>$row['pass'],
            "permiso"=>$row['permiso'],
            "pregunta1"=>$json2[0]['id'],
            "respuesta1"=>$json2[0]['respuesta'],
            "pregunta2"=>$json2[1]['id'],
            "respuesta2"=>$json2[1]['respuesta']
        );
    };

    echo json_encode($json);



?>