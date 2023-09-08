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
        <div id="nav_option">
            <div id="my_recette">Mes recettes<i class="fa-solid fa-caret-down"></i></div>
            <div id="my_recette_list"></div>
        </div>
        <div id="deconnection">
            <form action="main_treatment.php" method="post"><input type="submit" name="deconnection" value="Se déconnecter" id="deconnection_button"></form>
        </div>
    </header>

    <div id="main_box">
        <div id="main_box_child">

            <div id="user_input_box">

                <div id="recette_box">
                    <div id="recette_box_child" class="box_child">
                        <div class="add_minus_box">
                            <div><i class="fa-solid fa-plus add"></i></div>
                            <div><i class="fa-solid fa-minus minus"></i></div>
                        </div>
                        <div class="input_box_global">
                            <div class="title"><input type="text" placeholder="Nom de la recette" id="name_recette"> <span id="user_poid_total_recette_value">0 g</span></div>
                            <div class="input_box" id="recette_input_box">
                                <div class="recette_input_line input_line">
                                    <input type="text" placeholder="Farine" id="user_recette_ingredient" class="required_save required_calcul user_recette_ingredient">
                                    <input type="text" placeholder="1000 (g)" id="user_recette_poid" class="required_save user_recette_poid required_calcul required_number">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="product_box">
                    <div id="product_box_child" class="box_child">
                        <div class="add_minus_box">
                            <div><i class="fa-solid fa-plus add"></i></div>
                            <div><i class="fa-solid fa-minus minus"></i></div>
                        </div>
                        
                        <div class="input_box_global">
                            <div class="title">Produit voulu</div>
                            <div class="input_box" id="product_input_box">
                                <div class="product_input_line input_line">
                                    <input type="text" placeholder="10" class="user_product_number required_calcul required_number">
                                    <input type="text" placeholder="Baguette" class="user_product_name required_calcul">
                                    <input type="text" placeholder="330 (g)" class="user_product_poid required_calcul required_number">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div id="programme_box_button">
                <button class="big_button save_recette">Enregistrer ma recette</button>
                <button class="big_button" id="button_calcule">Calculer ma recette</button>
            </div>
            <div id="programme_box">
                <div id="programme_box_header">
                    <button class="save_recette">Enregistrer ma recette</button>
                    <button id="button_calcule_again">Calculer à nouveau</button>
                </div>
                <div id="programme_box_main">
                    <div id="programme_recette_box">
                    </div>
                    <div id="programme_information_box">
                        <div id="programme_coefficient_box">
                            <div id="programme_coefficient_title">Coefficient multiplicateur</div>
                            <div>~ <span id="programme_coefficient_value"></span></div>
                        </div>
                        <div id="programme_poid_total_box">
                            <div id="programme_poid_total_title">Poid total</div>
                            <div id="programme_poid_total_value"></div>
                        </div>
                        <div id="programme_recap_product_box">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="main_javascript.js"></script>
</body>
</html>