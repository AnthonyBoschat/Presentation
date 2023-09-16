<?php

// Reception JS et redirection
if(isset($_POST["query"]))
{
    switch($_POST["query"])
    {
        case "load_recette":
           require "loading_muscle_traitment.php";
           break;
    }
}

