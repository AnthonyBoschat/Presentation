<?php 
require "/home/parkser/Travail/global_tools.php";
session_start();
$user_name = recup_username_from_database();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

        </section>

        <section id="list_box">

        </section>
    </main>




    <script src="/global_tools.js"></script>
    <script src="javascript.js"></script>
</body>
</html>