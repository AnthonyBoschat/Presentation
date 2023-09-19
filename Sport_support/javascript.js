// Interet de new exercice si load_workout_all ?

//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////
let old_exercice_name = null;
//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////
main()

function main()
{
    loading_muscle_pilote()
    loading_workout_all_pilote()
    capture_old_exercice_name_pilote()
    new_exerice_pilote()
    update_in_database_pilote()
}
//////////////////////////////////////////////
/* Pilote */
//////////////////////////////////////////////
function capture_old_exercice_name_pilote()
{
    let all_exercice_name = document.querySelectorAll(".exercice_name")
    all_exercice_name.forEach(exercice => 
        {
            exercice.removeEventListener("focus", capture_old_exercice_name)
            exercice.addEventListener("focus", capture_old_exercice_name)
        })
}

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

function update_in_database_pilote()
{
    let champs_muscle = document.querySelectorAll(".muscle_name")
    champs_muscle.forEach(champ => 
        {
            champ.addEventListener("blur", update_value_in_database)
        })

    let champs_exercices_name = document.querySelectorAll(".exercice_name")
    champs_exercices_name.forEach(champ => 
        {
            // On retire tout les listener éventuelle sur ces éléments
            champ.removeEventListener("blur", update_value_in_database)
            // On les rajoutes tous
            champ.addEventListener("blur", update_value_in_database)
        })
    
    let champs_value_poid = document.querySelectorAll(".poid_value")
    champs_value_poid.forEach(champ => 
        {
            // On retire tout les listener éventuelle sur ces éléments
            champ.removeEventListener("blur", update_value_in_database)
            // On les rajoutes tous
            champ.addEventListener("blur", update_value_in_database)
        })
    
    let champs_value_repos = document.querySelectorAll(".repos_value")
    champs_value_repos.forEach(champ => 
        {
            champ.removeEventListener("blur", update_value_in_database)
            champ.addEventListener("blur", update_value_in_database)
        })

    let buttons_delete = document.querySelectorAll(".fa-trash")
    buttons_delete.forEach(button => 
        {
            button.removeEventListener("click", update_value_in_database)
            button.addEventListener("click", update_value_in_database)
        })

    let validation_buttons = document.querySelectorAll(".check")
    validation_buttons.forEach(bouton => 
        {
            bouton.removeEventListener("click",update_value_in_database)
            bouton.addEventListener("click",update_value_in_database)
        })
}

function loading_workout_all_pilote()
{
    loading_workout_all()
}

function delete_exercice_in_database_pilote()
{
    let buttons_delete = document.querySelectorAll(".fa-trash")
    buttons_delete.forEach(button => 
        {
            button.removeEventListener("click", update_value_in_database)
            button.addEventListener("click", update_value_in_database)
        })
}

//////////////////////////////////////////////
/* Fonction des pilotes */
//////////////////////////////////////////////

//capture_old_name_exercice_pilote -> Permet de sauvegarder le nom de l'exercice avant sa modification
function capture_old_exercice_name(event)
{
    old_exercice_name = event.target.innerHTML
}

// loading_muscle_pilote -> Charge les muscles présent dans la base de donnée "muscle"
function loading_muscle_from_database()
{
    // On récupère toutes les destination
    let muscles_destinations = document.querySelectorAll(".muscle_name")
    // On Envoie une requête au fichier routeur php
    let query = XMLrequest("POST","load_muscle", "routeur.php", false)
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
    // On demande le nom de l'exercice
    let exercice_name = window.prompt("Nom de l'exercice ?")
    if(exercice_name)
    {
        // on cherche l'élément parent day le plus proche
        let parent_element = event.target.closest(".day")
        // On récupère le groupe musculaire concerné
        let groupe_musculaire = parent_element.querySelector(".muscle_name").innerHTML

        // On initialisa maintenant toute les base de donnée
        // On créé un objet
        let object = {}
        // On rempli l'objet
        object.groupe_musculaire = groupe_musculaire
        object.exercice_name = exercice_name
        // On converti en JSON l'objet
        let object_JSON = JSON.stringify(object)
        // On injecte dans la base de donnée le template vierge d'un nouvel exercice
        let query = XMLrequest("POST","new_exercice", "routeur.php", true, object_JSON);

        query.onload = function()
        {
            if(query.status === 200)
            {
                let response = JSON.parse(query.responseText)
                {
                    if(response.status === true)
                    {
                        // On charge toute la page
                        loading_workout_all()
                        console.log("Un nouvel exercice a été initialiser")
                    }
                    else if(response.status === false)
                    {
                        window.alert("Ce nom d'exercice existe déjà")
                    }
                }
            }
        }
    }
}

