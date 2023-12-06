<?php
header('Access-Control-Allow-Origin: *');
include('./connect.php');

$email = $_POST['email'];

$check_query = $mysqli->prepare('SELECT id FROM users WHERE email = ?');
$check_query->bind_param('s', $email);
$check_query->execute();
$check_query->store_result();

$response = [];

if ($check_query->num_rows > 0) {
  $response = [
    'status' => 'false',
    'message' => 'Email is already registered'
  ];
} else {
  $id = mt_rand(100000, 999999);
  $password = $_POST['password'];
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $gender = $_POST['gender'];
  $age = strtolower($_POST['age']);
  $role = strtolower($_POST['role']);

  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  $insert_query = $mysqli->prepare('INSERT INTO users (id, email, password, firstname, lastname, age, role) VALUES (?, ?, ?, ?, ?, ?, ?)');
  $insert_query->bind_param('issssis', $id, $email, $hashed_password, $firstname, $lastname, $age, $role);
  $insert_query->execute();

  if($role === 'patient'){
    $health_condition = $_POST['health_condition'];
    $emergency_status = $_POST['emergency_status'];
    $insert_query2 = $mysqli->prepare('INSERT into patients (patient_id, emergency_status, health_condition) values (?, ?, ?)');
    $insert_query2->bind_param('iss', $id, $emergency_status, $health_condition);
    $insert_query2->execute();
  } else if($role === 'doctor'){
    $speciality = $_POST['speciality'];
    $insert_query2 = $mysqli->prepare('INSERT into doctors (doctor_id, speciality) values (?, ?)');
    $insert_query2->bind_param('is', $id, $speciality);
    $insert_query2->execute();
  } else {
    $insert_query2 = $mysqli->prepare('INSERT into admins (admin_id) values (?) ');
    $insert_query2->bind_param('i', $id);
    $insert_query2->execute();
  }

  $response = [
    'status' => 'true',
    'message' => 'User registered successfully'
  ];

  $insert_query->close();
  $insert_query2->close();
}

$check_query->close();
$mysqli->close();

echo json_encode($response);
?>
