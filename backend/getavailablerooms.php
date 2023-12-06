<?php 
header('Access-Control-Allow-Origin: *');
include('connect.php');
$query = $mysqli->prepare('select room_id, current_occupancy from rooms where current_occupancy < 2');
$query->execute();
$array = $query->get_result();
$response = [];

while($users = $array->fetch_assoc()){
  $response[]=$users;
}

echo json_encode($response);  
?>
