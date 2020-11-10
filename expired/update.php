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
    } else {
        echo "Un error ha ocurrido. #" . mysqli_errno($result) . ": " . mysqli_error($result);
    }
} else {
    echo "Ha ocurrido un error";
}
?>