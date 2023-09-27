<?php

$object = json_decode($_POST["data"]);

$query_recup_categorie_for_this_user = $PDO->prepare("  SELECT todo_categorie
                                                        FROM todo_categorie
                                                        WHERE user_name = :user_name");
$query_recup_categorie_for_this_user->bindValue(":user_name", $object->user_name);
$query_recup_categorie_for_this_user->execute();
$response["data"] = $query_recup_categorie_for_this_user->fetchAll(PDO::FETCH_OBJ);
$response["status"] = true;
echo json_encode($response);                                                       