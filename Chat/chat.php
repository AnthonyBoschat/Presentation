<?php session_start() ?>
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
        <div>Utilisateur : <?= $_SESSION["user_name"] ?></div>
        <form action="../login_page/destroy_session.php">
            <button class="hover_pointer">Se déconnecter</button>
        </form>
    </header>
    <main>
        <div id="chat_box">
            <div id="content_box">
                <div id="message"> <span class="username"><?= $_SESSION["user_name"] ?></span> : Salut tout le monde !</div>
                <div id="message"> <span class="username"><?= $_SESSION["user_name"] ?></span> : Comment vous allez ?</div>
                <div id="message"> <span class="username"><?= $_SESSION["user_name"] ?></span> : Moi ça va ♥</div>
            </div>
            <div id="writting_box">
                <form action="">
                    <input type="text" id="writting_area">
                    <input type="submit" value="Envoyer" id="submit_area">
                </form>
            </div>
        </div>
    </main>








    <script src="../../global_tools.js"></script>
    <script src="javascript.js"></script>
</body>
</html>