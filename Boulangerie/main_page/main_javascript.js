//////////////////////////////////////////////
//////////////////////////////////////////////
/* Récupération du HTML */
//////////////////////////////////////////////
//////////////////////////////////////////////

const   add = document.querySelectorAll(".add"),
        minus = document.querySelectorAll(".minus");

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
}