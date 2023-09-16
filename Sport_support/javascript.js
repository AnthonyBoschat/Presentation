//////////////////////////////////////////////
/* Récupération du HTML */
//////////////////////////////////////////////

//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////
main()

function main()
{
    loading_muscle_pilote()
    new_exerice_pilote()
    update_muscle_in_database_pilote()
    update_exercice_name_in_database_pilote()
}
//////////////////////////////////////////////
/* Pilote */
//////////////////////////////////////////////

function loading_muscle_pilote()
{
    loading_muscle_from_database()
}

function new_exerice_pilote()
{
    let boutons_new_exercice = document.querySelectorAll(".new_exercice")
    boutons_new_exercice.forEach(bouton => 
        {
            bouton.addEventListener("click", create_new_exercice)
        })
}

function update_muscle_in_database_pilote()
{
    let champs_muscle = document.querySelectorAll(".muscle_name")
    champs_muscle.forEach(champ => 
        {
            champ.addEventListener("blur", update_muscle_in_database)
        })
}

function update_exercice_name_in_database_pilote()
{
    let champs_exercices_name = document.querySelectorAll(".exercice_name")
    champs_exercices_name.forEach(champ => 
        {
            // On retire tout les listener éventuelle sur ces éléments
            champ.removeEventListener("blur", update_exercice_name_in_database)
            // On les rajoutes tous
            champ.addEventListener("blur", update_exercice_name_in_database)
        })
}

//////////////////////////////////////////////
/* Fonction des pilotes */
//////////////////////////////////////////////

// loading_muscle_pilote -> Charge les muscles présent dans la base de donnée "muscle"
function loading_muscle_from_database()
{
    // On récupère toutes les destination
    let muscles_destinations = document.querySelectorAll(".muscle_name")
    // On Envoie une requête au fichier routeur php
    let query = XMLrequest("load_muscle", "routeur.php", false)
    // Quand on a la réponse du routeur
    query.onload = function ()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            if(response.status === true)
            {
                // On boucle pour injecter le noms des muscles présent dans la base de donnée dans les destinations
                for(let i = 0; i < response.response.length; i++)
                {
                    let muscle_name = response.response[i].muscle_name
                    muscles_destinations[i].innerHTML = muscle_name
                }
            }
        }
        else
        {
            console.log("erreur")
        }
    }
}

// new_exercice_pilote -> Charge un nouvel exercice vierge
function create_new_exercice(event)
{
    // on cherche l'élément parent day le plus proche
    let parent_element = event.target.closest(".day")
    // on définie la destination dans l'élément parent
    let destination = parent_element.querySelector(".workout")
    // On créé deux nouvels élément
    let new_element_1 = document.createElement("div")
    let new_element_2 = document.createElement("div")
    // On leurs donne une classe
    new_element_1.classList.add("exercice_control")
    new_element_2.classList.add("box_description_check")
    // On créé les templates de leurs enfants
    let template_element_1 = `
    <div class="exercice_name" contenteditable="true">Exercice</div>
    <div class="exercice_view"><i class="fa-regular fa-eye"></i></div>
    `

    let template_element_2 = `
    <div class="box_description">
        <div class="repetition">4 X <span class="repetition_value" contenteditable="true">0</span></div>
        <div class="poid"><span class="poid_value" contenteditable="true">0</span> Kg</div>
        <div class="repos"><span class="repos_value" contenteditable="true">0</span> min</div>
    </div>
    <div class="box_check">
        <div class="check hover_green"><i class="fa-solid fa-check"></i></div>
        <div class="check hover_red"><i class="fa-solid fa-xmark"></i></div>
    </div>
    `
    // On assemble les éléments
    new_element_1.innerHTML = template_element_1
    new_element_2.innerHTML = template_element_2
    // On envoie les éléments dans la destination
    destination.appendChild(new_element_1)
    destination.appendChild(new_element_2)

    // On réinitialise les listeners d'update de nom, et value, pour prendre en compte le nouvel élément
    update_exercice_name_in_database_pilote()
}

// update_muscle_in_database_pilote -> Met à jours la base de donnée lorsque l'utilisateur change le nom d'un muscle
function update_muscle_in_database()
{
    // On récupère dans un tableau, le nom de tout les muscles dans le document
    let tableau_muscle_name = []
    let all_muscle_name = document.querySelectorAll(".muscle_name")
    for(let i = 0; i<all_muscle_name.length; i++)
    {
        if(all_muscle_name[i].innerHTML != "")
        {
            tableau_muscle_name.push(all_muscle_name[i].innerHTML)
        }
        else
        {
            console.log("controle")
            all_muscle_name[i].innerHTML = "(non renseigné)"
            tableau_muscle_name.push(all_muscle_name[i].innerHTML)
        }
    }
    // On converti le tableau
    let tableau_muscle_name_JSON = JSON.stringify(tableau_muscle_name)
    // On envoie le tableau au routeur
    let query = XMLrequest("update_muscle", "routeur.php", true, tableau_muscle_name_JSON)
    query.onload = function()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            {
                if(response.status === true)
                {
                    console.log("Groupe musculaire mise à jour")
                }
                else if(response.status === false)
                {
                    console.log("Problème lors de la reception de data")
                }
            }
        }
    }
}

// update_exercice_name_in_database_pilote -> Met à jour le nom de l'exerice dans la base de donnée
function update_exercice_name_in_database(event)
{
    // On initialise un objet
    let object = {
    }
    // On récupère le nom du groupe musculaire concerner
    let parent = event.target.closest(".day")
    let groupe_musculaire = parent.querySelector(".muscle_name").innerHTML
    // On récupère le innerHTML du champ en cour de modification
    let exercice_name = event.target.innerHTML
    // On stock ça dans un objet
    object.exercice_name = exercice_name
    object.groupe_musculaire = groupe_musculaire
    console.log(object)
    // On converti
    let object_JSON = JSON.stringify(object)
    // On envoie l'information au routeur
    let query = XMLrequest("update_exercice_name", "routeur.php", true, object_JSON)

    query.onload = function()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            {
                if(response.status === true)
                {
                    console.log("Nom de l'exercice mise à jour")
                }
                else if(response.status === false)
                {
                    console.log("Problème lors de la reception de data")
                }
            }
        }
    }
}


//////////////////////////////////////////////
/* Fonctino de requête XML */
//////////////////////////////////////////////
function XMLrequest(identification, destination, bool, data = null)
{
    if(bool === false)
    {
        let XML_request = new XMLHttpRequest()
        XML_request.open("POST", destination, true)
        XML_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        XML_request.send(`query=${identification}`)
        return XML_request
    }
    else if(bool === true)
    {
        if(data != null)
        {
            let XML_request = new XMLHttpRequest()
            XML_request.open("POST", destination, true)
            XML_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            XML_request.send(`query=${identification}&data=${data}`)
            return XML_request
        }
        
    }
    
}