<?php 
require "/home/parkser/Travail/global_tools.php";
$user_name = recup_username_from_database();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <title>To-Do List</title>
</head>
<body>
    
    <header>
        <span id="user_tag">Utilisateur : <?= $user_name ?></span>
        <form action="/Présentation/login_page/destroy_session.php">
            <input type="submit" value="Se déconnecter">
        </form>
    </header>

    <main>
        <section id="categorie_box">
            <div>
                <span class="categorie">Lecture</span>
                <span class="categorie">Travail</span>
                <span class="categorie">Programmation</span>
                <span id="add_categorie">(Ajouter une catégorie)</span>
            </div>
        </section>

        <section id="list_box">

        </section>
    </main>




    <script src="/global_tools.js"></script>
    <script src="javascript.js"></script>
</body>
</html>