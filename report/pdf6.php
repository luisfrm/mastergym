<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';

if (isset($_GET['access']) and $_GET['access']=='true') {
    $cedula=$_GET["cedula"];
    $query="SELECT entrenador.nombre AS 'entrenador', cliente.nombre, cliente.apellido, cliente.cedula, entrenador_cliente.tarifa, divisa.divisa, entrenador_cliente.vencimiento FROM entrenador INNER JOIN entrenador_cliente ON entrenador_cliente.idEntrenador=entrenador.id INNER JOIN cliente ON entrenador_cliente.idCliente=cliente.id INNER JOIN divisa ON entrenador_cliente.idDivisa=divisa.id WHERE entrenador.cedula='$cedula' ORDER BY entrenador_cliente.vencimiento DESC";
    $result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
    $json=[];
    while ($row=mysqli_fetch_array($result)) {
        $json[]=array(
            "nombre"=>$row['nombre'] . " " .  $row['apellido'],
            "entrenador"=>$row['entrenador'],
            "tarifa"=>$row['tarifa'],
            "cedula"=>$row['cedula'],
            "divisa"=>$row['divisa'],
            "vencimiento"=>$row['vencimiento']
        );
    
    }
    
    $pdf = new PDF('L', 'mm', 'A4');
    $pdf->AddPage();
    $pdf->Cell(100, 10, "Entrenador " . $json[0]['entrenador'], 0, 1, 'C', 0);
    $pdf->Ln(5);
    
    $pdf->SetX(25);
    $pdf->SetFillColor(232,232,232);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(45, 6, 'Nombre', 1,0,'C',1);
    $pdf->Cell(45, 6, 'Cedula', 1,0,'C',1);
    $pdf->Cell(45, 6, 'Divisa', 1,0,'C',1);
    $pdf->Cell(45, 6, 'Tarifa', 1,0,'C',1);
    $pdf->Cell(45, 6, 'Vencimiento', 1,1,'C',1);
    
    $pdf->SetFont('Arial', '', 10);
    foreach ($json as $key => $value) {
        $pdf->SetX(25);
        $pdf->Cell(45, 6, $value['nombre'], 1,0,'C',1);
        $pdf->Cell(45, 6, $value['cedula'], 1,0,'C',1);
        $pdf->Cell(45, 6, $value['divisa'], 1,0,'C',1);
        $pdf->Cell(45, 6, $value['tarifa'], 1,0,'C',1);
        $pdf->Cell(45, 6, $value['vencimiento'], 1,1,'C',1);
    }
    
    $pdf->output();
}
?>