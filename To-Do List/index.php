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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <title>To-Do List</title>
</head>

<body>

    <div id="new_todo_overlay">
        <div id="new_todo_creation">
            <div id="new_todo_creation_box">

                <div id="new_todo_color_box">
                    <input type="color" id="new_todo_color" value="#FBD990">
                </div>

                <div id="new_todo_content_box">
                    <textarea id="new_todo_content" id="" cols="30" rows="10"></textarea>
                </div>
                
                <div id="new_todo_button_box">
                    <input type="submit" value="Enregistrer" id="enregistrer_new_todo">
                    <input type="submit" value="Annuler" id="annuler">
                </div>
            </div>
        </div>
    </div>
    
    <header>
        <span id="user_tag">Utilisateur : <span id="user_name"><?= $user_name ?></span></span>
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


            <div class="todo" id="new_todo">
                <div class="new_todo_box">
                    <span><i class="fa-solid fa-plus"></i></span>
                </div>
            </div>




            <div class="todo">
                <div class="todo_option">
                    <div class="parameter_box"><i class="fa-solid fa-check parameter todo_valid"></i><i class="fa-solid fa-gear parameter option"></i></div>
                </div>
                <div class="todo_content">
                    <span class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.</span>
                </div>
            </div>



            
        </section>
    </main>




    <script src="../../global_tools.js"></script>
    <script src="javascript.js"></script>
</body>
</html>