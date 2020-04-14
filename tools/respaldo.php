<?php
$db_name = "mastergym";
$db_user = "root";
$fecha = date("Ymd-His"); //Fecha y hora para obtener el respaldo.

//Construimos el nombre del archivo de la base de datos. Ex: bdd_20190518-081120.sql
$salida_sql = $db_name . '_' . $fecha . '.sql';

//Comando para generar respaldo de MySql. Enviamos variables de conexión.
$dump = "C:/xampp/mysql/bin/mysqldump.exe  -u$db_user  $db_name > $salida_sql";
try {
  system($dump, $output); //Ejecutamos el comando para el respaldo.

  
  if (filesize($salida_sql) < 1) {
    echo "Error";
    die();
  }
  header('Content-type: application/sql');


  header('Content-Disposition: attachment; filename=' . $salida_sql);


  readfile($salida_sql);
  unlink($salida_sql);
} catch (\Throwable $th) {
  echo "Error";
}
