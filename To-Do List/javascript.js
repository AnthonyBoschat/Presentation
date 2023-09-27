//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////
let categorie_selected = null

//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////
main()

function main()
{
    initialize_listener_pilote()
}

//////////////////////////////////////////////
/* Pilote */
//////////////////////////////////////////////
function initialize_listener_pilote()
{
    let buttons_categorie = document.querySelectorAll(".categorie"),
        button_new_todo = document.querySelector("#new_todo"),
        button_change_color_new_todo = document.querySelector("#new_todo_color"),
        button_save_new_todo = document.querySelector("#enregistrer_new_todo");
    
    buttons_categorie.forEach(button => {button.addEventListener("click", load_todo_for_this_categorie)})
    button_new_todo.addEventListener("click", overlay_new_todo_display_on)
    button_change_color_new_todo.addEventListener("change", change_background_color_of_new_todo_box)
    button_save_new_todo.addEventListener("click", enregistrer_new_todo)
}

//////////////////////////////////////////////
/* Fonction des pilotes */
//////////////////////////////////////////////

// Charge tout les todos existant pour la categorie selectionner
function load_todo_for_this_categorie(event)
{
    // On change la valeur de la variable categorie_selected
    categorie_selected = event.target.innerHTML
    let object = {}
    object.categorie_name = categorie_selected
    let object_JSON = JSON.stringify(object) 
    let query = XMLrequest("POST", "load_todo_for_this_categorie", "routeur.php", true, object_JSON)
    onload(query, function(response)
    {
        if(response)
        {
            console.log("Chargement réussi")
        }
        else{console.log("Echec du traitement de la requête")}
    })
}

// Permet d'afficher l'overlay pour créé un nouveau todo
function overlay_new_todo_display_on()
{
    console.log("controle")
    let overlay = document.querySelector("#new_todo_overlay")
    overlay.style.display = "flex"
}

// Permet de changer la couleur du nouveau todo
function change_background_color_of_new_todo_box(event)
{
    let boite_creation_new_todo = document.querySelector("#new_todo_creation_box")
    boite_creation_new_todo.style.backgroundColor = event.target.value
}

// Permet d'enregistrer le nouveau todo dans la base de donnée
function enregistrer_new_todo()
{
    let object = {}
    let user_name = document.querySelector("#user_name")
    let todo_content = document.querySelector("#new_todo_content")
    let todo_color = document.querySelector("#new_todo_color")
    object.user_name = user_name.innerHTML
    object.todo_content = todo_content.value
    object.todo_color = todo_color.value
    object.todo_categorie = categorie_selected
    let object_JSON = JSON.stringify(object)
    let query = XMLrequest("POST", "save_new_todo", "routeur.php", true, object_JSON)
    query.onload = function()
    {
        if(query.status === 200)
        {
            let response = JSON.parse(query.responseText)
            if(response.status === true)
            {
                // A ce stade le todo est enregistrer
                // On créé un nouveau todo avec ces paramètre
                let destination = document.querySelector("#list_box")
                let new_element = ` <div class="todo" style="background-color: ${todo_color.value}">
                                        <div class="todo_option">
                                            <div class="parameter_box"><i class="fa-solid fa-check parameter"></i><i class="fa-solid fa-gear parameter"></i></div>
                                        </div>

                                        <div class="todo_content">
                                            <span class="content">${todo_content.value}</span>
                                        </div>
                                    </div>`
                destination.insertAdjacentHTML("beforeend", new_element)
                let overlay = document.querySelector("#new_todo_overlay")
                overlay.style.display = "none"
                todo_content.value = ""
                console.log("Nouvelle tâche enregistrer dans la base de donnée")
                console.log(destination)
            }
        }
    }
}

//////////////////////////////////////////////
/* Special */
//////////////////////////////////////////////