

<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';
if (isset($_GET['access']) and $_GET['access']=='true') {
    $query = "SELECT * FROM cliente ORDER BY apellido";
    $json=[];
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        die("An error ocurred in the query.");
    }
    while ($row=mysqli_fetch_array($result)) {
        $json[]=array(
            'id'=>$row['id'],
            'nombre'=>$row['nombre'] . ' ' . $row['apellido'],
            'cedula'=>$row['cedula'],
            'telefono'=>$row['telefono'],
            'direccion'=>$row['direccion'],
            'correo'=>$row['correo']
        );
    }
    
    $pdf = new PDF('L', 'mm', 'A3');
    $pdf->AddPage();
    $pdf->Cell(100, 10, "Listado de clientes", 0, 1, 'C', 0);
    $pdf->Ln(5);
    
    $pdf->SetX(15);
    $pdf->SetFillColor(232,232,232);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(55, 6, 'Nombre', 1,0,'C',1);
    $pdf->Cell(55, 6, 'Cedula', 1,0,'C',1);
    $pdf->Cell(55, 6, 'Telefono', 1,0,'C',1);
    $pdf->Cell(75, 6, 'Direccion', 1,0,'C',1);
    $pdf->Cell(65, 6, 'Correo', 1,1,'C',1);
    
    $pdf->SetFont('Arial', 'B', 12);
    
    foreach ($json as $key => $value) {
        $pdf->SetX(15);
        $pdf->Cell(55, 6, $value['nombre'], 1,0,'C',1);
        $pdf->Cell(55, 6, $value['cedula'], 1,0,'C',1);
        $pdf->Cell(55, 6, $value['telefono'], 1,0,'C',1);
        $pdf->Cell(75, 6, $value['direccion'], 1,0,'C',1);
        $pdf->Cell(65, 6, $value['correo'], 1,1,'C',1);
    }
    
    $pdf->output();
}


?>