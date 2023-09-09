<?php
require "main_function.php";
session_start();

if(isset($_POST["datas"]))
{
    $response["status"] = true;
}

echo json_encode($response);