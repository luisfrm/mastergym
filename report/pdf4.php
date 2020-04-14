<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';

if (isset($_GET['access']) and $_GET['access']=='true') {
    if(isset($_GET['cedula'])){
        $cedula=$_GET['cedula'];
        $query="SELECT pago_cliente.id, pago_cliente.idPago, pago_cliente.idDivisa, pago_cliente.idMetodo, pago_cliente.idCliente, cliente.nombre, cliente.apellido, cliente.cedula, pago.fechaPago, pago.monto, metodo_pago.metodo, divisa.divisa, pago.referencia, pago_cliente.fechaVencimiento, pago.fechaIngreso FROM pago_cliente INNER JOIN cliente ON cliente.id=pago_cliente.idCliente INNER JOIN pago ON pago.id = pago_cliente.idPago INNER JOIN metodo_pago ON metodo_pago.id = pago_cliente.idMetodo INNER JOIN divisa ON divisa.id=pago_cliente.idDivisa WHERE cliente.cedula='$cedula' ORDER BY pago_cliente.fechaVencimiento DESC LIMIT 1";
        $result=mysqli_query($conn, $query);
        $json=[];
        
        if($result){
            while($row=mysqli_fetch_array($result)){
                $json[]=array(
                    'id'=>$row['id'],
                    'idCliente'=>$row['idCliente'],
                    'nombre'=>$row['nombre'] . " " . $row['apellido'],
                    'cedula'=>$row['cedula'],
                    'fechaPago'=>$row['fechaPago'],
                    'monto'=>$row['monto'],
                    'viaPago'=>$row['metodo'],
                    'fechaVencimiento'=>$row['fechaVencimiento'],
                    'referencia'=>$row['referencia'],
                    'divisa'=>$row['divisa'],
                );
            }
        }else{
            echo mysqli_error($conn);
        }
    
        $pdf = new PDF();
        $pdf->AddPage();
    
        $pdf->Cell(70, 10, 'Datos de '. $json[0]['nombre'], 0, 1, 'C', 0);
        $pdf->Ln(5);
    
        $pdf->SetFillColor(232,232,232);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->SetX(15);
        $pdf->Cell(80,9,'Cedula',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['cedula'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Fecha de pago',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['fechaPago'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Fecha de vencimiento',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['fechaVencimiento'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Monto',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['monto'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Metodo de pago',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['viaPago'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Divisa',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['divisa'],1,1,'C',1);
    
        $pdf->SetX(15);
        $pdf->SetFont('Arial', 'B', 18);
        $pdf->Cell(80,9,'Referencia',1,0,'C',1);
        $pdf->SetFont('Arial', '', 15);
        $pdf->Cell(80,9,$json[0]['referencia'],1,1,'C',1);
    
        $pdf->output();
    
    
    
    }
}
?>