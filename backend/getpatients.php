<?php 
header('Access-Control-Allow-Origin: *');
include('connect.php');
$query = $mysqli->prepare('SELECT patient_id, email, firstname, lastname, age, gender, role  from users join patients on id = patient_id');
$query->execute();
$array = $query->get_result();
$response = [];

while($users = $array->fetch_assoc()){
  $response[]=$users;
}

echo json_encode($response);
?>