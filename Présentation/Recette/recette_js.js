let add = document.querySelectorAll(".img_add"),
    del = document.querySelectorAll(".img_del"),

    liste_nombre_input_recette = document.querySelectorAll(".input_ingredient_poid"),
    liste_nombre_input_produit_voulu = document.querySelectorAll(".input_nom_nombre_poid"),

    user_recette_poids = document.querySelectorAll(".poid_recette"),
    user_produit_voulu_poid = document.querySelectorAll(".poid_produit_voulu"),

    user_recette_total = document.getElementById("recette_user_total"),
    user_produit_voulu_total = document.getElementById("total_poid_cru_produit_voulu"),

    total_recette = 0,
    total_produit_voulu = 0,
    coefficient_multiplicateur = 0,
    poid_total_programme = 0,

    valeur_coefficient_multiplicateur = document.getElementById("coefficient_multiplicateur_value"),
    valeur_poid_total_programme = document.getElementById("poid_total_recette_final_value"),

    bouton_calculer = document.getElementById("bouton_calculer")

programme_principal()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// Programme principal ////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function programme_principal()
{
    appliquer_listener_clic_add()
    appliquer_listener_clic_del()
    appliquer_listener_poid_recette()
    appliquer_listener_bouton_calculer()
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// Fonction ////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// Réinitialisation query_selector_all ////
function réinitialisation_user_recette_poids()
{
    user_recette_poids = document.querySelectorAll(".poid_recette");
}

function réinitialisation_liste_nombre_input_recette()
{
    liste_nombre_input_recette = document.querySelectorAll(".input_ingredient_poid");
}

function réinitialisation_liste_nombre_input_produit_voulu()
{
    liste_nombre_input_produit_voulu = document.querySelectorAll(".input_nom_nombre_poid");
}

function réinitialisation_user_produit_voulu_poid()
{
    user_produit_voulu_poid = document.querySelectorAll(".poid_produit_voulu");
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Listener /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Listener ajouter une input
function appliquer_listener_clic_add()
{
    add.forEach(add => {

        add.addEventListener("click", function(actual_clic)
        {
            ajouter_une_input(actual_clic)
        })
    
    })
}
// Listener supprimer une input
function appliquer_listener_clic_del()
{
    del.forEach(del => {

        del.addEventListener("click", function(actual_clic)
        {
            supprimer_une_input(actual_clic)
        })
    })
}
// Listener saisie poids dans recette et affichage
function appliquer_listener_poid_recette()
{
    user_recette_poids.forEach(user_recette_poids => {

        user_recette_poids.addEventListener("change", function()
        {
            calcul_total_poid_recette_user()
        })
    
    })
}
// Listener pour le bouton de calcul
function appliquer_listener_bouton_calculer()
{
    bouton_calculer.addEventListener("click", function()
    {
        if(input_rempli())
        {
            calcul_total_poid_recette_final()
            calcul_coefficient_multiplicateur()
            affichage_recette_final()
            pour_quoi() 
        }
        
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Ajouter une input /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ajoute une ligne d'input pour la recette ou pour les produits_voulu
function ajouter_une_input(actual_clic)
{
    if(actual_clic.target.className == "img_add recette" || actual_clic.target.className == "recette")
    {
        clonage_input_recette()
    }

    if(actual_clic.target.className == "img_add produit_voulu" || actual_clic.target.className == "produit_voulu")
    {
        clonage_input_produit_voulu()
    }
    
    
}
// Clonage et placement d'une input recette
function clonage_input_recette()
{
    // Source = ce qu'on veut cloner
    let source = liste_nombre_input_recette[0]

    // Source_clone = clone de la source
    let source_clone = source.cloneNode(true)
    
    // On rétablie les valeurs des enfants du clone à 0, pour ne pas agrder en mémoire la saisie des inputs
    for(child in source_clone.children)
    {
        source_clone.children[child].value = "";
    }

    // Destination = l'endroit ou on veut envoyer le clone
    let destination = document.getElementById("inputs_recette")

    // Envoie du clone dans la destination
    destination.appendChild(source_clone)

    // Réinitialisation des query
    réinitialisation_liste_nombre_input_recette()
    réinitialisation_user_recette_poids()

    // On applique un listener pour le nouvel input
    appliquer_listener_poid_recette()
}
// Clonage et placement d'une input produit_voulu
function clonage_input_produit_voulu()
{
    // Source = ce qu'on veut cloner
    let source = liste_nombre_input_produit_voulu[0]

    // Source_clone = clone de la source
    let source_clone = source.cloneNode(true)

    // On rétablie les valeurs des enfants du clone à 0, pour ne pas agrder en mémoire la saisie des inputs
    for(child in source_clone.children)
    {
        source_clone.children[child].value = "";
    }

    // Destination = l'endroit ou on veut envoyer le clone
    let destination = document.getElementById("inputs_produit_voulu")

    // Envoie du clone dans la destination
    destination.appendChild(source_clone)

    // Réinitialisation des query
    réinitialisation_liste_nombre_input_produit_voulu()
    réinitialisation_user_produit_voulu_poid()
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Supprimer une input /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Supprime la dernière ligne d'input pour la recette ==> affiche le total des valeurs poids
function supprimer_une_input(actual_clic)
{ 
    if(actual_clic.target.className == "img_del recette" || actual_clic.target.className == "recette")
    {
       supression_input_recette() 
    }

    if(actual_clic.target.className == "img_del produit_voulu" || actual_clic.target.className == "produit_voulu")
    {
       supression_input_produit_voulu() 
    }
}
// Supprime la dernière ligne input_recette
function supression_input_recette()
{
    // S'il n'y a pas qu'une seule ligne d'input
    if(liste_nombre_input_recette.length > 1)
    {
        // last_index = dernier index de la liste
        let last_index = liste_nombre_input_recette.length - 1;

        // supression du dernier élément de la liste
        liste_nombre_input_recette[last_index].remove();

        // réinitialisation des query pour prendre en compte les query manquante
        réinitialisation_liste_nombre_input_recette()
        réinitialisation_user_recette_poids()

        // calcule et affiche le résultat des inputs poids restant
        calcul_total_poid_recette_user()
    }

    else if(liste_nombre_input_recette.length == 1)
    {
        user_recette_poids[0].value = ""
        calcul_total_poid_recette_user()
    }
}
// Supprime la dernière ligne input_produit_voulu
function supression_input_produit_voulu()
{
    if(liste_nombre_input_produit_voulu.length > 1)
    {
        // last_index = dernier index de la liste
        let last_index = liste_nombre_input_produit_voulu.length - 1;

        // supression du dernier élément de la liste
        liste_nombre_input_produit_voulu[last_index].remove();

        // réinitialisation des query pour prendre en compte les query manquante
        réinitialisation_liste_nombre_input_produit_voulu()
        réinitialisation_user_produit_voulu_poid()
    }

    else if(liste_nombre_input_produit_voulu.length == 1)
    {
        user_produit_voulu_poid[0].value = ""
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// Calcul /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// calcul et affiche le résultat des inputs poids
function calcul_total_poid_recette_user()
{

    total_recette = 0;

    for(i in user_recette_poids)
    {
        let value = isNaN(parseInt(user_recette_poids[i].value)) ? 0 : parseInt(user_recette_poids[i].value);

        total_recette += value;
    }

    user_recette_total.innerHTML = total_recette + " g"
}

// calcul et affiche le poid final de la recette
function calcul_total_poid_recette_final()
{
    let total_produit_voulu = 0
    let nombre_voulu = document.querySelectorAll(".nombre_produit_voulu")

    for(let i = 0; i < nombre_voulu.length ; i++)
    {
        let poid = isNaN(parseInt(user_produit_voulu_poid[i].value)) ? 0 : parseInt(user_produit_voulu_poid[i].value);
        let nombre = parseInt(nombre_voulu[i].value)
        let resultat = poid * nombre;

        total_produit_voulu += resultat 
    }


    let destination = document.getElementById("poid_total_recette_final_value")
    destination.innerHTML = total_produit_voulu + " g";

    calcul_coefficient_multiplicateur()

    // s'en servir pour calculer coefficient multiplicateur
    //user_produit_voulu_total.innerHTML = total_produit_voulu + " g"

}

// calcul et affiche le coefficient multiplicateur
function calcul_coefficient_multiplicateur()
{
    let total_poid_recette_user = document.getElementById("recette_user_total")
    let total_poid_final = document.getElementById("poid_total_recette_final_value")
    let destination = document.getElementById("coefficient_multiplicateur_value")
    let resultat = (parseInt(total_poid_final.innerHTML) / parseInt(total_poid_recette_user.innerHTML) + 0.01)
    destination.innerHTML = resultat.toFixed(2)

}

// affiche la recette final
function affichage_recette_final()
{
    // ingredients = toute les input ingredient de "ma recette"
    let ingredients = document.querySelectorAll(".ingredient")
    // poid = toute les input poid de "ma recette"
    let poids = document.querySelectorAll(".poid_recette")
    // Définie ou je veux créé un nouvel élément
    let destination = document.getElementById("affichage_recette_box");
    // Récupère le coefficient multiplicateur
    let coefficient_multiplicateur = document.getElementById("coefficient_multiplicateur_value")
    coefficient_multiplicateur = parseFloat(coefficient_multiplicateur.innerHTML)
    coefficient_multiplicateur = coefficient_multiplicateur.toFixed(2)
    // Reset la recette final à chaqeu clique
    destination.innerHTML = ""

    for(let i = 0; i<liste_nombre_input_recette.length ; i++)
    {
        let ingredient = ingredients[i].value
        let poid = parseInt(poids[i].value)
        poid = parseInt((poid * coefficient_multiplicateur))
    
        // créé un template flexible pour les nouvelles lignes à rajouter
        let template = `<div class="recette_final_ingredient">${ingredient}</div>
        <div class="recette_final_poid">${poid} g</div>`

        // Créé un nouvel élément "div" avec la classe "recette_final_ingredient_poid"
        let nouveau = document.createElement("div");
        nouveau.classList = "recette_final_ingredient_poid"
        // Insère le template dans ce nouvel élément
        nouveau.innerHTML = template
        // Ajoute l'élément dans la destination
        destination.appendChild(nouveau)
    }
}

// affiche pour quel recette
function pour_quoi()
{
    let destination = document.getElementById("pour_ces_produits")
    let nombre_input = document.querySelectorAll(".input_nom_nombre_poid")
    let nombres = document.querySelectorAll(".nombre_produit_voulu")
    let noms = document.querySelectorAll(".nom_produit_voulu")
    let poids = document.querySelectorAll(".poid_produit_voulu")

    destination.innerHTML = ""

    for(let i = 0 ; i < nombre_input.length ; i++)
    {
        let nouvel_element = document.createElement("div")
        nouvel_element.classList = "produit"
        let nombre = parseInt(nombres[i].value)
        let nom = noms[i].value
        let poid = parseInt(poids[i].value)

        let template = `Pour ${nombre} ${nom} à ${poid} g`
        nouvel_element.innerHTML = template

        destination.appendChild(nouvel_element)
    }
}

function input_rempli()
{
    let input = document.querySelectorAll(".required")
    
    for(let i = 0 ; i < input.length; i++)
    {
        if(!input[i].value)
        {
            return alert("Veuillez remplir tous les champs d'entrée")
        }
    }

    return true
}







