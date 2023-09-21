<?php

if(isset($_POST["select"]))
{
    $select = $_POST["select"];

    switch($select)
    {
        case "Boulangerie":
            header("Location: ../Boulangerie/main_page/main.php");
            exit;
        
        case "Caterpillar":
            header("Location: ../Caterpillar/index.php");
            exit;
        case "Chat":
            header("Location: ../Chat/chat.php");
            exit;
    }
}