<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';
    
if (isset($_GET['access']) and $_GET['access']=='true') {
    $query="SELECT * FROM cliente ORDER BY id DESC LIMIT 1";
    $resultado=mysqli_query($conn, $query);
    $id=0;
    $json=[];
    if($row=mysqli_fetch_array($resultado)){
        $id=$row['id'];
    }
    
    for($i=1; $i <= $id; $i++) { 
        $query="SELECT cliente.nombre, cliente.apellido, cliente.cedula, pago_cliente.fechaVencimiento FROM cliente INNER JOIN pago_cliente ON pago_cliente.idCliente=cliente.id WHERE cliente.id=$i and pago_cliente.fechaVencimiento < current_date() ORDER BY pago_cliente.fechaVencimiento DESC LIMIT 1";
        $resultado=mysqli_query($conn, $query);
    
        if($row=mysqli_fetch_array($resultado)){
            $json[]=array(
                "nombre"=>($row["nombre"] . " " . $row["apellido"]),
                "cedula"=>$row["cedula"],
                "fechaVencimiento"=>$row["fechaVencimiento"]
            );
        }
    }
    
    
    $pdf = new PDF();
    $pdf->AddPage();
    $pdf->Cell(80, 10, 'Clientes insolventes', 0, 1, 'C', 0);
    $pdf->Ln(5);
    
    $pdf->SetFillColor(232,232,232);
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->SetX(25);
    $pdf->Cell(50,6,'Nombre',1,0,'C',1);
    $pdf->Cell(50,6,'Cedula',1,0,'C',1);
    $pdf->Cell(50,6,'Fecha de vencimiento',1,1,'C',1);
    
    $pdf->SetX(25);
    $pdf->SetFont('Arial', '', 10);
    foreach ($json as $key => $value) {
        $pdf->SetX(25);
        $pdf->Cell(50,6, $value['nombre'],1,0,'C',1);
        $pdf->Cell(50,6, $value['cedula'],1,0,'C',1);
        $pdf->Cell(50,6, $value['fechaVencimiento'],1,1,'C',1);
    }
    
    $pdf->output();
    }

?>