// Sert à modifier une information dans la base de donnée
function update_value_in_database(event)
{
    let classes = event.target.classList
    if(classes.contains("muscle_name"))
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
                all_muscle_name[i].innerHTML = "(non renseigné)"
                tableau_muscle_name.push(all_muscle_name[i].innerHTML)
            }
        }
        // On converti le tableau
        let tableau_muscle_name_JSON = JSON.stringify(tableau_muscle_name)
        // On envoie le tableau au routeur
        let query = XMLrequest("POST","update_muscle", "routeur.php", true, tableau_muscle_name_JSON)
        query.onload = function()
        {
            if(query.status === 200)
            {
                let response = JSON.parse(query.responseText)
                {
                    if(response.status === false)
                    {
                        console.log("Problème lors de la reception de data")
                    }
                }
            }
        }
    }
    else if(classes.contains("exercice_name"))
    {
        // On initialise un objet
        let object = {}
        // On récupère le nom du groupe musculaire concerner
        let parent = event.target.closest(".day")
        let groupe_musculaire = parent.querySelector(".muscle_name").innerHTML
        // On récupère le innerHTML du champ en cour de modification
        let exercice_name = event.target.innerHTML
        // On stock ça dans un objet
        object.exercice_name = exercice_name
        object.groupe_musculaire = groupe_musculaire
        object.old_exercice_name = old_exercice_name
        // On converti
        let object_JSON = JSON.stringify(object)
        // On envoie l'information au routeur
        let query = XMLrequest("POST","update_exercice_name", "routeur.php", true, object_JSON)

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
                        console.log("Problème lors du traitement de la requête")
                    }
                }
            }
        }
    }
    else if(classes.contains("poid_value"))
    {
        // On initialise un objet
        let object = {}
        // On récupère le nom de l'exercice concerner
        let parent = event.target.closest(".box_description_check")
        let parent_previous = parent.previousElementSibling
        let exercice_name = parent_previous.querySelector(".exercice_name").innerHTML
        
        // On récupère le poid
        let poid = event.target.innerHTML
        // On stock ça dans l'objet
        object.exercice_name = exercice_name
        object.poid = poid
        // On converti
        let object_JSON = JSON.stringify(object)
        // On envoie l'information au routeur
        let query = XMLrequest("POST","update_poid", "routeur.php", true, object_JSON)

        query.onload = function()
        {
            if(query.status === 200)
            {
                let response = JSON.parse(query.responseText)
                {
                    if(response.status === true)
                    {
                        console.log("Le poid a été mis à jour")
                    }
                    else if(response.status === false)
                    {
                        console.log("Problème lors du traitement de la requête")
                    }
                }
            }
        }
    }
    else if(classes.contains("repos_value"))
    {
        // On initialise un objet
        let object = {}
        // On récupère le nom de l'exercice concerner
        let parent = event.target.closest(".box_description_check")
        let parent_previous = parent.previousElementSibling
        let exercice_name = parent_previous.querySelector(".exercice_name").innerHTML

        // On récupère le repos
        let repos = event.target.innerHTML

        // On stock ça dans l'objet
        object.exercice_name = exercice_name
        object.repos = repos
        // On converti
        let object_JSON = JSON.stringify(object)
        // On envoie l'information au routeur
        let query = XMLrequest("POST","update_repos", "routeur.php", true, object_JSON)

        query.onload = function()
        {
            if(query.status === 200)
            {
                let response = JSON.parse(query.responseText)
                if(response.status === true)
                {
                    console.log("Le repos a été mis à jour")
                }
                else if(response.status === false)
                {
                    console.log("Problème lors du traitement de la requête")
                }
            }
        }
    }
    else if(classes.contains("fa-trash"))
    {
        let question = window.confirm("Supprimer cet exercice ?")
        if(question)
        {
            // On initialise un objet
            let object = {}
            // On récupère le nom de l'exercice
            let parent = event.target.closest(".exercice_control")
            let exercice_name = parent.querySelector(".exercice_name").innerHTML
            console.log(exercice_name)
            // On stock dans l'objet
            object.exercice_name = exercice_name
            // On converti en JSON
            let object_JSON = JSON.stringify(object)
            // On envoi l'information au routeur
            let query = XMLrequest("POST", "delete_exercice", "routeur.php", true, object_JSON)

            query.onload = function ()
            {
                if(query.status === 200)
                {
                    let response = JSON.parse(query.responseText)
                    {
                        if(response.status === true)
                        {
                            loading_workout_all()
                            console.log("L'exercice a été correctement supprimer")
                        }
                    }
                }
            }
        }
        
    }
    else if(classes.contains("check_valid"))
    {
        // Envoyer une requete XML avec pour information le nom de l'exercice, le poid et les repetition
        // switch case pour les repetitions
        // On envoie dans le fichier les informations qui va gérer selon les information donné
        // 1 --- 6 ou 8 repetition -> on augmente la repetiion de 2 dans la base de donnée pour l'exercice -> refresh (js)
        // 2 --- 10 repetition -> On verifie en php dans la BDD si le controle est à 0 ou 1
        // -> 0 -> passe à 1 -> refresh (js)
        // -> 1 -> passe les repetition à 6, le controle à 0, le poid à +2.5 -> refresh (js)
        // On initialise un objet
        let object = {}
        // On récupère le nom de l'exercice, le poid, les repetitions
        let parent = event.target.closest(".box_description_check")
        let parent_previous = parent.previousElementSibling
        let exercice_name = parent_previous.querySelector(".exercice_name").innerHTML
        let poid = parent.querySelector(".poid_value").innerHTML
        let repetition = parent.querySelector(".repetition_value").innerHTML
        // On demande la confirmation de la réussite
        let confirmation = window.confirm(`L'exercice ${exercice_name} a été réussi ?`)
        if(confirmation)
        {
            // On rempli l'objet
            object.exercice_name = exercice_name
            object.poid = poid
            object.repetition = repetition
            // On converti l'objet
            let object_JSON = JSON.stringify(object)
            // On envoi l'objet au routeur
            let query = XMLrequest("POST", "update_repetition_controle", "routeur.php", true, object_JSON)

            query.onload = function()
            {
                if(query.status === 200)
                {
                    let response = JSON.parse(query.responseText)
                    if(response.status === true)
                    {
                        loading_workout_all()
                    }
                    else if(response.status === false)
                    {
                        console.log("Probleme avec le traitement de la requête")
                    }
                }
            }
        }
        
    }
    else if(classes.contains("check_invalid"))
    {
        // On envoie le nom de l'exercice pour simplement modifier son validate
        let object = {}
        // On récupère le nom de l'exercice
        let parent = event.target.closest(".box_description_check")
        let parent_previous = parent.previousElementSibling
        let exercice_name = parent_previous.querySelector(".exercice_name").innerHTML
        // On demande la confirmation de l'echec
        let confirmation = window.confirm(`L'exercice ${exercice_name} a été un échec ?`)
        if(confirmation)
        {
            // On rempli l'objet
            object.exercice_name = exercice_name
            // On converti l'objet
            let object_JSON = JSON.stringify(object)
            // On envoi l'objet au routeur
            let query = XMLrequest("POST", "invalid_exercice", "routeur.php", true, object_JSON)

            query.onload = function ()
            {
                if(query.status === 200)
                {
                    loading_workout_all()
                }
            }
        }
    }
}

