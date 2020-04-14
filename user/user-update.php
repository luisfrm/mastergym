<?php
include '../resources/scripts/conexion.php';
$id=$_POST['id'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$nivel = $_POST['nivel'];
$pregunta1 = $_POST['pregunta1'];
$respuesta1 = $_POST['respuesta1'];
$pregunta2 = $_POST['pregunta2'];
$respuesta2 = $_POST['respuesta2'];
$json=[];
if(!empty($user) and !empty($pass)){
    $password=base64_encode($pass);
    $query="UPDATE usuario SET user='$user', pass='$password', fecha=date_add(CURRENT_DATE, INTERVAL 5 DAY) WHERE id=$id";
    $result=mysqli_query($conn, $query);
    if (!$result) {
        if (mysqli_errno($conn)==1062) {
            echo "El usuario ingresado ya está registrado.";
        }else {
            echo "La base de datos ha devuelto el siguiente error => #" . mysqli_errno($conn) . ": " . mysqli_error($conn);
        }
    }else {
        $query="UPDATE nivel_usuario SET idNivel=$nivel WHERE idUsuario=$id";
        $result2=mysqli_query($conn, $query) or die("Hubo un error en la actualización de datos => #" .mysqli_errno($conn) . ": ". mysqli_error($conn));
        $query="SELECT id FROM respuesta WHERE idUsuario=$id";
        $result3=mysqli_query($conn, $query) or die("Hubo un error en la actualización de datos => #" .mysqli_errno($conn) . ": ". mysqli_error($conn));
        if($result3){
            while ($row=mysqli_fetch_array($result3)) {
                $json[]=array(
                    "id"=>$row['id']
                );
            }
            $query="UPDATE respuesta SET idPregunta=$pregunta1, respuesta='$respuesta1' WHERE id=" . $json[0]['id'];
            $query2="UPDATE respuesta SET idPregunta=$pregunta2, respuesta='$respuesta2' WHERE id=" . $json[1]['id'];
            $result4=mysqli_query($conn, $query) or die("Hubo un error en la actualización de datos1 => #" .mysqli_errno($conn) . ": ". mysqli_error($conn));
            $result4=mysqli_query($conn, $query2) or die("Hubo un error en la actualización de datos2 => #" .mysqli_errno($conn) . ": ". mysqli_error($conn));
            echo true;
            
        }
    }        

    }else {
        echo "Faltan datos por ingresar.";
    }
?>