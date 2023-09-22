<?php

$PDO = connection_PDO("login");
$query_recup_user_name = $PDO -> prepare("SELECT user_name FROM user_information WHERE user_id = :user_id");
$query_recup_user_name->bindValue(":user_id", $id);
$query_recup_user_name->execute();
$user_name = $query_recup_user_name->fetch(PDO::FETCH_OBJ)->user_name;