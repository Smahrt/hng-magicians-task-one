<?php
  // this file is mimicking the Back end

  if (!isset($_POST)) {
    echo "failed";
  }

  if (isset($_POST["login"])) {
    echo "success on login";
  }

  if (isset($_POST["signup"])) {
    echo "success on sign up";
  }
