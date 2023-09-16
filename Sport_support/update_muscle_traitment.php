<?php

if(isset($_POST["data"]))
{
    // On récupère le tableau
    $tableau = $_POST["data"];
    
    echo json_encode(["status" => true, "controle" => $tableau]);
}