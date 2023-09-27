<?php

if(isset($_POST["data"]))
{
    $object = json_decode($_POST["data"]);
    $query_save_todo = $PDO -> prepare("INSERT INTO todo_list(user_name, todo_content, todo_color)
                                        VALUES
                                        (:user_name, :todo_content, :todo_color)");
    $query_save_todo->bindValue(":user_name", $object->user_name);
    $query_save_todo->bindValue(":todo_content", $object->todo_content);
    $query_save_todo->bindValue(":todo_color", $object->todo_color);
    $query_save_todo->execute();
    $response["status"] = true;
}


echo json_encode($response);