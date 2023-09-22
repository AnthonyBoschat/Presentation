<?php
require "/home/parkser/Travail/global_tools.php";

if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "save_message":
            require "php_traitment/save_message_in_database.php";
            exit;

        case "load_all_message":
            require "php_traitment/load_all_message_in_database.php";
            exit;
    }
}

