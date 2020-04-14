<?php
include '../resources/scripts/conexion.php';
$user = $_POST['user'];
$pass = $_POST['pass'];
$nivel = $_POST['nivel'];
$pregunta1 = $_POST['pregunta1'];
$respuesta1 = $_POST['respuesta1'];
$pregunta2 = $_POST['pregunta2'];
$respuesta2 = $_POST['respuesta2'];

if(!empty($user) and !empty($pass)){
    $id=0;
    $password=base64_encode($pass);
    $query="INSERT INTO usuario(user, pass, fecha) VALUES('$user', '$password', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY))";
    $result=mysqli_query($conn, $query);
    if ($result) {
        $query="SELECT id FROM usuario ORDER BY id DESC LIMIT 1";
        $result2=mysqli_query($conn, $query);
        while ($row=mysqli_fetch_array($result2)) {
            $id=$row['id'];
        }
        $query="INSERT INTO nivel_usuario(idUsuario, idNivel) VALUES($id, $nivel)";
        $result3=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
        $query="INSERT INTO respuesta(respuesta, idUsuario, idPregunta) VALUES('$respuesta1', $id, $pregunta1), ('$respuesta2', $id, $pregunta2)";
        $result4=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
    }


    if(!$result){
        if (mysqli_errno($conn)==1062) {
            echo "Error #" . mysqli_errno($conn) . ": El usuario registrado ya existe.";
        }else {
            echo 'Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn);
        }
    }else{
        echo true;
    }
}else{
    echo false;
}


?>