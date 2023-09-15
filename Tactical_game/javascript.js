//////////////////////////////////////////////
/* Variable d'initialisation */
//////////////////////////////////////////////
let controle_soldier_focus = false,
    soldier_on_move = null
//////////////////////////////////////////////
/* Main */
//////////////////////////////////////////////

main()

function main()
{
    move_soldier_pilote()
}

//////////////////////////////////////////////
/* Pilote des listeners */
//////////////////////////////////////////////
function clic_soldier_focus_pilote()
{
    clic_soldier_focus_description()
}

function move_soldier_pilote()
{
    move_soldier_description()
}

//////////////////////////////////////////////
/* Description des listeners */
//////////////////////////////////////////////
function clic_soldier_focus_description()
{
    let soldiers = document.querySelectorAll(".soldier")
    soldiers.forEach(soldier => 
        {
            soldier.addEventListener("click", focus_on_soldier, true)
        })
}

function move_soldier_description()
{
    let soldiers = document.querySelectorAll(".soldier")
    soldiers.forEach(soldier => 
        {
            soldier.addEventListener("mousedown", move_soldier, true)
        })
}

//////////////////////////////////////////////
/* Fonction des listeners */
//////////////////////////////////////////////

// clic_soldier_focus_description -> Donne le focus au soldat cliquer
function focus_on_soldier(event)
{   
    if(controle_soldier_focus === false)
    {
        if(event.target.classList.contains("focus"))
        {
            event.target.classList.remove("focus")
            controle_soldier_focus = false
        }
        else
        {
            event.target.classList.add("focus")
            controle_soldier_focus = true
        }
    }
    else if(controle_soldier_focus === true)
    {
        if(event.target.classList.contains("focus"))
        {
            event.target.classList.remove("focus")
            controle_soldier_focus = false
        }
        else
        {
            let soldiers_on_focus = document.querySelector(".focus")
            soldiers_on_focus.classList.remove("focus")
            event.target.classList.add("focus")
            controle_soldier_focus = true
        }
    }
    
    
}

// clic_soldier_focus_description -> Permet de déplacer le soldat
function move_soldier(event)
{
    // On identifie le soldat en train d'etre déplacer
    soldier_on_move = event.target
    // On lui donne un zindex superieur aux autres soldat
    soldier_on_move.style.zIndex = "1000"
    // On indique que le clic souris est toujours enfoncer
    let mouse_down = true

    // On calcule la différence entre la position de la souris et la position du soldat
    let offsetX = event.clientX - soldier_on_move.getBoundingClientRect().left 
    let offsetY = event.clientY - soldier_on_move.getBoundingClientRect().top

    // On écoute l'évènement de mousemove sur le document entier
    document.addEventListener("mousemove", mouse_is_move)
    // On écoute l'évènement de mousup sur le document entier
    document.addEventListener("mouseup", mouse_is_up)

    // On définie ces fonctions
    function mouse_is_move(event)
    {
        // Si la souris est toujours enfoncer
        if(mouse_down)
        {
            // Calcule la nouvelle position du soldat
            let x = event.clientX - offsetX
            let y = event.clientY - offsetY

            // Deplace le soldat à cette position
            soldier_on_move.style.left = x + "px"
            soldier_on_move.style.top = y + "px"
        }
        
    }

    function mouse_is_up()
    {
        // On indique que la souris est relever
        mouse_down = false
        // On reset le z-index
        soldier_on_move.style.zIndex = "auto"
        // On indique que plus aucun soldat n'est actuellement en mouvement
        soldier_on_move = null
        // On retire les listeners
        document.removeEventListener("mousemove", mouse_is_move)
        document.removeEventListener("mouseup", mouse_is_up)
    }
}