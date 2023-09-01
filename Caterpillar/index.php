<?php
// On défini les fichier nécessaire
require "php_tools.php";
require "../../global_tools.php";
// On initialise une Session
init_session();

$controle_connection = false;

// On verifie si l'utilisateur clique sur le bouton d'inscription
if($information = controle_button_clic("inscription"))
{
    // Si c'est le cas, et que les deux champs de saisies ont été rempli
    // On récupère les informations saisi, et l'objet PDO pour créé des requête
    $user_name = $information["name"];
    $user_password = $information["password"];
    $PDO = $information["PDO"];

    // On vérifie si l'utilisateur peut s'inscrire avec inscription()
    if($information = inscription($PDO, $user_name, $user_password))
    {
        // On récupère l'ID
        $user_id = $information["ID"];
        // controle_connection = l'utilisateur est connecter
        $controle_connection = true;
        console("Nom utilisateur : ".$user_name);

        // On stock l'ID, le nom d'utilisateur dans des variables de session
        $_SESSION["ID"] = $user_id;
        $_SESSION["username"] = $user_name;
    }
}

// On verifie si l'utilisateur clique sur le bouton de connection
else if($information = controle_button_clic("connection"))
{
    // Si c'est le cas, et que les deux champs de saisies ont été rempli
    // On récupère les informations saisi, et l'objet PDO pour créé des requête
    $user_name = $information["name"];
    $user_password = $information["password"];
    $PDO = $information["PDO"];

    // On vérifie si l'utilisateur peut se connecter avec ces informations avec connection()
    if($information = connection($PDO, $user_name, $user_password))  
    {
        // On récupère l'ID
        $user_id = $information["ID"];
        // controle_connection = l'utilisateur est connecter
        $controle_connection = true;
        console("Nom utilisateur : ".$user_name);

        // On stock l'ID, le nom d'utilisateur dans des variables de session
        $_SESSION["ID"] = $user_id;
        $_SESSION["username"] = $user_name;
    }
    else
    {
        console("probleme de connection");
    }
}

else if(isset($_POST["deconnexion"]))
{
    close_session();
}

// On controle que l'utilisateur a réussi à se connecter, via inscription ou connection
if($controle_connection === true)
{
    // on initie un tableau qui contient l'etat intial de controle_level;
    $controle_level = array
    (
        "level_1" => false,
        "level_2" => false,
        "level_3" => false,
        "level_4" => false
    );
    
    // S'il a réussi à se connecter, on va récupérer les informations concernant les level complete selon l'id de l'utilisateur
    $informations = recuperation_level_complete($PDO, $user_id);
    // on supprimer la premiere clef-valeur du tableau, (user_id)
    array_shift($informations);

    // A ce stade, $informations ne contient que les clef = colonnes level_X et leurs valeurs = 0 / 1
    // On va parcourir $informations pour mettre à jour le tableau initial $controle_level
    foreach($informations as $clef => $valeur)
    {
        if($valeur == 1)
        {
            $controle_level[$clef] = true;
        }
    }
                

    // A ce stade, $controle_level a les informations des niveaux qui ont déjà été fini par le joueur
    // clef = niveau
    // valeur = 0 pas fini, 1 fini.
    // Maintenant, les conditions dans le html pour l'affichage des check en fonction du tableau
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <!-- Si la variable superglobal $_SESSION ID existe c'est que l'utilisateur est connecter, on lui montre un message personnaliser, et un bouton de déconnection -->
    <?php if(isset($_SESSION["ID"])): ?>
        <div id="connecter_box">
            <p id="user_presentation">Utilisateur : <?= $_SESSION["username"] ?></p>
            <form action="http://localhost/Présentation/Caterpillar/" method="post">
                <button name="deconnexion">Déconnexion</button>
            </form>
        </div>
    <!-- Si elle n'existe pas, l'utilisateur n'est pas connecter, on lui montre le formulaire de connection -->
    <?php else: ?>

        <div id="connection_box">
            <form action="http://localhost/Présentation/Caterpillar/" method="post">
                <div id="user_name_box">
                    <div>Nom : </div>
                    <input type="text" name="user_name" class="connection_input">
                </div>
                <div id="user_password_box">
                    <div>Mot de passe : </div>
                    <input type="password" name="user_password" class="connection_input">
                </div>
                <div id="connection_button_box">
                    <input type="submit" value="Connection" name="connection"><input type="submit" value="Inscription" name="inscription">
                </div>
            </form>
        </div>
        
    <?php endif; ?>

    <div id="test_box">
        <div id="comptage_test_box"><span id="comptage_test_indice"></span>/15</div>
        <div id="test_box_color_presentation">
        </div>
        <div id="test_box_response">
            <button id="test_box_correct"><i class="fa-solid fa-check"></i></button>
            <button id="test_box_incorrect"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>

        <div id="choice_level">
            <button id="level_1">Level 1<span id="check_level_1">
                <?php
                if($controle_connection == true)
                {
                    controle_level_check($controle_level, "level_1");
                }
                ?>
            </span></button>
            <button id="level_2">Level 2<span id="check_level_2">
                <?php
                if($controle_connection == true)
                {
                    controle_level_check($controle_level, "level_2");
                }
                ?>
            </span></button>
            <button id="level_3">Level 3<span id="check_level_3">
                <?php
                if($controle_connection == true)
                {
                    controle_level_check($controle_level, "level_3");
                }
                ?>
            </span></button>
            <button id="level_4">Level 4<span id="check_level_4">
                <?php
                if($controle_connection == true)
                {
                    controle_level_check($controle_level, "level_4");
                }
                ?>
            </span></button>
        </div>

        <main id="main">
            <div id="color_presentation">
                <div id="correct_color_presentation">
                    
                </div>

                <div id="incorrect_color_presentation">
                </div>
            </div>
        </main>

        <div id="box_button_verification">
            <button id="button_verification">Vérification</button>
            <button id="button_know_the_rules">Passer le test</button>
        </div>

        <div id="user_box">
            <div id="color_use">
            </div>

            <div id="color_list">
                <div class="circle_color color_red" id="red"></div>
                <div class="circle_color color_green" id="green"></div>
                <div class="circle_color color_blue" id="blue"></div>
                <div class="circle_color color_yellow" id="yellow"></div>
                <div class="circle_color color_orange" id="orange"></div>
                <div class="circle_color color_violet" id="violet"></div>
            </div>
        </div>
    <div id="destination_test">
    </div>
    <script src="javascript.js"></script>
</body>
</html>

