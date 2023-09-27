<?php
require "/home/parkser/Travail/global_tools.php";
$PDO = connection_PDO("todo");

if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "save_new_todo":
            require "php_traitment/save_new_todo_traitment.php";
            exit;
        case "load_todos_for_this_categorie":
            require "php_traitment/load_todo_for_this_categorie_traitment.php";
            exit;
    }
}
