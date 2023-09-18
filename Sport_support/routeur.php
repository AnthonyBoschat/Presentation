<?php
require "../../global_tools.php";

// Reception JS et redirection
if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "load_muscle":
           require "php_traitment/loading_muscle_traitment.php";
           break;

        case "new_exercice":
            require "php_traitment/create_new_exercice_traitment.php";
            break;

        case "update_muscle":
            require "php_traitment/update_muscle_traitment.php";
            break; 

        case "update_exercice_name":
            require "php_traitment/update_exercice_name_traitment.php";
            break;

        case "update_poid":
            require "php_traitment/update_poid_traitment.php";
            break;

        case "update_repos":
            require "php_traitment/update_repos_traitment.php";
            break;

        case "load_all_workout":
            require "php_traitment/load_all_workout_traitment.php";
            break;

        case "delete_exercice":
            require "php_traitment/delete_exercice_traitment.php";
            break;
    }
}