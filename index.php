<?php
session_start();
$loggedIn = false;
$name = '';
$email = '';
if (isset($_SESSION['email']) && !empty($_SESSION['email'])) {
  $loggedIn = true;
  $name = isset($_SESSION['name']) ? $_SESSION['name'] : 'Guest';
  $email = $_SESSION['email'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Lato:400,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/vendor/animate.css">
  <title>SmartMart</title>
</head>

<body>
  <div id="wrapper">
    <div class="col bg"></div>
    <div class="col content">
      <div class="logo">
        <img src="./assets/img/ui/smart-logo.png">
      </div>
      <?php if (!$loggedIn) { ?>
        <form id="login" class="login animated fadeIn">
          <h1>Sign In</h1>
          <input type="email" name="email" id="email" required placeholder="email" autocomplete="no">
          <input type="password" name="password" required id="password" placeholder="password">

          <button class="form_button" type="submit">
            <span>Let's Go</span>
          </button>

        </form>

        <div class="footer_text login">
          <p>Don't have an account? <a href="#">Create one</a></p>
        </div>

        <form id="signup" class="signup animated fadeIn">
          <h1>Sign Up</h1>
          <input type="text" name="name" placeholder="name" autocomplete="no">
          <input type="email" name="email" placeholder="email" autocomplete="no">
          <input type="password" name="password" placeholder="password">

          <button class="form_button" type="submit">
            <span>Let's Go</span>
          </button>

        </form>

        <div class="footer_text animated fadeIn signup">
          <p>Already a member? <a href="#">Log in</a></p>
        </div>
      <?php } else { ?>
        <div>
          <h1>Welcome <?= $name ?></h1>
          <p>Your email is <strong><?= $email ?></strong> </p>
          <button class="form_button logout">
            <span>Log Out</span>
          </button>
        </div>
      <?php } ?>
    </div>
  </div>
  <script src="assets/js/main.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</body>

</html>