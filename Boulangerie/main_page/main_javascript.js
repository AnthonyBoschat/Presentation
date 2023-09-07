//////////////////////////////////////////////
//////////////////////////////////////////////
/* Programme principal */
//////////////////////////////////////////////
//////////////////////////////////////////////

main()

function main()
{
    add_listener_pilote()
    minus_listener_pilote()
    total_recette_update_pilote()
    bouton_calcul_pilote()
    bouton_recalcul_pilote()
    correction_de_saisi_pilote()
    bouton_save_recette_pilote()
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Application des pilotes listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

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

function correction_de_saisi_pilote()
{
    correction_de_saisi_description()
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Description des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

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
    const bouton_save_recette = document.getElementById("save_recette")

    bouton_save_recette.addEventListener("click", save_recette ,true)
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
    if(input_rempli())
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
    if(input_rempli())
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
    if(!input_rempli())
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

    console.log(datas)

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

// Affiche une alerte si tout les champs de saisies n'ont pas été rempli
function input_rempli()
{
    // On supprime les ligne d'input totalement vide ( donc inutile )
    suppression_input_line_vide()
    // On verifie si les inputs sont soit vide, soit les inputs ou des nombres son attendu, sont biend es nombres
    let inputs = document.querySelectorAll(".required")
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