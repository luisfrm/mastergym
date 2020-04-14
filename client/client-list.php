<?php
include '../resources/scripts/conexion.php';

$query = "SELECT * FROM cliente";
$json=[];
if(isset($_GET['tipo'])){
    if($_GET['tipo']==1){
        $query = "SELECT * FROM cliente LIMIT 7";
        if(isset($_GET['campo']) && isset($_GET['valor'])){
            $campo=$_GET['campo'];
            $valor=$_GET['valor'];
            $query = "SELECT * FROM cliente WHERE $campo LIKE '%$valor%'";
        }
    }
}
$result = mysqli_query($conn, $query);

if (!$result) {
    die("An error ocurred in the query.");
}
while ($row=mysqli_fetch_array($result)) {
    $json[]=array(
        'id'=>$row['id'],
        'nombre'=>$row['nombre'],
        'apellido'=>$row['apellido'],
        'cedula'=>$row['cedula'],
        'telefono'=>$row['telefono'],
        'direccion'=>$row['direccion'],
        'correo'=>$row['correo']
    );
}
Echo json_encode($json);
?>