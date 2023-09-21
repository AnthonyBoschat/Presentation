<?php

require "/home/parkser/Travail/global_tools.php";

session_start();

fin_de_session();

header("Location: login.php");
exit();