// Récupère et affiche tout les exercice éxistant dans la base de donnée
function loading_workout_all()
{
    // On créé une requête pour récupérer les exercices et leurs descriptions présent dans la base de donnée
    let query = XMLrequest("POST","load_all_workout", "routeur.php", false)

    query.onload = function ()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            // on stock l'objet
            let object = response.data
            // On récupère tout les champs de groupe musculaire
            let muscles_list = document.querySelectorAll(".muscle_name")
            // On réinitialise tout l'affichage
            let exercice_afficher = document.querySelectorAll(".workout")
            exercice_afficher.forEach(champ => 
                {
                    champ.innerHTML = ""
                })
            // On boucle dans l'object retourner par php
            for(index in object)
            {
                muscles_list.forEach(muscle => 
                    {
                        if(muscle.innerHTML == object[index].muscle_name)
                        {
                            let groupe_musculaire = muscle
                            let parent = groupe_musculaire.closest(".day")
                            let destination = parent.querySelector(".workout")

                            // On créé deux nouvels élément
                            let new_element_1 = document.createElement("div")
                            let new_element_2 = document.createElement("div")
                            // On leurs donne une classe
                            if(object[index].validate === 1)
                            {
                                new_element_1.classList.add("exercice_control", "grey_dark", "validate")
                                new_element_2.classList.add("box_description_check", "grey_light", "validate")
                            }
                            else if(object[index].validate === 0)
                            {
                                new_element_1.classList.add("exercice_control", "grey_dark")
                                new_element_2.classList.add("box_description_check", "grey_light")
                            }
                            // On créé les templates de leurs enfants
                            let template_element_1 = `
                            <div class="exercice_name" contenteditable="true">${object[index].exercice_name}</div>
                            <div class="exercice_delete"><i class="fa-solid fa-trash"></i></div>
                            `

                            let template_element_2 = `
                            <div class="box_description">
                                <div class="repetition">4 X <span class="repetition_value">${object[index].repetition}</span></div>
                                <div class="poid"><span class="poid_value" contenteditable="true">${object[index].poid}</span> Kg</div>
                                <div class="repos"><span class="repos_value" contenteditable="true">${object[index].repos}</span> min</div>
                            </div>
                            <div class="box_check">
                                <div class="check_box hover_green"><i class="check check_valid fa-solid fa-check"></i></div>
                                <div class="check_box hover_red"><i class="check check_invalid fa-solid fa-xmark"></i></div>
                            </div>
                            `
                            // On assemble les éléments
                            new_element_1.innerHTML = template_element_1
                            new_element_2.innerHTML = template_element_2
                            // On envoie les éléments dans la destination
                            destination.appendChild(new_element_1)
                            destination.appendChild(new_element_2)
                        }
                    })
            }

            // On applique le listener de capture d'ancien nom d'exercice avant modification
            capture_old_exercice_name_pilote()
            // On réinitialise tout les listeners de changement d'information dans la base de donnée
            update_in_database_pilote()
            // On verifie si tout les exercices d'une journée ont été réalisé
            verification_workout_day()
            // On verifie si la semaine est terminer
            verification_workout_week()
        }
    }
}

