<?php

// Reception JS et redirection
if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "load_muscle":
           require "loading_muscle_traitment.php";
           break;

        case "update_muscle":
            require "update_muscle_traitment.php";
            break; 
    }
}

