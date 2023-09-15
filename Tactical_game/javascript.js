//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////
let soldier_selected_control = false
//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////

main()

function main()
{
    select_soldier_pilote()
}

//////////////////////////////////////////////
/* Pilote des listeners */
//////////////////////////////////////////////
function select_soldier_pilote()
{
    // On récupère tout les soldats
    let soldiers = document.querySelectorAll(".soldier")
    // On leurs appliquent à tous un listener en cas de clique
    soldiers.forEach(soldier => 
        {
            soldier.addEventListener("click", soldier_selected)
        })
}

//////////////////////////////////////////////
/* Fonction des listeners */
//////////////////////////////////////////////

// select_soldier_pilote -> Quand un soldat est selectionner
function soldier_selected(event)
{
    // On récupère tout ce qu'on a à récupérer
    let soldier = event.target

    // Si un soldat n'est pas déjà selectionner
    if(soldier_selected_control === false)
    {
        // On passe le controle à true, un soldat est selectionner
        soldier_selected_control = true
        // On affiche les boutons d'options
        let buttons_hidden = document.querySelectorAll(".hidden")
        buttons_hidden.forEach(button => 
            {
                button.classList.remove("hidden")
            })

        // On retire les hover de selection au passage de la souris
        let soldiers_can_be_selected = document.querySelectorAll(".soldier")
        soldiers_can_be_selected.forEach(soldier => 
            {
                soldier.classList.remove("can_be_selected_hover")
            })

        // On met le focus sur le soldat
        soldier.classList.add("selected")
    }
    // Si un soldat est selectionner
    else if(soldier_selected_control === true)
    {
        // Et qu'on clique sur le soldat selectionner
        if(soldier.classList.contains("selected"))
        {
            // On lui retire sa classe selected
            soldier.classList.remove("selected")
            // On passe le controle à false
            soldier_selected_control = false
            // On cache les boutons d'actions
            let buttons = document.querySelectorAll("button")
            buttons.forEach(button => 
                {
                    button.classList.add("hidden")
                })
            // On remet les hover de selection au passage de la souris
            let soldiers_can_be_selected = document.querySelectorAll(".soldier")
            soldiers_can_be_selected.forEach(soldier => 
                {
                    soldier.classList.add("can_be_selected_hover")
                })
        }
    }
    
}