<?php
require "../../global_tools.php";

// Reception JS et redirection
if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "load_muscle":
           require "loading_muscle_traitment.php";
           break;

        case "new_exercice":
            require "create_new_exercice_traitment.php";
            break;

        case "update_muscle":
            require "update_muscle_traitment.php";
            break; 

        case "update_exercice_name":
            require "update_exercice_name_traitment.php";
            break;

        case "update_poid":
            require "update_poid_traitment.php";
            break;
    }
}

