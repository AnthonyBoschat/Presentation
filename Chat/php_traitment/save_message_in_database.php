<?php



if(isset($_POST["data"]))
{
    $object = json_decode($_POST["data"]);
    $user_message = $object->user_message;
    $user_name = $object->user_name;

    // On se connecte à la base de donnée des logins pour récupérer l'id de l'utilisateur
    $PDO = connection_PDO("login");
    $query_recup_id = $PDO -> prepare ("SELECT user_id 
                                        FROM user_information
                                        WHERE user_name = :user_name");
    $query_recup_id->bindValue(":user_name", $user_name);
    $query_recup_id->execute();
    $user_id = $query_recup_id->fetch(PDO::FETCH_OBJ)->user_id;

    // Maintenant, on enregistre le message dans la base de donnée du chat
    $PDO = connection_PDO("chat");
    $query_save_message = $PDO->prepare("INSERT INTO message_detail(user_id, message_content)
                                        VALUES
                                        (:user_id, :message_content)");
    $query_save_message->bindValue(":user_id", $user_id);
    $query_save_message->bindValue(":message_content", $user_message);
    $query_save_message->execute();

    $response["status"] = true;
    echo json_encode($response);
}