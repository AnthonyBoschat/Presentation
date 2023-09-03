<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="main.css">
    <title>Bienvenue</title>
</head>
<body>
    <header>
        <div id="logo"><i class="fa-solid fa-bread-slice"></i></div>
        <div id="name_user">Utilisateur : <?= $_SESSION["user_name"] ?></div>
        <div id="calcule_recette">Calcule de recette</div>
        <div id="deconnection">
            <form action="main_treatment.php" method="post"><input type="submit" name="deconnection" value="Se déconnecter" id="deconnection_button"></form>
        </div>
    </header>

    <div id="main_box">
        <div id="main_box_child">

            <div id="user_input_box">
                <div id="recette_box">
                    <div id="title_box">
                        <div class="title">Ma recette</div>
                        <div id="user_poid_total_recette_box"><span id="user_poid_total_recette">0 g</span></div>
                    </div>
                    
                    <div id="recette_box_child">
                        <div class="add_minus_box">
                            <div><i class="fa-solid fa-plus add"></i></div>
                            <div><i class="fa-solid fa-minus minus"></i></div>
                        </div>
                        <div class="input_box">
                            <div class="input_line">
                                <input type="text" placeholder="Farine" id="user_recette_ingredient">
                                <input type="text" placeholder="1000 (g)" id="user_recette_poid">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="product_box">
                    <div class="title">Produit voulu</div>
                    <div id="product_box_child">
                        <div class="add_minus_box">
                            <div><i class="fa-solid fa-plus add"></i></div>
                            <div><i class="fa-solid fa-minus minus"></i></div>
                        </div>

                        <div class="input_box">
                            <div class="input_line">
                                <input type="text" placeholder="10" id="user_product_number">
                                <input type="text" placeholder="Baguette" id="user_product_name">
                                <input type="text" placeholder="330 (g)" id="user_product_poid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div id="program_box">
            </div>
        </div>
    </div>


</body>
</html>