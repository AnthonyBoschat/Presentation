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
        button_know_the_rules = document.getElementById("button_know_the_rules"),
        test_box = document.getElementById("test_box"),
        test_box_color_presentation = document.getElementById("test_box_color_presentation"),
        test_box_response = document.getElementById("test_box_response"),
        test_box_button_correct = document.getElementById("test_box_correct"),
        test_box_button_incorrect = document.getElementById("test_box_incorrect"),
        comptage_test_indice = document.getElementById("comptage_test_indice"),
        comptage_test_box = document.getElementById("comptage_test_box"),

        level_1 = document.getElementById("level_1"),
        level_2 = document.getElementById("level_2"),
        level_3 = document.getElementById("level_3"),
        level_4 = document.getElementById("level_4"),

        couleur_disponible = ["red", "green", "blue", "yellow", "orange", "violet"];

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
    lancer_test_listener()
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
        level_4.addEventListener("click", affichage_level_4, true)
    }
}

/* Application du listener pour lancer le test */
function lancer_test_listener()
{
    begin_test()
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

/* On manipule et stock différentes données pour les utiliser dans les fonctions de conditions spécifiques au niveau */
function verification_user_pick()
{
    // On récupère la liste html des élément
    let liste_element = document.querySelectorAll("#color_use div")

    // On récupère le nombre d'élément
    let nombre_element = liste_element.length

    // On définie un tableau vide pour récupérer les couleurs choisi
    let tableau_de_verification = []

    // On créé un objet pour stocker les couleurs choisi et leurs répétitions
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
        if(level_1_condition(tableau_de_verification, occurences))
        {
            affichage_correct_verification(tableau_de_verification)
        }
        else
        {
            affichage_incorrect_verification(tableau_de_verification)
        }
    }
    else if(niveau_choisi == 2)
    {
        if(level_2_condition(tableau_de_verification, occurences))
        {
            affichage_correct_verification(tableau_de_verification)
        }
        else
        {
            affichage_incorrect_verification(tableau_de_verification)
        }
    }
    else if(niveau_choisi == 3)
    {
        if(level_3_condition(tableau_de_verification, occurences))
        {
            affichage_correct_verification(tableau_de_verification)
        }
        else
        {
            affichage_incorrect_verification(tableau_de_verification)
        }
    }
    else if(niveau_choisi == 4)
    {
        if(level_4_condition(tableau_de_verification))
        {
            affichage_correct_verification(tableau_de_verification)
        }
        else
        {
            affichage_incorrect_verification(tableau_de_verification)
        }
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

/* Permet de générer une liste de test pour le niveaux en cours */
function begin_test()
{
    button_know_the_rules.addEventListener("click", generation_test, true)
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
        magic_affichage(correct_color_presentation, "yellow", "red", "green", "red", "violet");
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

function affichage_level_4(event)
{
    niveau_choisi = 4

    if(!controle_clic_level)
    {
        // Memo rappel des conditions : Si 3 ou moins couleur -> 1 orange
        //                              Si plus de 3 couleur -> 2 rouges mais pas coller

        // Pour les exemples correct
        magic_affichage(correct_color_presentation, "blue", "blue", "blue");
        magic_affichage(correct_color_presentation, "yellow", "blue", "green", "violet", "yellow");
        magic_affichage(correct_color_presentation, "red", "yellow", "blue", "green", "green", "red");
        magic_affichage(correct_color_presentation, "violet", "green", "green", "violet");
        magic_affichage(correct_color_presentation, "orange", "orange");

        // Pour les exemples incorrect
        magic_affichage(incorrect_color_presentation, "blue", "green", "red");
        magic_affichage(incorrect_color_presentation, "red", "violet", "blue", "orange");
        magic_affichage(incorrect_color_presentation, "orange", "blue");
        magic_affichage(incorrect_color_presentation, "blue", "red", "orange", "blue", "orange");
        magic_affichage(incorrect_color_presentation, "violet", "blue", "red");
        magic_affichage(incorrect_color_presentation, "green", "red", "red");

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

    else if(event.target.id == "level_4")
    {
        correct_color_presentation.innerHTML = ""
        incorrect_color_presentation.innerHTML = ""
        controle_clic_level = false
        affichage_level_4(event)
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
        return true
    }

    // Si le nombre de couleur saisi n'est pas de deux ou trois, on envoie l'affichage dans la zone correspondante et on efface la zone de saisi
    else
    {
        return false
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
                    // la condition est rempli,
                    return true
                }
            }

            // pour les bleu ( même chose que orange, voir plus haut )
            else if(tableau_de_verification[i]=="blue")
            {
                if(tableau_de_verification[i+1] == "orange" || tableau_de_verification[i-1] == "orange")
                {
                    return true
                }
            }

            // Si rien de ça, on continue
            else
            {
                continue
            }
        }

        return false
        
    }
    // Si pas ces clefs, conditions impossible
    else
    {
        return false
    }
}

function level_3_condition(tableau_de_verification, occurences)
{
    // Memo rappel des conditions : Si 3 ou moins boules -> 1 orange exactement
    //                              Si plus de 3 boules -> 2 rouges exactement mais séparer d'une couleur exactement

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
                    return true
                }
                else
                {
                    return false
                }
            }
            // Si l'itération ne tombe pas sur un orange, on continue
            else
            {
                continue
            }
        }
        
        // Et s'il n'est tomber sur aucun orange
        return false
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
                        return true
                    }
                    
                    else
                    {
                        return false
                    }
                }

                // Sinon, c'est incorrecte
                else
                {
                    return false
                }
            }

            // Si l'itération ne tombe pas sur un rouge, on continue
            else
            {
                continue
            }
        }

        // Et s'il ne tombe sur aucun rouge
        return false
    }
}

