<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");

include('./connect.php');
$query = $mysqli->prepare('
select * from users
');
$query->execute();
$array = $query->get_result();
$response = [];
while($users = $array->fetch_assoc()){
  $response[]=$users;
}
echo json_encode($response)
?>