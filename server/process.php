<?php
// start the session
session_start();
$connection = mysqli_connect("remotemysql.com:3306", "fsuWU0m3JX", "FPvwWXbQvU", "fsuWU0m3JX");
if (isset($_POST['login'])) {
  # code...
  $email = mysqli_real_escape_string($connection, $_POST['email']);
  $password = mysqli_real_escape_string($connection, $_POST['password']);

  $sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
  //above query confirms if user inputs are the ones in db
  $response = mysqli_query($connection, $sql);
  // response has 0 row or i row
  if ($response) {
    $num_rows = mysqli_num_rows($response);
    if ($num_rows == 1) {
      $row = mysqli_fetch_array($response);
      $email = $row['email'];
      // save email and id to the session
      // $_SESSION['email'] = $email;
      sendResponse("success", $row['name']);
    } else {
      sendResponse("error", "Wrong credentials. Please create an account");
    }
  } else {
    sendResponse("error", "Wrong credentials. Please create an account");
  }
}
if (isset($_POST['signup'])) {
  $password = mysqli_real_escape_string($connection, $_POST['password']);
  $email = mysqli_real_escape_string($connection, $_POST['email']);
  $name = mysqli_real_escape_string($connection, $_POST['name']);

  $vars = array($password, $email, $name);
  $verified = TRUE;
  foreach ($vars as $v) {
    if (!isset($v) || empty($v)) {
      $verified = FALSE;
    }
  }

  if (!$verified) {
    sendResponse("error", "Those fields won't fill themselves now, would they?");
  }

  $response = mysqli_query($connection, "SELECT * from user where email = '$email'");

  if ($response) {
    $check = mysqli_num_rows($response);
    if ($check > 0) {
      sendResponse("error", "Seems you already have an account. Try logging in.");
    }
    $sql = "INSERT into user (email, password, name) values ('$email', '$password', '$name')";

    $run_sql = mysqli_query($connection, $sql);
    if ($run_sql) {
      sendResponse("success", "Sign Up Successful");
    }
  } else {
    sendResponse("error", "Unable to complete your request. Try again at a later time");
  }
}

function sendResponse($status, $message)
{
  $res = new stdClass;
  $res->status = $status;
  $res->data = $message;
  echo json_encode($res);
  exit();
}
