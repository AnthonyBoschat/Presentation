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
                    <div id="recette_box_child" class="box_child">
                        <div class="add_minus_box">
                            <div><i class="fa-solid fa-plus add"></i></div>
                            <div><i class="fa-solid fa-minus minus"></i></div>
                        </div>
                        <div class="input_box_global">
                            <div class="title">Ma recette <span><span id="user_poid_total_recette_value">0</span> g</span> </div>
                            <div class="input_box" id="recette_input_box">
                                <div class="recette_input_line input_line">
                                    <input type="text" placeholder="Farine" id="user_recette_ingredient" class="required">
                                    <input type="text" placeholder="1000 (g)" id="user_recette_poid" class="user_recette_poid required required_number">
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
                                    <input type="text" placeholder="10" id="user_product_number" class="required required_number">
                                    <input type="text" placeholder="Baguette" id="user_product_name" class="required">
                                    <input type="text" placeholder="330 (g)" id="user_product_poid" class="required required_number">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div id="programme_box_button">
                <button id="button_calcule">Calculer ma recette</button>
            </div>
            <div id="programme_box">
                <div id="programme_box_title">Recette final <button id="button_calcule_again">Calculer à nouveau</button></div>
                <div id="programme_box_main">
                    <div id="programme_recette_box">
                        <div class="programme_recette_line">
                            <div class="programme_recette_line_name">Farine T65 <i class="fa-solid fa-arrow-right-long"></i></div>
                            <div class="programme_recette_line_total"><span class="programme_recette_line_total_value">1000</span> g</div>
                        </div>
                    </div>
                    <div id="programme_information_box">
                        <div id="programme_coefficient_box">
                            <div id="programme_coefficient_title">Coefficient multiplicateur</div>
                            <div>~ <span id="programme_coefficient_value"> 2</span></div>
                        </div>
                        <div id="programme_poid_total_box">
                            <div id="programme_poid_total_title">Poid total</div>
                            <div id="programme_poid_total_value">19750 g</div>
                        </div>
                        <div id="programme_recap_product_box">
                            <div class="programme_recap_product_line">
                                Pour 10 baguette à 250g
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<script src="main_javascript.js"></script>
</body>
</html>