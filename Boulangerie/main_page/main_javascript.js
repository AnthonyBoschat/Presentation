//////////////////////////////////////////////
//////////////////////////////////////////////
/* Récupération du HTML */
//////////////////////////////////////////////
//////////////////////////////////////////////

const   add = document.querySelectorAll(".add"),
        minus = document.querySelectorAll(".minus"),
        total_poid_recette_user_value = document.getElementById("user_poid_total_recette_value"),
        bouton_calculer = document.getElementById("button_calcule");

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

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Description des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

function add_listener_description()
{
    add.forEach(bouton_ajouter =>
        {
            bouton_ajouter.addEventListener("click", cloner_input_line, true)
        })
}

function minus_listener_description()
{
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
    bouton_calculer.addEventListener("click", calcul_et_affichage, true)
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
    for(child in source_clone.children)
    {
        source_clone.children[child].value = ""
    }
    // destination = l'endroit ou envoyer le clone, dans l'élément parent, l'élément clase input_box
    let destination = similar_parent.querySelector(".input_box")
    // On ajoute le clone dans la destination
    destination.appendChild(source_clone)
    // On refresh les listeners pour prendre en compte le nouveau clone
    total_recette_update_pilote()
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

// calculer la nouvelle recette, et afficher la boite recette final
function calcul_et_affichage(event)
{   // A terminer
    let boite_à_disparaitre = document.getElementById("programme_box_button")
    boite_à_disparaitre.style.display = "none"
    let boite_à_apparaitre = document.getElementById("programme_box")
    boite_à_apparaitre.style.display = "flex"
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonctions d'update */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Update du total poid recette coté utilisateur
function update_total_poid_recette()
{
    // La liste de tout les inputs poid coté recette
    let liste_user_recette_poid = document.querySelectorAll(".user_recette_poid")
    // on initie le total à 0
    let total = 0
    // On boucle dans la liste pour ajouter les values à total
    liste_user_recette_poid.forEach(input => 
        {
            if(!isNaN(parseInt(input.value)))
            {
                total += parseInt(input.value)
            }
            else
            {
                total += 0
            }
        })
    // On ajoute le total dans la destination
    total_poid_recette_user_value.innerHTML = total;
}

//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction utiliser dans les fonctions appliquer dans les listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

