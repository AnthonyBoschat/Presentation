//////////////////////////////////////////////
//////////////////////////////////////////////
/* Programme principal */
//////////////////////////////////////////////
//////////////////////////////////////////////

main()

function main()
{
    load_recette_user_pilote()
    add_listener_pilote()
    minus_listener_pilote()
    total_recette_update_pilote()
    bouton_calcul_pilote()
    bouton_recalcul_pilote()
    bouton_save_recette_pilote()
    bouton_recette_list_defil_pilote()
    correction_de_saisi_pilote()
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Application des pilotes listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////
function load_recette_user_pilote()
{
    load_recette_user_description()
}

function add_listener_pilote()
{
    add_listener_description()
}

function minus_listener_pilote()
{
    minus_listener_description()
}

function total_recette_update_pilote()
{
    total_recette_update_description()
}

function bouton_calcul_pilote()
{
    bouton_calcul_description()
}

function bouton_recalcul_pilote()
{
    bouton_recalcul_description()
}

function bouton_save_recette_pilote()
{
    bouton_save_recette_description()
}

function bouton_recette_list_defil_pilote()
{
    bouton_recette_list_defil_description()
}

function bouton_select_recette_pilote()
{
    bouton_select_recette_description()
}

function correction_de_saisi_pilote()
{
    correction_de_saisi_description()
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Description des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////
function load_recette_user_description()
{
    loading_recette_user_list()
}

function add_listener_description()
{
    const add = document.querySelectorAll(".add");

    add.forEach(bouton_ajouter =>
        {
            bouton_ajouter.addEventListener("click", cloner_input_line, true)
        })
}

function minus_listener_description()
{
    const minus = document.querySelectorAll(".minus");

    minus.forEach(bouton_supprimer =>
        {
            bouton_supprimer.addEventListener("click", supprimer_input_line, true)
        })
}

function total_recette_update_description()
{
    let input_recette_poid = document.querySelectorAll(".user_recette_poid");
    input_recette_poid.forEach(input => 
        {
            input.addEventListener("change", update_total_poid_recette, true)
        })
}

function bouton_calcul_description()
{
    const bouton_calculer = document.getElementById("button_calcule");
    bouton_calculer.addEventListener("click", calcul_et_affichage, true)
}

function bouton_recalcul_description()
{
    const bouton_recalculer = document.getElementById("button_calcule_again")

    bouton_recalculer.addEventListener("click", calcul_et_affichage_CALCUL, true)
}

function bouton_save_recette_description()
{
    const bouton_save_recette = document.querySelectorAll(".save_recette")
    bouton_save_recette.forEach(bouton => 
        {
            bouton.addEventListener("click", save_recette ,true)
        })
}

function bouton_recette_list_defil_description()
{
    const bouton_recette_list_defil = document.getElementById("my_recette")

    bouton_recette_list_defil.addEventListener("click", apparition_disparition_boite_recette, true)
}

function bouton_select_recette_description()
{
    const recette_bouton_all = document.querySelectorAll(".my_recette_liste_line")
    recette_bouton_all.forEach(bouton => 
        {
            bouton.addEventListener("click", load_recette, true)
        })
}

function correction_de_saisi_description()
{
    let inputs = document.querySelectorAll("input")
    inputs.forEach(input => 
        {
            input.addEventListener("change", refresh_error_saisi, true)
        })
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonctions appliquer dans les listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

// bouton_select_recette_description -> Afficher la recette selectionner
function load_recette(event)
{
    // On récupère le nom de la recette cliquer
    let name_recette = event.target.innerHTML
    // On prepare la requete AJAX pour envoyer le nom de la recette cliquer, pour qu'elle soit traiter dans le fichier load_recette.php
    let query_post_name_recette = new XMLHttpRequest()
    query_post_name_recette.open("POST", "load_recette.php", true)
    query_post_name_recette.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    let json_name_recette = JSON.stringify(name_recette)
    query_post_name_recette.send("data=" + json_name_recette)

    query_post_name_recette.onload = function()
    {
        if(query_post_name_recette.status === 200)
        {
            let response = JSON.parse(query_post_name_recette.responseText)
            if(response.status === true )
            {
                let liste_ingredients_poids = response.liste
                // On reset les inputs
                let destination = document.getElementById("recette_input_box")
                destination.innerHTML = ""
                // On a récupérer la liste des ingrédient et leurs poids, on créé une boucle pour envoyer les élément dans les inputs
                let nombre_input_a_generer = liste_ingredients_poids.length
                for(let i = 0; i < nombre_input_a_generer; i++)
                {
                    let template = `<input type="text" placeholder="Farine" id="user_recette_ingredient" class="required_save required_calcul user_recette_ingredient" value="${response.liste[i]["ingredient_name"]}">
                                    <input type="text" placeholder="1000 (g)" id="user_recette_poid" class="required_save user_recette_poid required_calcul required_number" value="${response.liste[i]["ingredient_poid"]}">
                                    `
                    let new_element = document.createElement("div")
                    new_element.classList.add("recette_input_line")
                    new_element.classList.add("input_line")
                    new_element.innerHTML = template
                    destination.appendChild(new_element)
                }
            }
            else if(response.status === false)
            {
                console.log("false")
            }
        }
    }
}

// load_recette_user_description -> Charge la liste des recettes de l'utilisateur dans le menu déroulant
function loading_recette_user_list()
{
    // On défini la destination ou envoyer les recettes
    const destination = document.getElementById("my_recette_list")
    // On clear la destination
    destination.innerHTML = "";

    // On récupère la liste des recettes de l'utilisateur envoyer par php par PDO
    let query_recup_list_recette = new XMLHttpRequest()
    query_recup_list_recette.open("GET", "load_recettes_list.php", true)
    query_recup_list_recette.send()
    // Quand on a la réponse prete de PHP
    query_recup_list_recette.onload = function () 
    {
        if(query_recup_list_recette.status === 200)
        {   
            let lists = JSON.parse(query_recup_list_recette.responseText)
            // On verifie le status de la réponse
            if(lists.status === true)
            {
                // A ce moment là, lists.liste est un array qui contient le nom des recettes de l'utilisateur, on boucle pour envoyer ces informations dans la destination
                for(let i = 0; i< lists.liste.length; i++)
                {
                    let name_recette = lists.liste[i].recette_name
                    let new_element = document.createElement("div")
                    new_element.classList.add("my_recette_liste_line")
                    new_element.innerHTML = name_recette
                    destination.appendChild(new_element)
                }

            }
            else if(lists.status === false)
            {
                // C'est que l'utilisateur n'a encore aucune recette d'enregistrer, on ajoute un message pour le signaler dans la destination
                let new_element = document.createElement("div")
                new_element.classList.add("my_recette_liste_line_empty")
                new_element.innerHTML = "( Aucune recette )"
                destination.appendChild(new_element)
            }
        }
        else
        {
            console.error("La requete a rencontrer un probleme")
        }
        // Quand les ajouts sont fait, on applique un listener sur les recettes
        bouton_select_recette_pilote()
    }



}

// add_listener_description -> Cloner une input
function cloner_input_line(event)
{
    // On va chercher l'élément parent le plus proche, comun des deux box recette et product
    let similar_parent = event.target.closest(".box_child")
    // source = Ce que l'on veut cloner, dans l'élément parent commun
    let source = similar_parent.querySelectorAll(".input_line")[0]
    // source_clone, le clone de la source ( avec les enfant )
    let source_clone = source.cloneNode(true)
    // On réinitialise les valeurs éventuellement renseigner par l'utilisateur
    for(let i = 0; i<source_clone.children.length; i++)
    {
        source_clone.children[i].value = ""
        // On refresh les éventuelles couleur d'erreur de saisi
        source_clone.children[i].classList.remove("error_saisi")
    }
    // destination = l'endroit ou envoyer le clone, dans l'élément parent, l'élément clase input_box
    let destination = similar_parent.querySelector(".input_box")
    // On ajoute le clone dans la destination
    destination.appendChild(source_clone)
    // On refresh les listeners pour prendre en compte le nouveau clone
    total_recette_update_pilote()
    correction_de_saisi_pilote()
}

// minus_listener_description -> Supprimer une input
function supprimer_input_line(event)
{
    // On va chercher l'élément parent le plus proche, comun des deux box recette et product
    let similar_parent = event.target.closest(".box_child")
    // destination = la cible qui contient l'élément à supprimer
    let destination = similar_parent.querySelector(".input_box")
    // liste_input_line = la liste de tout les input_line présent dans la destination
    let liste_input_line = destination.querySelectorAll(".input_line")
    // S'il n'y a pas qu'une seule ligne d'input
    if(liste_input_line.length > 1)
    {
        // On définie le dernier index
        let last_index = liste_input_line.length-1
        // On supprime le dernier élément
        liste_input_line[last_index].remove()
    }
    // S'il ne recete qu'une seule ligne
    else
    {
        // On refresh les eventuelle valeurs indiquer dans les input à rien
        let child = liste_input_line[0].querySelectorAll("input")
        child.forEach(input =>
            {
                input.value = ""
            })
    }
    // On update le total de la recette
    update_total_poid_recette()
}

// bouton_calcul_description -> calculer la nouvelle recette, et afficher la boite recette final
function calcul_et_affichage()
{   
    if(input_rempli_calcul())
    {
        calcul_et_affichage_CALCUL()
        calcul_et_affichage_ANIMATION()
    }
}

// correction_de_saisi_description -> Permet de supprimer la couleur rouge d'une erreur de saisi
function refresh_error_saisi(event)
{
    if(event.target.classList.contains("error_saisi"))
    {
        event.target.classList.remove("error_saisi")
    }
}
//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction utiliser dans les fonctions appliquer dans les listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Fonction pour lancer l'animation de disparition et d'apparition
function calcul_et_affichage_ANIMATION()
{
    let vanish_box = document.getElementById("programme_box_button")
    let appear_box = document.getElementById("programme_box")
    vanish_box.classList.add("disparition")
    setTimeout(() => {
        vanish_box.style.display = "none"
        appear_box.style.display = "flex"
        appear_box.classList.add("apparition")
    }, 200);
}

// Fonction pour calculer la recette
function calcul_et_affichage_CALCUL()
{
    // On reverifie les champs saisi pour le bouton recalcule
    if(input_rempli_calcul())
    {
        // Calcul, affiche, et renvoi le total de la recette attendu
        let poid_total = recette_voulu_CALCUL_TOTAL()
        // Calcul, affiche, et renvoi le coefficient multiplicateur
        let coefficient_multiplicateur = parseFloat(recette_voulu_CALCUL_COEF(poid_total))
        // Calcul, affiche la recette final
        recette_voulu_CALCUL_RECETTE(coefficient_multiplicateur)
        // Affiche le recap des produits voulu
        recette_voulu_AFFICH_RECAP() 
    }
    
}

// Fonction pour enregistrer la recette dans la base de donnée
function save_recette()
{
    // On verifie qu'un nom de recette a été rempli
    let nom_recette = document.getElementById("name_recette")
    if(!nom_recette.value)
    {
        nom_recette.classList.add("error_saisi")
        return alert("Merci de saisir un nom pour la recette")
    }
    // On verifie ensuite que tout les inputs sont rempli, et conforme aux attentes de valeurs
    if(!input_rempli_save())
    {
       return
    }
    // Quand ces conditions sont rempli, on récupère toutes les informations qui seront nécessaires pour enregistrer la recette ( Nom de la recette, ingredient, poid )
    let nom_recette_value = nom_recette.value
    let inputs_user_recette_ingredient = document.querySelectorAll(".user_recette_ingredient")
    let inputs_user_recette_poid = document.querySelectorAll(".user_recette_poid")
    // on initialise un object qui sera ensuite envoyer à PHP qui contiendra toutes les informations, avec déjà le nom de la recette et le tableau qui contiendra les nom d'ingrédient et quantité de la recette
    let datas = 
    {
        "recette_name" : nom_recette_value,
        "ingredient_poid" : []
    }

    // On boucle pour envoyer toute les valeurs des inputs dans les tableau
    for(let i = 0; i< inputs_user_recette_ingredient.length; i++)
    {
        // Dans datas["ingredient_poid"] on push des objet contenant les valeurs pour chaques lines
        datas["ingredient_poid"].push(
            {
                nom : inputs_user_recette_ingredient[i].value,
                poid : inputs_user_recette_poid[i].value
            }
        )
    }

    // L'objet datas est pret à etre envoyer, on effectue une requete XML pour l'envoyer au fichier save_recette_treatment.php

    // On converti datas en json
    json_datas = JSON.stringify(datas)

    // query = nouvelle instance de XMLHttpRequest()
    let query = new XMLHttpRequest()

    // Methode open POST = Va chercher dans save_recette_treatment.php une information
    query.open("POST", "save_recette_treatment.php", true)

    // Je rajoute un header qui dit : ce que je t'envoie, est dans ce format ci
    query.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    // On envoi la requete en passant datas
    query.send("datas="+json_datas)

    // Quand la requête est terminé
    query.onload = function()
    {
        if(query.status === 200)
        {
            // On averti l'utilisateur que la recette est bien enregistrer
            console.log(query.responseText)
        }
    }

    // A la fin, on relance le chargement de la liste de recette, pour la mettre à jour
    load_recette_user_pilote()
}

// Fonction pour faire apparaitre ou disparaitre la liste des recettes utilisateurs
function apparition_disparition_boite_recette()
{
    const boite_list_recette = document.getElementById("my_recette_list")

    boite_list_recette.style.display = getComputedStyle(boite_list_recette).display == "flex" ? "none" : "flex";
}

// Fonction pour générer des inputs pour l'affichage de la recette
function generate_input_line_recette()
{
    let source = document.querySelectorAll(".recette_input_line")[0]
    let copy = source.cloneNode(true)
    let destination = document.getElementById("recette_input_box")
    destination.appendChild(copy)
    console.log(destination)
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonctions d'update */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Update du total poid recette coté utilisateur
function update_total_poid_recette()
{
    const total_poid_recette_user_value = document.getElementById("user_poid_total_recette_value");
    // La liste de tout les inputs poid coté recette
    let liste_user_recette_poid = document.querySelectorAll(".user_recette_poid")
    // on initie le total à 0
    let total = 0
    // On boucle dans la liste pour ajouter les values à total
    liste_user_recette_poid.forEach(input => 
        {
            if(/^\d+(\.\d+)?$/.test(input.value))
            {
                total += parseFloat(input.value)
            }
            else
            {
                total += 0
            }
        })
    // On ajoute le total dans la destination
    total_poid_recette_user_value.innerHTML = total + " g";
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonctions diverse */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Affiche une alerte si tout les champs de saisies nécessaire pour les calculs ont été rempli
function input_rempli_calcul()
{
    // On supprime les ligne d'input totalement vide ( donc inutile )
    suppression_input_line_vide()
    // On verifie si les inputs sont soit vide, soit les inputs ou des nombres son attendu, sont biend es nombres
    let inputs = document.querySelectorAll(".required_calcul")
    for(let i = 0; i< inputs.length; i++)
    {
        if(!inputs[i].value)
        {
            for(let x = 0; x<inputs.length; x++)
            {
                if(!inputs[x].value)
                {
                    inputs[x].classList.add("error_saisi")
                }
            }
            return alert("Tout les champs n'ont pas été rempli")
        }
    }
    let inputs_number = document.querySelectorAll(".required_number")
    for(let i = 0; i< inputs_number.length; i++)
    {
        // Si la chaine contient autre chose que des chiffres
        if(/^\d+(\.\d+)?$/.test(inputs_number[i].value) === false)
        {
            for(let x = 0; x< inputs_number.length; x++)
            {
                if(/^\d+$/.test(inputs_number[x].value) === false)
                {
                   inputs_number[x].classList.add("error_saisi") 
                }
            }
            return alert("Attention de bien enregistrer des nombres dans les champs attendu")
        }
    }
    return true
}
// Affiche une alerte si tout les champs de saisies nécessaire pour la sauvegarde ont été rempli
function input_rempli_save()
{
    // On supprime les ligne d'input totalement vide ( donc inutile )
    suppression_input_line_vide()
    // On verifie si les inputs sont soit vide, soit les inputs ou des nombres son attendu, sont biend es nombres
    let inputs = document.querySelectorAll(".required_save")
    for(let i = 0; i< inputs.length; i++)
    {
        if(!inputs[i].value)
        {
            for(let x = 0; x<inputs.length; x++)
            {
                if(!inputs[x].value)
                {
                    inputs[x].classList.add("error_saisi")
                }
            }
            return alert("Tout les champs n'ont pas été rempli")
        }
    }
    return true
}
// Calcul le total de la recette voulu et l'affiche dans le destination, renvoi le total
function recette_voulu_CALCUL_TOTAL()
{
    // On initie le total à 0
    let total = 0
    // On récupère toutes les inputs concernant le nombre attendu par produit
    let nombre_produit_voulu = document.querySelectorAll(".user_product_number")
    // On récupère toutes les inputs concernant le poid attendu par produit
    let poid_produit_voulu = document.querySelectorAll(".user_product_poid")

    // On boucle pour ajouter au total ( Les indices correspondront, il y a strictement autant de nombre de produit voulu que de poid de ces produits)
    for(let i = 0; i<nombre_produit_voulu.length; i++)
    {
        let poid = parseInt(poid_produit_voulu[i].value)
        let nombre = parseInt(nombre_produit_voulu[i].value)
        let resultat = poid * nombre

        total += resultat
    }

    // On définie la destination
    let destination = document.getElementById("programme_poid_total_value")
    destination.innerHTML = total + " g"
    return total
}
// Calcul le coefficient multiplicateur et l'affiche dans la destination, renvoi le coefficient
function recette_voulu_CALCUL_COEF(poid_total)
{
    // x = le total de la recette attendu
    // On va récupérer le poid total de la recette saisi par l'utilisateur
    let poid_total_recette_user = document.getElementById("user_poid_total_recette_value")
    // on effectuer le calcul du coefficient avec ces deux totaux, en augmentant le coeficient de 0.01 pour la pesé
    let coefficient_mutliplicateur = (poid_total / parseFloat(poid_total_recette_user.innerHTML) + 0.01)
    // On définie la destination
    let destination = document.getElementById("programme_coefficient_value")
    // On envoie dans la destination
    destination.innerHTML = coefficient_mutliplicateur.toFixed(2)
    // On retourne le resultat
    return coefficient_mutliplicateur.toFixed(2)
}
// Calcul grâce au coefficient et affiche la recette dans la destination
function recette_voulu_CALCUL_RECETTE(coefficient_multiplicateur)
{
    // On récupère toutes les inputs recette coté user
    let ingredients = document.querySelectorAll(".user_recette_ingredient")
    let poids = document.querySelectorAll(".user_recette_poid")

    // On définie la destination
    let destination = document.getElementById("programme_recette_box")
    // On reset la destination ( pour le recalcul )
    destination.innerHTML = ""

    // On boucle dans toutes nos inputs récupérer
    for(let i = 0; i< ingredients.length; i++)
    {
        // On multiplie le poid par le coefficient multiplicateur
        let poid = parseFloat(poids[i].value) * coefficient_multiplicateur

        // On créé un template repli des informations d'inputs
        let template = `<div class="programme_recette_line_name">${ingredients[i].value} <i class="fa-solid fa-arrow-right-long"></i></div>
                        <div class="programme_recette_line_total"><span class="programme_recette_line_total_value">${parseInt(poid)} g</span></div>`
        
        // On créé un nouvel élément html
        let nouvel_element = document.createElement("div")
        // On lui définie une classe
        nouvel_element.classList.add("programme_recette_line")
        // On insère le template dans ce nouvel élément
        nouvel_element.innerHTML = template
        // L'élément est prêt, on l'envoie dans la destination
        destination.appendChild(nouvel_element)
    }


}
// Affiche le recap des produits voulu dans le destination
function recette_voulu_AFFICH_RECAP()
{
    // On définie la destination
    let destination = document.getElementById("programme_recap_product_box")
    // On reset le recap ( pour le recalcul )
    destination.innerHTML = ""
    // On récupère les inputs produit_voulu
    let nombres = document.querySelectorAll(".user_product_number")
    let noms = document.querySelectorAll(".user_product_name")
    let poids = document.querySelectorAll(".user_product_poid")
    // On boucle dans ces éléments
    for(let i = 0; i< nombres.length; i++)
    {
        // On créé un nouvel élément
        let nouvel_element = document.createElement("div")
        // On lui définie sa classe
        nouvel_element.classList.add("programme_recap_product_line")
        // On créé un template
        let template = `Pour ${nombres[i].value} ${noms[i].value} à ${poids[i].value} g`
        // On insère le template dans le nouvel élément
        nouvel_element.innerHTML = template
        // On envoi le nouvel élément dans la destination
        destination.appendChild(nouvel_element)
    }
}
// Supprime les ligne d'inputs qui sont totalement vide
function suppression_input_line_vide()
{
    // On récupère les deux gros élément parent
    let all_input_line_recette = document.querySelectorAll(".recette_input_line")
    let nombre_line_recette = all_input_line_recette.length
    all_input_line_recette.forEach(input => 
        {
            let inputs = input.querySelectorAll("input")
            let controle = true
            inputs.forEach(line =>
                {
                    if(line.value)
                    {
                        controle = false
                    }
                })
            if(controle == true)
            {
                if(nombre_line_recette > 1)
                {
                    input.parentNode.removeChild(input)
                }
            }
        })
    
    let all_input_line_product = document.querySelectorAll(".product_input_line")
    let nombre_line_product = all_input_line_product.length
    all_input_line_product.forEach(input => 
        {
            let inputs = input.querySelectorAll("input")
            let controle = true
            inputs.forEach(line =>
                {
                    if(line.value)
                    {
                        controle = false
                    }
                })
            if(controle == true)
            {
                if(nombre_line_product > 1)
                {
                    input.parentNode.removeChild(input)
                }
            }
        })
}