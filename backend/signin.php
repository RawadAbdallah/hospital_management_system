<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: Content-Type");

include('connect.php');
require_once('vendor/autoload.php'); 

use Firebase\JWT\JWT;

$secret_key = "HelloWorld_ThisIsACrazySecretKey32@1080#"; 
$issuer_claim = "hospital_management_system"; 
$audience_claim = "frontend_application"; 
$issuedat_claim = time();
$notbefore_claim = $issuedat_claim + 10;
$expire_claim = $issuedat_claim + 60; 

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('SELECT id, email, password, role FROM users WHERE email = ?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();

$num_rows = $query->num_rows;

if ($num_rows > 0) {
  $query->bind_result($id, $email, $hashed_password, $role);
  $query->fetch();

  if (password_verify($password, $hashed_password)) {
    $token = [
      "iss" => $issuer_claim,
      "aud" => $audience_claim,
      "iat" => $issuedat_claim,
      "nbf" => $notbefore_claim,
      "exp" => $expire_claim,
      "data" => [
        "id" => $id,
        "email" => $email,
        "role" => $role,
      ],
    ];

    $jwt = JWT::encode($token, $secret_key, "HS256");
    
    $response = [
      'status' => true,
      'message' => 'Sign-in successful',
      'id' => $id,
      'email' => $email,
      'role' => $role,
      'jwt' => $jwt,
    ];
  } else {
    $response = [
      'status' => false,
      'message' => 'Invalid Credentials',
    ];
  }
} else {
  $response = ['status' => false, 'message' => 'Invalid Credentials'];
}

echo json_encode($response);

$query->close();
$mysqli->close();
?>
