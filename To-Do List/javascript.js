//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////

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
    let button_new_todo = document.querySelector("#new_todo"),
        button_change_color_new_todo = document.querySelector("#new_todo_color"),
        button_save_new_todo = document.querySelector("#enregistrer_new_todo");
    
    button_new_todo.addEventListener("click", overlay_new_todo_display_on)
    button_change_color_new_todo.addEventListener("change", change_background_color_of_new_todo_box)
    button_save_new_todo.addEventListener("click", enregistrer_new_todo)
}

//////////////////////////////////////////////
/* Fonction des pilotes */
//////////////////////////////////////////////

function overlay_new_todo_display_on()
{
    console.log("controle")
    let overlay = document.querySelector("#new_todo_overlay")
    overlay.style.display = "flex"
}

function change_background_color_of_new_todo_box(event)
{
    let boite_creation_new_todo = document.querySelector("#new_todo_creation_box")
    boite_creation_new_todo.style.backgroundColor = event.target.value
}

function enregistrer_new_todo()
{
    let object = {}
    let user_name = document.querySelector("#user_name")
    let todo_content = document.querySelector("#new_todo_content")
    let todo_color = document.querySelector("#new_todo_color")
    object.user_name = user_name.innerHTML
    object.todo_content = todo_content.value
    object.todo_color = todo_color.value
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
                                            <div class="parameter_box"><i class="fa-solid fa-gear parameter"></i></div>
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