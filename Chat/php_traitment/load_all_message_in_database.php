<?php


$PDO = connection_PDO("chat");
// On veut récupérer les message_content dans la base de donnée chat
// Et le nom des auteur présent dans la bade de donnée login
// En se servant de l'id
$query_recup_message_and_name = $PDO -> prepare("SELECT login.user_information.user_name, chat.message_detail.message_content
                                                FROM chat.message_detail
                                                INNER JOIN login.user_information
                                                ON login.user_information.user_id = chat.message_detail.user_id;");
$query_recup_message_and_name->execute();
$data = $query_recup_message_and_name->fetchAll(PDO::FETCH_OBJ);
$response["status"] = true;
$response["data"] = $data;
echo json_encode($response);
