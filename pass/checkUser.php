<?php
include '../resources/scripts/conexion.php';
$user = $_GET['user'];
$tipo = $_GET['tipo'];
$pass="";

if(isset($_GET['pass'])){
    $pass=base64_encode($_GET['pass']);
}
$json=[];
$json2=[];
$query="SELECT usuario.id, usuario.user, usuario.pass, nivel.id as 'permiso' FROM usuario INNER JOIN nivel_usuario ON idUsuario=usuario.id INNER JOIN nivel ON nivel.id=nivel_usuario.idNivel WHERE usuario.user='$user'";
$result = mysqli_query($conn, $query) or die('Ha habido un error en la consulta: #'.mysqli_errno($conn) . ': ' . mysqli_error($conn));

    while($row = mysqli_fetch_array($result)) {
        $query2="SELECT pregunta.id, respuesta.respuesta from usuario INNER JOIN respuesta ON respuesta.idUsuario=usuario.id 
        INNER JOIN pregunta ON pregunta.id = respuesta.idPregunta WHERE usuario.user='$user'";
        $result2=mysqli_query($conn, $query2) or die('Ha habido un error en la consulta: #'.mysqli_errno($conn) . ': ' . mysqli_error($conn));
        while ($row2=mysqli_fetch_array($result2)) {
            $json2[]=array(
                "id"=>$row2['id'],
                "respuesta"=>$row2['respuesta']
            );
        }
        if ($tipo==1) {
            $json[0]=array(
                "id"=>$row['id'],
                "user"=>$row['user'],
                "pregunta1"=>$json2[0]['id'],
                "pregunta2"=>$json2[1]['id'],
            );
        }elseif ($tipo==2) {
            $json[0]=array(
                "respuesta1"=>$json2[0]['respuesta'],
                "respuesta2"=>$json2[1]['respuesta']
            );
        }
    };

    echo json_encode($json);



?>