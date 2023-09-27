<?php

$object = json_decode($_POST["data"]);

$query_load_all_todo_for_this_categorie = $PDO -> prepare(" SELECT todo_content, todo_color 
                                                            FROM todo_list
                                                            WHERE todo_categorie = :todo_categorie
                                                            AND user_name = :user_name");
$query_load_all_todo_for_this_categorie->bindValue(":todo_categorie", $object->todo_categorie);
$query_load_all_todo_for_this_categorie->bindValue(":user_name", $object->user_name);
$query_load_all_todo_for_this_categorie->execute();
$response["data"] = $query_load_all_todo_for_this_categorie->fetchAll(PDO::FETCH_OBJ);
$response["status"] = true;
echo json_encode($response);


