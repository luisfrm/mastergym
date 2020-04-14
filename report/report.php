<?php
require '../pdf/fpdf/fpdf.php';

$pdf = new FPDF('P', 'mm', 'legal');
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 15);

$pdf->SetY(50);
$pdf->Cell(100, 10, 'Hola Mundo', 1, 1, 'C');
$pdf->Cell(100, 10, 'Hola Mundo2', 1, 1, 'C');
$pdf->Cell(100, 10, 'Hola Mundo2', 1, 1, 'C');

$pdf->Cell(100, 10, 'HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO ', 1, 1, 'C');
$pdf->MultiCell(100, 5, 'HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO HOLA MUNDO ', 1, 'L', 0);



$pdf->output();


?>