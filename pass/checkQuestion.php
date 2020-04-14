<?php
include '../resources/scripts/conexion.php';
if(isset($_GET['user'])){
    $user=$_GET['user'];

    $query="SELECT id FROM usuario WHERE user='$user' LIMIT 1";
    $result=mysqli_query($conn, $query);
    $json=[];
    while ($row=mysqli_fetch_array($result)) {
        $json[]=array(
            "id"=$row["id"]
        )
    }
    $query="SELECT pregunta.id from usuario INNER JOIN respuesta ON respuesta.idUsuario=usuario.id INNER JOIN pregunta ON pregunta.id = respuesta.idPregunta WHERE usuario.id='" . $json[0]['id'] . "'";
    

    


}



?>