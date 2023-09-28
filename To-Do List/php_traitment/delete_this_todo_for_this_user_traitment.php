<?php

$object = json_decode($_POST["data"]);

$query_delete_this_todo_for_this_user = $PDO -> prepare("DELETE FROM todo_list
                                                        WHERE todo_content = :todo_content
                                                        AND user_name = :user_name");
$query_delete_this_todo_for_this_user->bindValue(":todo_content", $object->todo_content);
$query_delete_this_todo_for_this_user->bindValue(":user_name", $object->user_name);
$query_delete_this_todo_for_this_user->execute();
$response["status"] = true;
echo json_encode($response);
