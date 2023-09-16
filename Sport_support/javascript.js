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
    let query = new XMLHttpRequest()
    query.open("POST", "routeur.php", true)
    query.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    query.send("query=load_recette")
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

function update_muscle_in_database(event)
{
    console.log("controle")
    console.log(event.target)
}