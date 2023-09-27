//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////
let categorie_selected = null
let user_name = document.querySelector("#user_name").innerHTML

//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////
main()

function main()
{
    load_categorie_for_this_user_pilote()
    initialize_listener_pilote()
}

//////////////////////////////////////////////
/* Pilote */
//////////////////////////////////////////////

function load_categorie_for_this_user_pilote()
{
    let object = {}
    object.user_name = user_name
    let object_JSON = JSON.stringify(object)
    let query = XMLrequest("POST", "load_categorie_for_this_user", "routeur.php", true, object_JSON)
    onload(query, function(response)
    {
        if(response)
        {
            let destination = document.querySelector("#destination_categorie_box")
            destination.innerHTML = ""
            response.data.forEach(categorie => 
                {
                    let template = `<span class="categorie">${categorie["todo_categorie"]}</span>`
                    destination.insertAdjacentHTML("afterbegin", template)
                })
            let template_for_creation_new_categorie = `<span id="add_categorie">(Ajouter une catégorie)</span>`
            destination.insertAdjacentHTML("beforeend", template_for_creation_new_categorie)
            initialize_listener_pilote()
        }
    })
}


function initialize_listener_pilote()
{
    let buttons_categorie = document.querySelectorAll(".categorie"),
        button_new_todo = document.querySelector("#new_todo"),
        button_change_color_new_todo = document.querySelector("#new_todo_color"),
        button_save_new_todo = document.querySelector("#enregistrer_new_todo"),
        button_new_categorie = document.querySelector("#add_categorie");
    
    buttons_categorie.forEach(button => 
    {
        button.removeEventListener("click", load_todos_for_this_categorie)
        button.addEventListener("click", load_todos_for_this_categorie)
    })

    if(button_new_todo != null)
    {
        button_new_todo.removeEventListener("click", overlay_new_todo_display_on)
        button_new_todo.addEventListener("click", overlay_new_todo_display_on) 
    }
    

    button_change_color_new_todo.removeEventListener("change", change_background_color_of_new_todo_box)
    button_change_color_new_todo.addEventListener("change", change_background_color_of_new_todo_box)

    button_save_new_todo.removeEventListener("click", enregistrer_new_todo)
    button_save_new_todo.addEventListener("click", enregistrer_new_todo)

    if(button_new_categorie != null)
    {
        button_new_categorie.removeEventListener("click", create_new_categorie)
        button_new_categorie.addEventListener("click", create_new_categorie)
    }
    
}

//////////////////////////////////////////////
/* Fonction des pilotes */
//////////////////////////////////////////////

// Charge tout les todos existant pour la categorie selectionner
function load_todos_for_this_categorie(event)
{
    // On change la valeur de la variable categorie_selected
    change_categorie_selected(event)
    load_all_todo_for_this_categorie()
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
    boite_creation_new_todo.style.boxShadow = `0px 0px 50px 1px ${event.target.value} inset`
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
                // On recharge les todo
                load_all_todo_for_this_categorie()
                console.log("Nouvelle tâche enregistrer dans la base de donnée")
            }
        }
    }
}

// Enregistre une nouvelle categorie
function create_new_categorie()
{
    let name_of_new_categorie = window.prompt("Nom de la nouvelle categorie ?")
    if(name_of_new_categorie)
    {
        let object = {}
        object.user_name = user_name
        object.categorie_name = name_of_new_categorie
        let object_JSON = JSON.stringify(object)
        let query = XMLrequest("POST", "create_new_categorie_for_this_user", "routeur.php", true, object_JSON)
        onload(query, function(response)
        {
            if(response)
            {
                console.log("Nouvelle categorie enregistrer avec succès")
                load_categorie_for_this_user_pilote()
            }
        })
    }
}
//////////////////////////////////////////////
/* Special */
//////////////////////////////////////////////


// change la categorie selectionner
function change_categorie_selected(event)
{
    categorie_selected = event.target.innerHTML
}

// Charge les todos pour la categorie selectionner
function load_all_todo_for_this_categorie()
{
    let object = {}
    object.todo_categorie = categorie_selected
    object.user_name = user_name
    let object_JSON = JSON.stringify(object) 
    let query = XMLrequest("POST", "load_todos_for_this_categorie", "routeur.php", true, object_JSON)
    onload(query, function(response)
    {
        if(response)
        {
            let destination = document.querySelector("#list_box")
            destination.innerHTML = ""
            // On créé le cadre de creation de todo :
            let template_create_new_todo = `
            <div class="todo" id="new_todo">
                <div class="new_todo_box">
                    <span><i class="fa-solid fa-plus"></i></span>
                </div>
            </div>
            `
            destination.insertAdjacentHTML("beforeend", template_create_new_todo)
            // on boucle dans response.data pour insert les tâches correspondantes
            response.data.forEach(todo => 
                {
                    let template_todo = ` <div class="todo" style="box-shadow: 0px 0px 20px 0px black inset, 0px 0px 200px -50px ${todo["todo_color"]} inset, 5px 5px 10px black;">
                                            <div class="todo_option">
                                                <div class="parameter_box"><i class="fa-solid fa-check parameter"></i><i class="fa-solid fa-gear parameter"></i></div>
                                            </div>

                                            <div class="todo_content">
                                                <span class="content">${todo["todo_content"]}</span>
                                            </div>
                                        </div>`
                    destination.insertAdjacentHTML("beforeend", template_todo)
                })
            // On réapplique les listener
            initialize_listener_pilote()

        }
        else{console.log("Echec du traitement de la requête")}
    })
}