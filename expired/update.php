<?php
include '../resources/scripts/conexion.php';
if (isset($_POST['user']) and isset($_POST['pass']) and isset($_POST['old'])) {
    $user=$_POST["user"];
    $pass=$_POST["pass"];
    $old=$_POST["old"];
    $id=0;
    $data=[];
    $query="SELECT id FROM usuario WHERE user='$old'";
    $result=mysqli_query($conn, $query);
    if ($result) {
        while ($row=mysqli_fetch_array($result)) {
            $id=$row['id'];
        }

        $query = "SELECT user FROM olddata WHERE idUsuario=$id and user='$user'";
        $result2=mysqli_query($conn, $query);

        if ($result2) {
            while ($row=mysqli_fetch_array($result2)) {
                $data[]=array(
                    "user"=> $row["user"]
                );
            }
                if(count($data)>0) {
                    echo "#401"; //Nombre de usuario ya existe
                } else {//

                    $query = "SELECT pass FROM olddata WHERE idUsuario=$id and pass='" . base64_encode($pass) . " '";
                    $result3=mysqli_query($conn, $query);

                    if ($result3) {
                        while ($row=mysqli_fetch_array($result3)) {
                            $data[]=array(
                                "pass"=> $row["pass"]
                            );
                        }
                            if (count($data)>0) {
                                echo "#402"; //Clave ya existe
                            } else {
                                //Begin
                                $query="UPDATE usuario SET user='$user', pass='" . base64_encode($pass) . " ', fecha=DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY) WHERE id='$id'";
                                $result=mysqli_query($conn,$query);

                                if ($result) {
                                    echo "#400"; //Operacion exitosa.
                                } else {
                                    echo "Un error ha ocurrido. #" . mysqli_errno($result) . ": " . mysqli_error($result);
                                }
                                //END
                            }

                        
                    } else {
                        echo "Un error ha ocurrido. #" . mysqli_errno($result) . ": " . mysqli_error($result);
                    }
                }//Else
                
            
        } else {
            echo "Un error ha ocurrido. #" . mysqli_errno($result) . ": " . mysqli_error($result);
        }
        

        

    } else {
        echo "Un error ha ocurrido. #" . mysqli_errno($result) . ": " . mysqli_error($result);
    }
} else {
    echo "Ha ocurrido un error";
}



?>