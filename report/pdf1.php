<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';

if (isset($_GET['access']) and $_GET['access']=='true') {
    if (isset($_GET['fecha']) and isset($_GET['bs']) and isset($_GET['usd'])) {
        $fecha=$_GET['fecha'];
        $bs=$_GET['bs'];
        $usd=$_GET['usd'];
        $json=[];
    
        if($_GET['access']=='true'){
            $query="SELECT pago_cliente.id, cliente.nombre, cliente.apellido, cliente.cedula, pago.fechaPago, pago.monto, metodo_pago.metodo, divisa.divisa, pago.referencia, pago_cliente.fechaVencimiento, pago.fechaIngreso FROM pago_cliente INNER JOIN cliente ON cliente.id=pago_cliente.idCliente INNER JOIN pago ON pago.id = pago_cliente.idPago INNER JOIN metodo_pago ON metodo_pago.id = pago_cliente.idMetodo INNER JOIN divisa ON divisa.id=pago_cliente.idDivisa WHERE pago.fechaPago='$fecha' ORDER BY pago.id DESC";
            $result=mysqli_query($conn, $query);
            if($result){
                while($row=mysqli_fetch_array($result)){
                    $json[]=array(
                        'id'=>$row['id'],
                        'nombre'=>$row['nombre'] . ' ' . $row['apellido'],
                        'cedula'=>$row['cedula'],
                        'fechaPago'=>$row['fechaPago'],
                        'monto'=>$row['monto'],
                        'viaPago'=>$row['metodo'],
                        'fechaVencimiento'=>$row['fechaVencimiento'],
                        'referencia'=>$row['referencia'],
                        'divisa'=>$row['divisa']
                    );
                }
            }
        
            $pdf = new PDF('L', 'mm', 'A4');
            $pdf->AddPage();
        
            $pdf->Cell(120, 10, 'Pagos del dia '. $fecha, 0, 1, 'C', 0);
            $pdf->Ln(5);
        
        
            $pdf->SetFillColor(232,232,232);
            $pdf->SetFont('Arial', 'B', 12);
            $pdf->SetX(38);
            $pdf->Cell(35,6,'Nombre',1,0,'C',1);
            $pdf->Cell(25,6,'Cedula',1,0,'C',1);
            $pdf->Cell(50,6,'Fecha de vencimiento',1,0,'C',1);
            $pdf->Cell(25,6,'Divisa',1,0,'C',1);
            $pdf->Cell(30,6,'Via de pago',1,0,'C',1);
            $pdf->Cell(25,6,'Monto',1,0,'C',1);
            $pdf->Cell(25,6,'Referencia',1,1,'C',1);
        
            $pdf->SetFont('Arial', '', 10);
        
            foreach ($json as $key => $value) {
                $pdf->SetX(38);
                $pdf->Cell(35,6, $value['nombre'],1,0,'C',1);
                $pdf->Cell(25,6, $value['cedula'],1,0,'C',1);
                $pdf->Cell(50,6, $value['fechaVencimiento'],1,0,'C',1);
                $pdf->Cell(25,6, $value['divisa'],1,0,'C',1);
                $pdf->Cell(30,6, $value['viaPago'],1,0,'C',1);
                $pdf->Cell(25,6, $value['monto'],1,0,'C',1);
                $pdf->Cell(25,6, $value['referencia'],1,1,'C',1);
            }
        
            $pdf->Ln(4);
            $pdf->SetX(38);
            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(35,6,"TOTAL BS", 1,0,'L',1);
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(35,6,"BsS$bs", 1,1,'C',1);
            $pdf->SetX(38);
            $pdf->SetFont('Arial', 'B', 12);
            $pdf->Cell(35,6,"TOTAL USD", 1,0,'L',1);
            $pdf->SetFont('Arial', '', 10);
            $pdf->Cell(35,6,"$$usd", 1,1,'C',1);
        
            $pdf->output();
        
        
        }
    }
}

?>