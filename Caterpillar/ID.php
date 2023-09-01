<?php

session_start();

if(isset($_SESSION["ID"]))
{
    $information = array("ID" => $_SESSION["ID"]);
    echo json_encode($information);
}
else
{
    $information = array("ID" => null);
    echo json_encode($information);
}
