<?php
include 'plantilla.php';
include '../resources/scripts/conexion.php';

if (isset($_GET['access']) and $_GET['access']=='true') {
    if (isset($_GET['id'])) {
        $id=$_GET['id'];
        $query="SELECT pago.id, cliente.nombre, cliente.apellido, pago.fechaPago, pago.monto, metodo_pago.metodo,
         divisa.divisa, pago.referencia, pago_cliente.fechaVencimiento, pago.fechaIngreso FROM pago_cliente 
         INNER JOIN cliente ON cliente.id=pago_cliente.idCliente INNER JOIN pago ON pago.id = pago_cliente.idPago INNER JOIN 
         metodo_pago ON metodo_pago.id = pago_cliente.idMetodo INNER JOIN divisa ON divisa.id=pago_cliente.idDivisa WHERE
          pago_cliente.idCliente=$id ORDER BY pago_cliente.fechaVencimiento DESC";
        $result=mysqli_query($conn, $query) or die('Ha ocurrido un error. #' . mysqli_errno($conn) . ': ' . mysqli_error($conn));
        $json=[];
        while ($row=mysqli_fetch_array($result)) {
            $json[]=array(
                "id"=>$row['id'],
                "nombre"=>$row['nombre'] . " " . $row['apellido'],
                "fechaPago"=>$row['fechaPago'],
                "fechaVencimiento"=>$row['fechaVencimiento'],
                "monto"=>$row['monto'],
                "metodo"=>$row['metodo']
            );
        }
    
    
        $pdf = new PDF();
        $pdf->AddPage();
    
        $pdf->Cell(120, 10, 'Pagos de '. $json[0]['nombre'], 0, 1, 'C', 0);
        $pdf->Ln(5);
    
        $pdf->SetFillColor(232,232,232);
        $pdf->SetFont('Arial', 'B', 12);
        $pdf->SetX(15);
        $pdf->Cell(40,6,'Monto',1,0,'C',1);
        $pdf->Cell(40,6,'Via de pago',1,0,'C',1);
        $pdf->Cell(40,6,'Fecha de pago',1,0,'C',1);
        $pdf->Cell(55,6,'Fecha de vencimiento',1,1,'C',1);
    
        $pdf->SetFont('Arial', '', 10);
        foreach ($json as $key => $value) {
            $pdf->SetX(15);
            $pdf->Cell(40,6, $value['monto'],1,0,'C',1);
            $pdf->Cell(40,6, $value['metodo'],1,0,'C',1);
            $pdf->Cell(40,6, $value['fechaPago'],1,0,'C',1);
            $pdf->Cell(55,6, $value['fechaVencimiento'],1,1,'C',1);
        }
    
        $pdf->output();
    }
}
?>