function level_4_condition(tableau_de_verification, occurences)
{
    // Memo rappel des conditions : au moin 2 boules, première et dernière de la même couleur

    // Si moins 2 boules
    if(tableau_de_verification.length >= 2)
    {
        // Si premier et dernier element de la liste sont égaux
        if(tableau_de_verification[0] == tableau_de_verification[tableau_de_verification.length-1])
        {
            return true
        }
        // Sinon
        else
        {
            return false
        }
    }

    // Si moins de 2 boules
    else
    {
        return false
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

function animation_box_test()
{
    comptage_test_indice.innerHTML = 1


    test_box.style.display = "flex"
    test_box.classList.add("apparition")
    setTimeout(() => {
        test_box.classList.remove("apparition")

        test_box_color_presentation.style.display = "flex"
        test_box_color_presentation.classList.add("apparition")

        test_box_response.style.display = "flex"
        test_box_response.classList.add("apparition")

        comptage_test_box.style.display = "flex"
        comptage_test_box.classList.add("apparition")
        setTimeout(() => {
            test_box_color_presentation.classList.remove("apparition")
            test_box_response.classList.remove("apparition")
            comptage_test_box.classList.remove("apparition")
        }, 500);
    }, 500);
}



//////////////////////////////////////////////
//////////////////////////////////////////////
/* Générateur de test de niveaux */
//////////////////////////////////////////////
//////////////////////////////////////////////

/* Fonction pour savoir quel test de niveau lancer */
function generation_test()
{
    if(niveau_choisi == null)
    {
        return
    }
    else if(niveau_choisi == 1)
    {
        generation_level(level_1_condition, modification_sequence_incorrecte_level_1)
    }
    else if(niveau_choisi == 2)
    {
        generation_level(level_2_condition, modification_sequence_incorrecte_level_2)
    }
    else if(niveau_choisi == 3)
    {
        generation_level(level_3_condition, modification_sequence_incorrecte_level_3)
    }
    else if(niveau_choisi == 4)
    {
        generation_level(level_4_condition, modification_sequence_incorrecte_level_4)
    }
}

/* Fonction préparation de génération de séquence pour un niveau */
function generation_level(x, y)
{
    // On determine qu'on veut entre 6 et 9 sequence correcte
    let controle_sequence_correcte = Math.floor(Math.random() * (9-4)) + 4;
    // On va récupérer toutes les combinaison dans une liste
    let all_test_combinaison = []

    // On va générer 15 combinaison
    for(let i = 0; i<15; i++)
    {
        // On determine pour chaque test, un nombre de séquence compris entre 1 et 7 boules
        let nombre_de_boule = Math.floor((Math.random() * 7) + 1)

        // On créé notre tableau de séquence vide
        let sequence = []

        // On va determiner la couleur de chaque boule, qu'on envoie dans la tableau de séquence
        for( let boule = 0; boule < nombre_de_boule; boule++)
        {
            let index = Math.floor(Math.random()*6) // 6, car 6 index dans couleur_disponible
            let couleur_de_la_boule = couleur_disponible[index]
            sequence.push(couleur_de_la_boule)
        }   
        // On stock cette sequence dans la super liste all_test_combinaison
        all_test_combinaison.push(sequence)
    }
    // A ce stade, nous avons 15 sequences aléatoires
    // On determine un tableau pour stocker les combinaison finales une fois traiter
    let final_test_combinaison = []
    // On filtre all_test_combinaison pour regarder si certaines sequences sont déjà correcte
    for(let i = 0; i < all_test_combinaison.length; i++)
    {
        if(controle_sequence_correcte != 0)
        {
            // On créé un objet pour stocker les couleurs choisi et leurs répétitions
            let occurences = know_occurence(all_test_combinaison, i)

            // Si la fonction de verification de sequence correcte renvoie true, c'est que la condition est déjà rempli pour cette sequence
            if(x(all_test_combinaison[i], occurences))
            {
                // On décrémente de 1 le nombre de séquente correcte attendu
                controle_sequence_correcte -= 1
                // On envoie cette séquence dans final_test_combinaison
                final_test_combinaison.push(all_test_combinaison[i])
                // On supprime cette sequence de all_test_combinaison
                all_test_combinaison.splice(i, 1) // Supprimer à l'index i, 1 élément
                // le tableau se décale, on décrémente l'indice BUG
                i--
            }
        }
        
    }
    // A ce stade : final_test_combinaison contient les sequences de la génération qui sont déjà correcte
    // On sait combien de sequence correcte il reste à générer avec controle_sequence_correcte
    // all_test_combinaison contient les sequences qui ne sont pas encore correcte
    // On va maintenant aller modifier les x premier élément de all_test_combinaison pour les rendres correctes ( x = controle_sequence_correcte )
    while(controle_sequence_correcte != 0)
    {
        for(let i = 0; i<controle_sequence_correcte; i++)
        {
            // On créé un objet pour stocker les couleurs choisi et leurs répétitions
            let occurences = know_occurence(all_test_combinaison, i)

            // On transforme la séquence
            y(all_test_combinaison[i], occurences)
            // On décrémente de 1 le nombre de séquente correcte attendu
            controle_sequence_correcte -= 1
            // On envoie cette séquence dans final_test_combinaison
            final_test_combinaison.push(all_test_combinaison[i])
            // On supprime cette sequence de all_test_combinaison
            all_test_combinaison.splice(i, 1)
        }
    }
    // A ce stade : final_test_combinaison contient toutes les sequences correctes attendu
    // controle_sequence_correcte = 0
    // all_test_combinaison contient toutes les sequences incorrectes

    // On va maintenant pusher toute les séquences de all_test_combinaison dans final_test_combinaison
    all_test_combinaison.forEach(sequence => 
        {
            final_test_combinaison.push(sequence)
        })


    // On mélange la liste deux fois ( les correctes sont au début de la liste )    
    let random_final_test_combinaison = final_test_combinaison.slice().sort(()=>Math.random() - 0.5)
    let final_random_final_test_combinaison = random_final_test_combinaison.slice().sort(()=>Math.random() - 0.5)

    // On lance l'animation du test
    animation_box_test()
    
    // On lance le processus du test à proprement parler
    start_test(final_random_final_test_combinaison, x)
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction pour modifier les sequences incorrectes générer */
//////////////////////////////////////////////
//////////////////////////////////////////////
function modification_sequence_incorrecte_level_1(sequence, occurences)
{
    // On ne fait rien car la condition est trop simple, de forte chance qu'il y ai assez de test correcte
}
function modification_sequence_incorrecte_level_2(sequence, occurences)
{
    // Si la sequence est de au moins 2 boules
    if(sequence.length >= 2)
    {
        // On va parcourir la sequence, et changer toute les boules orange et bleu en une autre couleur
        for(let i = 0; i<sequence.length; i++)
        {
            // Si la boule est soit orange, soit bleu
            if(sequence[i] == "orange" || sequence[i] == "blue")
            {
                // On la change d'une couleur présente dans ce tableau
                let boule_autre_couleur = ["green", "red", "yellow", "violet"]
                let nouvelle_boule = Math.floor(Math.random() * boule_autre_couleur.length)
                sequence[i] = boule_autre_couleur[nouvelle_boule]
            }
        }

        // Ensuite, on va determiner la taille du tableau
        let taille = sequence.length
        // random_boule = la boule aleatoire qu'on va modifier
        let random_boule = Math.floor(Math.random() * taille)
        // random_color = la couleur de la première boule à modifier (0 = orange, 1 = blue)
        let random_color = Math.floor(Math.random() * 2)
        // random_position = si c'est la boule suivante ou precedante qui est modifier (0 = precedante, 1 = suivante)
        let random_position = Math.floor(Math.random() * 2)
        
        // Si la boule à modifier est la première
        if(random_boule == 0)
        {
            // Selon l'indicateur de couleur
            // on change la couleur de la boule, et de celle qui la suit
            if(random_color == 0)
            {
                sequence[random_boule] = "orange"
                sequence[random_boule+1] = "blue"
            }
            else if(random_color == 1)
            {
                sequence[random_boule] = "blue"
                sequence[random_boule+1] = "orange"
            }
            
        }
        // Si la boule à modifier est la derniere
        else if(random_boule == sequence.length-1)
        {
            // Selon l'indicateur de couleur
            // on change la couleur de la boule, et de celle qui la suit
            if(random_color == 0)
            {
                sequence[random_boule] = "orange"
                sequence[random_boule-1] = "blue"
            }
            else if(random_color == 1)
            {
                sequence[random_boule] = "blue"
                sequence[random_boule-1] = "orange"
            }
        }
        // Si la boule à modifier n'est ni la première, ni la derniere
        else
        {
            // Selon l'indicateur de couleur
            if(random_color == 0)
            {
                sequence[random_boule] = "orange"
                // Selon l'indicateur de position
                if(random_position == 0)
                {
                    sequence[random_boule-1] = "blue"
                }
                else if(random_position == 1)
                {
                    sequence[random_boule+1] = "blue"
                }
            }
            else if(random_color == 1)
            {
                sequence[random_boule] = "blue"
                // Selon l'indicateur de position
                if(random_position == 0)
                {
                    sequence[random_boule-1] = "orange"
                }
                else if(random_position == 1)
                {
                    sequence[random_boule+1] = "orange"
                }
            }
        }
    }
    
}
function modification_sequence_incorrecte_level_3(sequence, occurences)
{
    let couleur_disponible = ["red", "blue", "yellow", "green", "violet"]
    // Si la sequence à 3 boules ou moin
    if(sequence.length <= 3)
    {
        // S'il y a des oranges ( on sait déjà qu'il n'y en pas un seul)
        if(occurences["orange"])
        {
            // on change la couleur de toutes les boules ( couleur qui ne peut pas etre orange )
            for(let i = 0; i < sequence.length; i++)
            {
                let nouvelle_couleur = Math.floor(Math.random()*couleur_disponible.length)
                sequence[i] = couleur_disponible[nouvelle_couleur]
            }
            // on determine un nombre x qui va etre l'indice de la boule à changer
            let indice = Math.floor(Math.random() * sequence.length)
            sequence[indice] = "orange" 
        }
        else
        {
            // on determine un nombre x qui va etre l'indice de la boule à changer
            let indice = Math.floor(Math.random() * sequence.length)
            sequence[indice] = "orange"
        }
        
    }
    // Si la sequence à plus de 3 boules
    else
    {
        let couleur_disponible = ["orange", "blue", "yellow", "green", "violet"]
        // on parcours toute la sequence pour changer les boules rouges par d'autres couleur
        for(let i = 0; i < sequence.length; i++)
        {
            if(sequence[i] == "red")
            {
                let nouvelle_couleur = Math.floor(Math.random()*couleur_disponible.length)
                sequence[i] = couleur_disponible[nouvelle_couleur]
            }
        }

        // On determine un indice aleatoire pour changer l'une des boules en rouge
        let indice = Math.floor(Math.random() * sequence.length)
        sequence[indice] = "red"

        // On va verifier maintenant si la boule changer etait la premiere, la derniere, ou non
        // La première
        if(indice == 0)
        {
            sequence[indice+2] = "red"
        }
        // Si c'etait la dernière boule
        else if(indice == sequence.length-1)
        {
            sequence[indice-2] = "red"
        }
        // Si ce n'etait ni la premiere, ni la dernière
        else
        {   
            // on verifie si le precedant ou le suivant est possible
            // Il y a de la place des deux coté
            if(sequence[indice-2] !== undefined && sequence[indice+2] !== undefined)
            {
                // on choisi avant ou après (0 avant, 1 après)
                let aleatoire = Math.floor(Math.random() *2)
                if(aleatoire == 0)
                {
                    sequence[indice - 2] = "red"
                }
                else if(aleatoire == 1)
                {
                    sequence[indice + 2] = "red"
                }
            }
            // S'il n'y a de la place que pour le suivant
            else if(sequence[indice+2] !== undefined && sequence[indice-2] === undefined)
            {
                sequence[indice + 2] = "red"
            }
            // S'il n'y a de la place que pour le precedant
            else if(sequence[indice-2] !== undefined && sequence[indice+2] === undefined)
            {
                sequence[indice - 2] = "red"
            }
        }
    }
    // Si la sequence à plus de 3 boules
}
function modification_sequence_incorrecte_level_4(sequence, occurences)
{
    if(sequence.length > 1)
    {
        let color_first = sequence[0]
        sequence[sequence.length-1] = color_first
    }
    else
    {
        let color_first = sequence[0]
        sequence.push(color_first)
    }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction de lancement des tests */
//////////////////////////////////////////////
//////////////////////////////////////////////

/* Fonction du test global */
function start_test(sequences, x)
{
    // On définie le maximum d'itération
    let max_iteration = sequences.length-1
    // On définie l'indice de départ
    let i = 0

    // on affiche la première sequence
    magic_affichage(test_box_color_presentation, ...sequences[i])

    // On attend un clique utilisateur sur un des deux boutons
    // Le bouton correcte
    test_box_button_correct.addEventListener("click", gestionnaire_event_button_correct, true)

    // Le bouton incorrecte
    test_box_button_incorrect.addEventListener("click", gestionnaire_event_button_incorrect, true)


    // Les gestionnaires servent à pouvoir supprimer le listener par la suite
    // On passe les gestionnaires comme paramètre pour pouvoir les supprimer plus loin dans le code, en dehors du contexte de la fonction
    function gestionnaire_event_button_correct()
    {
        // On vérifie si le bouton appuyer est adéquat pour la séquence
        surveillance_bouton_correct(x, sequences, i, max_iteration, gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
        // On incrémente i de 1 pour pouvoir passer à la séquence suivante
        i++
    }

    function gestionnaire_event_button_incorrect()
    {
        surveillance_bouton_incorrect(x, sequences, i, max_iteration, gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
        i++
    }
}

/* Fonction de surveillance pour le bouton correct */
function surveillance_bouton_correct(x, sequences, i, max_iteration, gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
{
    let occurences = know_occurence(sequences, i)
    // Si la verification pour la sequence en cours renvoie true ( qu'elle répond aux conditions )
    if(x(sequences[i], occurences))
    {
        // Si on n'a pas atteint la dernière séquence disponible
        if(i != max_iteration)
        {
            // On efface la séquence afficher
            test_box_color_presentation.innerHTML = ""
            // On affiche la séquence suivante
            magic_affichage(test_box_color_presentation, ...sequences[i+1])

            // On indique l'indice de numero de test suivant
            if(i+1 != 15) // Condition pour eviter d'afficher un 16/15
            {
                comptage_test_indice.innerHTML = i+2
            }
        }
        // Si on a atteint la dernière séquence, pas d'autres séquences à afficher
        else
        {
            // On gagne le niveau
            victory(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
        }
        
    }
    // Si la verification pour le niveau en cours renvoie false
    else
    {
        // On perd le niveau
        defeat(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
    }
}
/* Fonction de surveillance pour le bouton incorrect */
function surveillance_bouton_incorrect(x, sequences, i, max_iteration, gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
{
    let occurences = know_occurence(sequences, i)
    // Si la verification pour le niveau en cours renvoie false ( qu'elle ne répond aux conditions )
    if(!x(sequences[i], occurences))
    {
        // Si on n'a pas atteint la dernière séquence disponible
        if(i != max_iteration)
        {
            // On efface la séquence afficher
            test_box_color_presentation.innerHTML = ""
            // On affiche la séquence suivante
            magic_affichage(test_box_color_presentation, ...sequences[i+1])
            // On indique l'indice de numero de test suivant
            if(i+1 != 15) // Condition pour eviter d'afficher un 16/15
            {
                comptage_test_indice.innerHTML = i+2
            }
        }
        // Si on a atteint la dernière séquence, pas d'autres séquences à afficher
        else
        {
            // On gagne le niveau
            victory(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
        }
    }
    // Si la verification pour le niveau en cours renvoie false
    else
    {
        // On perd le niveau
        defeat(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
    }
}


/* Fonction en cas de victoire */
function victory(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
{
    switch(niveau_choisi)
    {
        case 1:
            let destination_1 = document.getElementById("check_level_1")
            destination_1.innerHTML = "<i class=\"fa-solid fa-check\"></i>"
            break
        case 2:
            let destination_2 = document.getElementById("check_level_2")
            destination_2.innerHTML = "<i class=\"fa-solid fa-check\"></i>"
            break
        case 3:
            let destination_3 = document.getElementById("check_level_3")
            destination_3.innerHTML = "<i class=\"fa-solid fa-check\"></i>"
            break
        case 4:
            let destination_4 = document.getElementById("check_level_4")
            destination_4.innerHTML = "<i class=\"fa-solid fa-check\"></i>"
            break
    }
    
    // Si un ID est définie ( si un utilisateur est connecter et qu'on a son ID)
    if(ID !== null)
    {
        // On enregistre la victoire dans la base de donnée
       add_data() 
    }
    
    
    defeat(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
}
/* Fonction en cas de défaite */
function defeat(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
{
    // On retire les listener
    remove_listener_test_button(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
    // On fait disparaitre les elements test
    test_box_color_presentation.classList.add("disparition")
    test_box_response.classList.add("disparition")
    comptage_test_box.classList.add("disparition")
    setTimeout(() => {
        // On fait disparaitre la grande boite test
        test_box.classList.add("disparition")

        // On remet à 0 le HTML
        test_box_color_presentation.innerHTML = ""
        
        // On fait disparaitre les elementes test
        test_box_color_presentation.style.display = "none"
        test_box_response.style.display = "none"
        comptage_test_box.style.display = "none"

        // On supprime leurs classes d'animation a la fin de celle-ci
        test_box_color_presentation.classList.remove("disparition")
        test_box_response.classList.remove("disparition")
        comptage_test_box.classList.remove("disparition")
        setTimeout(() => {
            // On fait disparaitre la grande boite test
            test_box.style.display = "none"
            // on supprime sa classe d'animation a la fin
            test_box.classList.remove("disparition")
        }, 400);
    }, 400);
}

/* Fonction pour remove les listener */
function remove_listener_test_button(gestionnaire_event_button_correct, gestionnaire_event_button_incorrect)
{
    // Le bouton correcte
    test_box_button_correct.removeEventListener("click", gestionnaire_event_button_correct, true)

    // Le bouton incorrecte
    test_box_button_incorrect.removeEventListener("click", gestionnaire_event_button_incorrect, true)
}

/* Fonction pour récupérer les occurences */
function know_occurence(x, i=0)
{
    // On créé un objet pour stocker les couleurs choisi et leurs répétitions
    let occurences = {}

    // On rempli l'objet d'occurences
    x[i].forEach(couleur => 
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
    
    return occurences
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction pour enregistrer des données */
//////////////////////////////////////////////
//////////////////////////////////////////////
function add_data()
{   
    // On veut faire passer à 1 une colonne du tableau
    var boolean = 1

    switch(niveau_choisi)
    {
        case 1:
            var colonne = "level_1"
            break
        case 2:
            var colonne = "level_2"
            break
        case 3:
            var colonne = "level_3"
            break
        case 4:
            var colonne = "level_4"
            break

    }

    var xhr = new XMLHttpRequest()

    xhr.open("POST", "xml_request.php", true)

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xhr.send("boolean="+encodeURIComponent(boolean)+"&colonne="+encodeURIComponent(colonne)+"&id="+encodeURIComponent(ID))

    xhr.onreadystatechange = function()
    {
        // Quand la requete est fini
        if(xhr.readyState === 4 && xhr.status === 200)
        {
            // on affiche un texte
            console.log(xhr.responseText)
        }
    }

}

// getEventListeners(test_box_button_correct)






/* Memo pour rajouter des niveaux */ 
/*

1 - Fonction de controle de condition des niveaux - levelx
2 - Fonction d'affichage d'exemples des niveaux - affichage_level_x
3 - Mise à jour Description des fonctions des listeners / verification_user_pick
4 - Mise à jour de la redirection / reinitialisation - redirection_reinitialisation_niveau
5 - Mise à jour dans Assemblage des listeners / lancer_level_listener x

Pour rajouter des generateur :


1 - Mise à jour de generation_test - 737
3 - Création fonction modification_sequence_incorrecte_level_X - 845
4 - Mise à jour de victory() - 972
*/