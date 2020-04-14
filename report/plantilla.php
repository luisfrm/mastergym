<?php
require '../pdf/fpdf/fpdf.php';

class PDF extends FPDF{

    function Header(){
        $this->Image('../resources/img/Logo_marivi.png', 7, 5, 35);
        $this->SetFont('Arial', 'B', 15);
        $this->Cell(120, 10, 'Reporte MasterGym', 0, 0, 'C');

        $this->Ln(20);
    }

    function Footer(){
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(10,10, 'Pagina ' . $this->PageNo(), 0, 'C');
    }


}

?>