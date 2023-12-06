<?php
  $host = "localhost";
  $db_user = "root";
  $db_password = null;
  $db = "hospital_management_system";

  $mysqli = new mysqli($host, $db_user, $db_password, $db);

  if($mysqli->connect_error){
    die("Error " . $mysqli->connect_error);
  }

?>