function verification_workout_day()
{
    let days = document.querySelectorAll(".workout")
    days.forEach(day => 
        {
            if(day.innerHTML != "")
            {
                let exercices_of_day = day.querySelectorAll(".exercice_control")
                let controle = true
                exercices_of_day.forEach(exercice => 
                    {
                        if(!exercice.classList.contains("validate"))
                        {
                            controle = false
                        }
                    })

                if(controle === true)
                {
                    let groupe_musculaire_of_the_day = day.previousElementSibling
                    groupe_musculaire_of_the_day.classList.add("validate")
                }
            }
            
        })
}

function verification_workout_week()
{
    // On verifie si tout les groupes musculaire ont la classe validate
    let groupes_musculaire = document.querySelectorAll(".muscle")
    let controle = true
    groupes_musculaire.forEach(groupe_musculaire => 
        {
            if(!groupe_musculaire.classList.contains("validate"))
            {
                controle = false
            }
        })
    // S'ils les possèdent tous, on réinitialise tout les validate de la base de donnée, et les classes
    if(controle === true)
    {
        let element_with_validate_classe = document.querySelectorAll(".validate")
        element_with_validate_classe.forEach(element => 
            {
                XMLrequest("POST", "reset_validate", "routeur.php", false)
                element.classList.remove("validate")
            })
        window.alert("Félicitation pour avoir terminer cette semaine !")
    }
}
