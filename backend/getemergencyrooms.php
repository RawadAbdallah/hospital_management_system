<?php
header('Access-Control-Allow-Origin: *'); 
include('connect.php');
$query = $mysqli->prepare('SELECT room_id, current_occupancy, is_emergency FROM rooms WHERE current_occupancy < 2 AND is_emergency = "true"');
$query->execute();
$array = $query->get_result();
$response = [];
while ($emergency_rooms = $array->fetch_assoc()) {
  $response[] = $emergency_rooms;
}
if($response === [])
  $response = [
    'status' => 'false',
    'message' => 'Sorry, more emergency rooms available.'
  ];
  echo json_encode($response);
?>
