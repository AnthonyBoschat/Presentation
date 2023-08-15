//////////////////////////////////////////////
//////////////////////////////////////////////
/* Récupération du HTML */
//////////////////////////////////////////////
//////////////////////////////////////////////

const   color_pickable = document.querySelectorAll("#color_list .circle_color"),
        color_pick = document.getElementById("color_use"),
        correct_color_presentation = document.getElementById("correct_color_presentation"),
        incorrect_color_presentation = document.getElementById("incorrect_color_presentation"),
        button_verification = document.getElementById("button_verification"),

        level_1 = document.getElementById("level_1"),
        level_2 = document.getElementById("level_2"),
        level_3 = document.getElementById("level_3"),
        level_4 = document.getElementById("level_4");

let controle_clic_level = false;
let niveau_choisi = null;

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Constructions des objets */
//////////////////////////////////////////////
//////////////////////////////////////////////

const color_generation = 
{
    "red" : document.querySelector(".color_red").cloneNode(true),
    "green" : document.querySelector(".color_green").cloneNode(true),
    "blue" : document.querySelector(".color_blue").cloneNode(true),
    "yellow" : document.querySelector(".color_yellow").cloneNode(true),
    "orange" : document.querySelector(".color_orange").cloneNode(true),
    "violet" : document.querySelector(".color_violet").cloneNode(true)
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Control */
//////////////////////////////////////////////
//////////////////////////////////////////////



//////////////////////////////////////////////
//////////////////////////////////////////////
/* Programme principal */
//////////////////////////////////////////////
//////////////////////////////////////////////

main()

function main()
{
    color_pickable_listener();
    level_choice_listener()
    button_verification_listener();
}


//////////////////////////////////////////////
//////////////////////////////////////////////
/* Assemblage des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

/* Rendre les boutons de couleurs cliquable */
function color_pickable_listener()
{
    /* Pour chaque bouton de couleur cliquable */
    color_pickable.forEach(color =>
    {
        /* On lui applique le listener set_color_pickable */
        color.addEventListener("click", set_color_pickable, true)
    })
}

/* Rendre le bouton de verification utilisable */
function button_verification_listener()
{
    button_verification.addEventListener("click", verification_user_pick, true)
}

/* Rendre les couleur selectionner supprimable */
function delete_user_pick_listener()
{
    delete_user_pick()
}

/* Appliquer tout les listener pour les boutons de selection de niveau */
function level_choice_listener()
{
    lancer_level_listener()
}


/* Appliquation du listener pour les boutons de selection de niveau */
function lancer_level_listener()
{
    if(!controle_clic_level)
    {
        level_1.addEventListener("click", affichage_level_1, true)
        level_2.addEventListener("click", affichage_level_2, true)
        level_3.addEventListener("click", affichage_level_3, true)
    }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Description des fonctions des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

/* Rendre les boutons de couleurs cliquable */
function set_color_pickable(event)
{
    /* On copie l'élément cliquer */
    let copied = event.target.cloneNode(true);
    /* Qu'on injecte dans la destination color_pick */
    color_pick.appendChild(copied);
    delete_user_pick_listener()
}

/* On manipule et stock différentez données pour les utiliser dans les fonctions de conditions spécifiques au niveau */
function verification_user_pick()
{
    // On récupère la liste html des élément
    let liste_element = document.querySelectorAll("#color_use div")
    // On récupère le nombre d'élément
    let nombre_element = liste_element.length

    // On définie un tableau vide pour récupérer les couleurs choisi
    let tableau_de_verification = []

    // On créé un objet pour stocker les couleurs choisi et leurs répétiions
    let occurences = {}

    // On rempli le tableau_de_verification avec les id de la liste html
    for(let i = 0; i< nombre_element; i++)
    {
        tableau_de_verification.push(liste_element[i].id)
    }

    // On rempli l'objet d'occurences
    tableau_de_verification.forEach(couleur => 
        {
            // Si la clef couleur existe, on lui augmente sa valeur de 1.
            if(occurences[couleur])
            {
                occurences[couleur]++;
            }

            // Si la coleur n'est pas encore rentrer dans le tableau, on lui donne comme clef couleur, valeur = 1
            else
            {
                occurences[couleur] = 1;
            }
        })

    // On lance les condition selon le niveau_choisi
    if(niveau_choisi == 1)
    {
        level_1_condition(tableau_de_verification, occurences)
    }
    else if(niveau_choisi == 2)
    {
        level_2_condition(tableau_de_verification, occurences)
    }
    else if(niveau_choisi == 3)
    {
        level_3_condition(tableau_de_verification, occurences)
    }
    else
    {
        return
    }
    
}

/* Permet de retirer une couleur selectionner en cliquant dessus */ 
function delete_user_pick()
{
    let colors_picks = document.querySelectorAll("#color_use div.circle_color")
    colors_picks.forEach(color =>
        {
            color.addEventListener("click", function(event)
            {
                event.target.remove()
            }, true)
        })
}



//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'affichage d'exemples des niveaux */
//////////////////////////////////////////////
//////////////////////////////////////////////

function affichage_level_1(event)
{
    // On indique que le niveau choisi est le niveau 1 ( pour le bouton de verification )
    niveau_choisi = 1;

    // On verifie qu'un niveau n'est pas déjà charger
    if(!controle_clic_level)
    {
        // Memo rappel des conditions : 2 ou 3 couleurs max, peu importe le nombre

        // Pour les exemples correct
        magic_affichage(correct_color_presentation, "red", "blue", "red", "yellow");
        magic_affichage(correct_color_presentation, "green", "green", "red", "blue", "blue");
        magic_affichage(correct_color_presentation, "violet", "violet", "violet", "blue", "blue", "blue");
        magic_affichage(correct_color_presentation, "orange", "violet", "red", "orange", "red");
        magic_affichage(correct_color_presentation, "orange", "violet");

        // Pour les exemples incorrect
        magic_affichage(incorrect_color_presentation, "yellow", "blue", "yellow", "violet", "orange");
        magic_affichage(incorrect_color_presentation, "blue", "blue", "blue");
        magic_affichage(incorrect_color_presentation, "violet");
        magic_affichage(incorrect_color_presentation, "red", "orange", "red", "orange", "blue", "yellow", "yellow");

        // On lance une fonction qui injecte une animation d'arriver
        animation_apparition()

        controle_clic_level = true
    }

    // Si un niveau est déjà charger
    else
    {
        // On remet à neuf, et on relance l'animation d'apparition du niveau selon le bouton choisi
        redirection_reinitialisation_niveau(event)
    }
}

function affichage_level_2(event)
{
    niveau_choisi = 2

    if(!controle_clic_level)
    {
        // Memo rappel des conditions : Au moin une fois un orange suivi d'un bleu, ou inversement

        // Pour les exemples correct
        magic_affichage(correct_color_presentation, "blue", "orange", "yellow", "yellow");
        magic_affichage(correct_color_presentation, "orange", "blue", "green", "blue", "orange");
        magic_affichage(correct_color_presentation, "violet", "violet", "red", "green", "orange", "blue");
        magic_affichage(correct_color_presentation, "orange", "blue", "green");
        magic_affichage(correct_color_presentation, "blue", "orange");

        // Pour les exemples incorrect
        magic_affichage(incorrect_color_presentation, "red", "blue", "yellow", "violet", "orange");
        magic_affichage(incorrect_color_presentation, "blue", "blue", "yellow", "orange");
        magic_affichage(incorrect_color_presentation, "violet", "blue");
        magic_affichage(incorrect_color_presentation, "red", "orange");
        magic_affichage(incorrect_color_presentation, "orange", "yellow", "blue");
        magic_affichage(incorrect_color_presentation, "orange", "green");

        // On lance une fonction qui injecte une animation d'arriver
        animation_apparition()

        controle_clic_level = true
    }

    else
    {
        // On remet à neuf, et on relance l'animation d'apparition du niveau selon le bouton choisi
        redirection_reinitialisation_niveau(event)
    }
}

function affichage_level_3(event)
{
    niveau_choisi = 3

    if(!controle_clic_level)
    {
        // Memo rappel des conditions : Si 3 ou moins couleur -> 1 orange
        //                              Si plus de 3 couleur -> 2 rouges mais pas coller

        // Pour les exemples correct
        magic_affichage(correct_color_presentation, "orange", "blue", "yellow");
        magic_affichage(correct_color_presentation, "yellow", "red", "green", "violet", "red");
        magic_affichage(correct_color_presentation, "red", "yellow", "red", "green", "green", "blue");
        magic_affichage(correct_color_presentation, "violet", "orange", "violet");
        magic_affichage(correct_color_presentation, "orange");

        // Pour les exemples incorrect
        magic_affichage(incorrect_color_presentation, "blue", "yellow", "red");
        magic_affichage(incorrect_color_presentation, "red", "red", "yellow", "orange");
        magic_affichage(incorrect_color_presentation, "yellow", "blue");
        magic_affichage(incorrect_color_presentation, "blue", "red", "orange", "orange", "violet");
        magic_affichage(incorrect_color_presentation, "green", "blue", "red");
        magic_affichage(incorrect_color_presentation, "green");

        // On lance une fonction qui injecte une animation d'arriver
        animation_apparition()

        controle_clic_level = true
    }

    else
    {
        // On remet à neuf, et on relance l'animation d'apparition du niveau selon le bouton choisi
        redirection_reinitialisation_niveau(event)
    }
}

function redirection_reinitialisation_niveau(event)
{
    // Si l'utilisateur clique sur le bouton level_1
    if(event.target.id == "level_1")
    {
        correct_color_presentation.innerHTML = ""
        incorrect_color_presentation.innerHTML = ""
        controle_clic_level = false
        affichage_level_1(event)
    }

    // Si l'utilisateur clique sur le bouton level_2
    else if(event.target.id == "level_2")
    {
        correct_color_presentation.innerHTML = ""
        incorrect_color_presentation.innerHTML = ""
        controle_clic_level = false
        affichage_level_2(event)
    }

    else if(event.target.id == "level_3")
    {
        correct_color_presentation.innerHTML = ""
        incorrect_color_presentation.innerHTML = ""
        controle_clic_level = false
        affichage_level_3(event)
    }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction pour factoriser l'affichage d'exemple des niveaux */
//////////////////////////////////////////////
//////////////////////////////////////////////

function magic_affichage(destination, ...color)
{
    let nouvelle_div = document.createElement("div");
    nouvelle_div.style.display = "flex";
    nouvelle_div.style.gap = "5px";
    nouvelle_div.style.paddingLeft = "10px"
    nouvelle_div.style.paddingRight = "10px"
    nouvelle_div.style.paddingTop = "10px"
    nouvelle_div.style.paddingBottom = "10px"
    nouvelle_div.style.flexWrap = "wrap"

    for(let i = 0; i < color.length; i++)
    {
        let nouvel_element = color_generation[color[i]].cloneNode(true)
        nouvelle_div.appendChild(nouvel_element)
    }

    destination.appendChild(nouvelle_div);
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction de controle de condition des niveaux */
//////////////////////////////////////////////
//////////////////////////////////////////////

function level_1_condition(tableau_de_verification, occurences)
{
    // Condition pour le niveau 1 : Entre deux et trois couleurs différentes
    // On récupère le nombres d'entrées différentes ( le nombre de couleur saisi par l'utilisateur )
    let nombre_de_couleur_saisi = Object.keys(occurences).length

    // Si le nombre de couleur saisi est de deux ou trois, on envoie l'affichage dans la zone correspondante et on efface la zone de saisi
    if(nombre_de_couleur_saisi == 2 || nombre_de_couleur_saisi == 3)
    {

        affichage_correct_verification(tableau_de_verification)
    }

    // Si le nombre de couleur saisi n'est pas de deux ou trois, on envoie l'affichage dans la zone correspondante et on efface la zone de saisi
    else
    {
        affichage_incorrect_verification(tableau_de_verification)
    }
}

function level_2_condition(tableau_de_verification, occurences)
{

    // Condition pour le niveau 2 : Au moin une fois, un orange est suivi d'un bleu ou inversement
    // On vérifie déjà que ces deux couleurs sont présente dans le tableau, si les clef existes
    if(occurences["orange"] && occurences["blue"])
    {
        // On boucle ensuite dans la liste pour verifier les orange et les bleu
        for(let i = 0; i<tableau_de_verification.length; i++)
        {
            // pour les oranges
            if(tableau_de_verification[i]=="orange")
            {
                // Si l'élément avec l'index qui le suit, ou le précède est bleu, la condition est rempli 
                // ( -1 dans un index [0] de départ donnera indefined, pas de souci avec les extrémités )
                if(tableau_de_verification[i+1] == "blue" || tableau_de_verification[i-1] == "blue")
                {
                    // la condition est rempli, on place la combinaison dans les combinaisons correcte
                    affichage_correct_verification(tableau_de_verification)
                    // On oublie pas de casser la boucle
                    return
                }
            }

            // pour les bleu ( même chose que orange, voir plus haut )
            else if(tableau_de_verification[i]=="blue")
            {
                if(tableau_de_verification[i+1] == "orange" || tableau_de_verification[i-1] == "orange")
                {
                    affichage_correct_verification(tableau_de_verification)
                    return
                }
            }

            // Si rien de ça, mauvaise combinaison
            else
            {
                continue
            }
        }

        affichage_incorrect_verification(tableau_de_verification)
        
    }
    // Si pas ces clefs, conditions impossible
    else
    {
        affichage_incorrect_verification(tableau_de_verification)
    }
}

function level_3_condition(tableau_de_verification, occurences)
{
    // Memo rappel des conditions : Si 3 ou moins couleur -> 1 orange exactement
    //                              Si plus de 3 couleur -> 2 rouges exactement mais séparer d'une couleur exactement

    // Si moin de 3 couleurs
    if(tableau_de_verification.length <= 3)
    {
        for(let i = 0; i<tableau_de_verification.length; i++)
        {
            // Si dans l'itération on tombe sur un orange
            if(tableau_de_verification[i] == "orange")
            {
                // On vérifie combien de fois il apparait dans la liste, si une seule fois
                if(occurences["orange"] == 1)
                {
                    // Alors c'est correct
                    affichage_correct_verification(tableau_de_verification)
                    return
                }
                else
                {
                    affichage_incorrect_verification(tableau_de_verification)
                    return
                }
            }
            // Si l'itération ne tombe pas sur un orange, on continue
            else
            {
                continue
            }
        }
        
        // Et s'il n'est tomber sur aucun orange
        affichage_incorrect_verification(tableau_de_verification)
    }

    // Si plus de 3 couleurs
    else if(tableau_de_verification.length > 3)
    {
        for(let i = 0; i<tableau_de_verification.length; i++)
        {
            // Si dans l'itération on tombe sur un rouge
            if(tableau_de_verification[i] == "red")
            {
                // On vérifie combien de fois il apparait dans la liste, si c'est 2, on continue
                if(occurences["red"] == 2)
                {
                    // On vérifie s'il est séparer par exactement une couleur
                    if(tableau_de_verification[i-2] == "red" || tableau_de_verification[i+2] == "red")
                    {
                        // Alors c'est correct
                        affichage_correct_verification(tableau_de_verification)
                        return
                    }
                    
                    else
                    {
                        affichage_incorrect_verification(tableau_de_verification)
                        return
                    }
                }

                // Sinon, c'est incorrecte
                else
                {
                    affichage_incorrect_verification(tableau_de_verification)
                    return
                }
            }

            // Si l'itération ne tombe pas sur un rouge, on continue
            else
            {
                continue
            }
        }

        // Et s'il ne tombe sur aucun rouge
        affichage_incorrect_verification(tableau_de_verification)
    }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'envoi de la vérification */
//////////////////////////////////////////////
//////////////////////////////////////////////

function affichage_correct_verification(tableau_de_verification)
{
    color_pick.innerHTML = ""
    magic_affichage(correct_color_presentation, ...tableau_de_verification)
}

function affichage_incorrect_verification(tableau_de_verification)
{
    color_pick.innerHTML = ""
    magic_affichage(incorrect_color_presentation, ...tableau_de_verification)
}


//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'injection d'animation */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Animation d'apparition
function animation_apparition()
{
    let recuperation_correct = document.querySelectorAll("#correct_color_presentation div")
    let recuperation_incorrect = document.querySelectorAll("#incorrect_color_presentation div")

    recuperation_correct.forEach(element => 
        {
            element.classList.add("apparition");
        })

    recuperation_incorrect.forEach(element => 
        {
            element.classList.add("apparition");
        })
}


/* Memo pour rajouter des niveaux */ 
/*

1 - Fonction de controle de condition des niveaux - levelx
2 - Fonction d'affichage d'exemples des niveaux - affichage_level_x
3 -Mise à jour Description des fonctions des listeners / verification_user_pick
4 - Mise à jour de la redirection / reinitialisation - redirection_reinitialisation_niveau
5 - Mise à jour dans Assemblage des listeners / lancer_level_listener x

*/