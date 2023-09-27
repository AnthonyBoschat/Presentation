<?php

$object = json_decode($_POST["data"]);

$query_save_new_categorie_for_this_user = $PDO->prepare("INSERT INTO todo_categorie(user_name, todo_categorie)
                                                        VALUES(:user_name, :todo_categorie)");
$query_save_new_categorie_for_this_user->bindValue(":user_name", $object->user_name);
$query_save_new_categorie_for_this_user->bindValue(":todo_categorie", $object->categorie_name);
$query_save_new_categorie_for_this_user->execute();
$response["status"] = true;
echo json_encode($response);                                    