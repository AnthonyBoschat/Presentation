<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="login_style.css">
    <title>Identification</title>
</head>
<body>
    
    <?php if(isset($_GET["erreur_inscription"])): ?>
        <div id="error_box">
            Le nom d'utilisateur est déjà utiliser, merci d'en saisir un nouveau
        </div>
    <?php elseif(isset($_GET["erreur_connexion"])): ?>
        <div id="error_box">
            Le nom d'utilisateur ou le mot de passe est incorrect
        </div>
    <?php elseif(isset($_GET["erreur_saisi"])): ?>
        <div id="error_box">
            Tout les champs de saisies n'ont pas été rempli
        </div>
    <?php endif; ?>
    
    <main>
        <form method="post" action="login_treatment.php" id="connection_box">
            <div id="saisi_box">
                <div>
                    <div class="texte">Nom d'utilisateur :</div>
                    <input type="text" class="input" name="name">
                </div>
                <div>
                    <div class="texte">Mot de passe :</div>
                    <input type="password" class="input" name="password">
                </div>
            </div>
            <div id="submit_box">
                <input type="submit" value="Connexion" class="submit" name="connection">
                <input type="submit" value="Inscription" class="submit" name="inscription">
            </div>
        </form>
    </main>
<script src="login_javascript.js"></script>
</body>
</html>