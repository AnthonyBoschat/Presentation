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
    correction_de_saisi_pilote()
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
function calcul_et_affichage(event)
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
/* Fonctions diverse */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Affiche une alerte si tout les champs de sdaisie n'ont pas été rempli
function input_rempli()
{
    let input = document.querySelectorAll(".required")
    for(let i = 0; i< input.length; i++)
    {
        if(!input[i].value)
        {
            return alert("Tout les champs n'ont pas été rempli")
        }
    }
    let input_number = document.querySelectorAll(".required_number")
    for(let i = 0; i< input_number.length; i++)
    {
        if(isNaN(parseInt(input_number[i].value)))
        {
            for(let x = 0; x< input_number.length; x++)
            {
                input_number[x].classList.add("error_saisi")
            }
            return alert("Attention de bien enregistrer des nombres dans les champs attendu")
        }
    }
    return true
}
