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
    update_muscle_in_database_pilote()
}
//////////////////////////////////////////////
/* Pilote */
//////////////////////////////////////////////

function loading_muscle_pilote()
{
    loading_muscle_from_database()
}

function update_muscle_in_database_pilote()
{
    let champs_muscle = document.querySelectorAll(".muscle_name")
    champs_muscle.forEach(champ => 
        {
            champ.addEventListener("blur", update_muscle_in_database)
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

// update_muscle_in_database_pilote -> Met à jours la base de donnée lorsque l'utilisateur change le nom d'un muscle
function update_muscle_in_database(event)
{
    // On récupère dans un tableau, le nom de tout les muscles dans le document
    let tableau_muscle_name = []
    let all_muscle_name = document.querySelectorAll(".muscle_name")
    for(let i = 0; i<all_muscle_name.length; i++)
    {
        tableau_muscle_name.push(all_muscle_name[i].innerHTML)
    }
    // stringify tableau ?
    // On envoie le tableau au routeur
    let query = XMLrequest("update_muscle", "routeur.php", true, tableau_muscle_name)
    console.log(tableau_muscle_name)
    query.onload = function()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            {
                if(response.status === true)
                {
                    console.log(response)
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