<?php

function verification_champ_saisi_rempli()
{
    if(isset($_POST["connection"]) || isset($_POST["inscription"]))
    {
        if (isset($_POST["name"]) && !empty($_POST["name"]) &&
            isset($_POST["password"]) && !empty($_POST["password"]))
        {
            return true;
        }
        return false;
    }
}