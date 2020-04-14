<?php
include '../resources/scripts/conexion.php';
if(!empty($_POST['user']) and !empty($_POST['pass'])){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $intento=0;
    $pass=base64_encode($pass);
   $query="SELECT usuario.user FROM usuario WHERE usuario.user='$user' LIMIT 1";
   $userExist=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));
   $usuarios=[];

   if($userExist){
       while ($row=mysqli_fetch_array($userExist)) {
           $usuarios[]=array(
               "user"=>$row['user']
           );
       }

       if(count($usuarios)>0){
            $query="SELECT usuario.user, usuario.intento, nivel_usuario.idNivel FROM usuario INNER JOIN nivel_usuario ON nivel_usuario.idUsuario=usuario.id WHERE usuario.user='$user' AND usuario.pass='$pass' LIMIT 1";
            $passIsCorrect=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));

            if($passIsCorrect){
                $usuarios=[];
                while ($row=mysqli_fetch_array($passIsCorrect)) {
                    $usuarios[]=array(
                        "user"=>$row['user'],
                        "intento"=>$row['intento'],
                        "nivel"=>$row['idNivel']
                    );
                }
                if(count($usuarios)>0){

                    //COMPROBAMOS SI EL USUARIO ESTÁ BLOQUEADO.
                    $intento=[];
                    $query="SELECT intento FROM usuario WHERE user='$user' LIMIT 1";
                    $userIsBlock=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));
                    while ($row=mysqli_fetch_array($userIsBlock)) {
                        $intento[]=array(
                            "intento"=>$row["intento"]
                        );
                    }
                    $attemp=$intento[0]['intento'];
                    //----------------------------------------------------------------
                    if ($attemp<3) {
                        //EN CASO DE NO ESTAR BLOQUEADO, ESTABLECEMOS EL NUMERO DE INTENTOS EN 0
                        $query="UPDATE usuario SET intento=0 WHERE user='$user'";
                        $result=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));

                        $query="SELECT fecha FROM `usuario` WHERE fecha < CURRENT_DATE AND user='$user'";
                        $rows=[];
                        $result=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));
                        while ($row=mysqli_fetch_array($result)) {
                            $rows[]=array(
                                "fecha"=>$row["fecha"]
                            );
                        }
                            if (count($rows)>0) {
                               echo "#405";
                            } else {
                                echo json_encode($usuarios); //OPERACION EXITOSA
                            }
                            

                    }else{
                        echo "#401";
                    }
                }else {
                    //COMPROBAMOS LOS INTENTOS DEL USUARIO.
                    $intento=[];
                    $query="SELECT intento FROM usuario WHERE user='$user' LIMIT 1";
                    $userIsBlock=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));
                    //ALMACENAMOS LOS INTENTOS EN UNA VARIABLE.
                    while ($row=mysqli_fetch_array($userIsBlock)) {
                        $intento[]=array(
                            "intento"=>$row["intento"]
                        );
                    }
                    $attemp=$intento[0]['intento'];
                    //INCREMENTAMOS EL VALOR Y ACTUALIZAMOS LA BASE DE DATOS.
                    $attemp=$attemp+1;
                    $query="UPDATE usuario SET intento=$attemp WHERE user='$user'";
                    $result=mysqli_query($conn, $query) or die("Ha habido un error en la consulta. #" . mysqli_errno($conn) . ": " . mysqli_error($conn));
                    if($attemp<3){
                        echo "#400"; //CONTRASEÑA INCORRECTA
                    }else{
                        echo "#401"; //USUARIO BLOQUEADO
                    }
                }
            }
       }else{
           echo "#404"; //USUARIO INVÁLIDO
       }
   }

}

?>