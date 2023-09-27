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
    <title>Chat en ligne</title>
</head>
<body>
    
    <header>
        <div>Utilisateur : <span id="user_name"><?= $user_name ?></span></div>
        <form action="../login_page/destroy_session.php">
            <button class="hover_pointer">Se déconnecter</button>
        </form>
    </header>
    <main>
        <div id="chat_box">
            <div id="content_box">
            </div>
            
            <div id="writting_box">
                <form action="routeur.php" method="post" id="formulaire">
                    <input type="text" id="writting_area" name="message_user">
                    <input type="submit" value="Envoyer" id="submit_area" name="submit">
                </form>
            </div>
        </div>
    </main>





<!--

<div class="message">
    <span class="username"><?= $id ?></span>
    <span class="text_content">: Salut tout le monde !</span>
</div>

 -->


    <script src="/global_tools.js"></script>
    <script src="javascript.js"></script>
</body>
</html>