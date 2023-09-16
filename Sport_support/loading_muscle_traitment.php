<?php
require "../../global_tools.php";

if(isset($_POST["query"]))
{
    $query = $_POST["query"];
    // On se connecte à PDO
    $PDO = connection_PDO("musculation");
    
    // On effectue la requête
    $query_get_all_muscle = $PDO->prepare("SELECT muscle_name FROM muscle");
    $query_get_all_muscle->execute();
    $response = $query_get_all_muscle->fetchAll(PDO::FETCH_OBJ);

    // On renvoie $response
    echo json_encode(["response" => $response, "status" => true]);
}