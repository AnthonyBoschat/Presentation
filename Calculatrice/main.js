//////////////////////////////////////////////
//////////////////////////////////////////////
/* Récupération du HTML */
//////////////////////////////////////////////
/////////////////////////////////////////////

const   touches = document.querySelectorAll(".touch"),
        body = document.querySelector("body"),
        destination_now = document.getElementById("display_box_down"),
        destination_before = document.getElementById("display_box_up");

let calcul_now = "";
let reset = false;








//////////////////////////////////////////////
//////////////////////////////////////////////
/* Programme principal */
//////////////////////////////////////////////
//////////////////////////////////////////////

main()








//////////////////////////////////////////////
//////////////////////////////////////////////
/* Définition du programme principal */
//////////////////////////////////////////////
//////////////////////////////////////////////

function main()
{
    // On ajoute l'animation en cas de frappe au clavier ou à la souris
    listener_pression_touche()
}









//////////////////////////////////////////////
//////////////////////////////////////////////
/* Définition des listeners */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Animation de pressing de touche au clic et au clavier
//////////////////////////////////////////////
function listener_pression_touche()
{
    // En cas de clic souris sur la calculatrice
    touches.forEach(touche => 
        {
            // On lance la fonction d'animation de pressing à la souris
            touche.addEventListener("mousedown", clic_animation_press, true);
            touche.addEventListener("mousedown", clic_affichage, true)
        })

    // En cas de frappe clavier, on lance la fonction d'animation de pressing au clavier
    body.addEventListener("keydown", keyboard_animation_press, true)
    body.addEventListener("keydown", keyboard_affichage, true)
}








//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'animation */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Animation de pressing à la souris
//////////////////////////////////////////////
function clic_animation_press(event)
{
    // On définie une fonction pour arrêter l'animation
    function clic_animation_press_stop()
    {
        event.target.classList.remove("press_animation")
    }

    // On ajoute l'animation
    event.target.classList.add("press_animation")

    // Si le clic se relève, ou si la souris pars du focus,
    // on lance la fonction pour arrêter l'animation définie plus haut
    event.target.addEventListener("mouseup", clic_animation_press_stop)
    event.target.addEventListener("mouseleave", clic_animation_press_stop)
}

// Animation de pressing au clavier
//////////////////////////////////////////////
function keyboard_animation_press(event)
{
    // On récupère l'élément HTML correspondant à la frappe clavier
    let $touche_correspondante = document.getElementById(event.key);
2
    // On définie une fonction pour arrêter l'animation
    function keyboard_animation_press_stop()
    {
        $touche_correspondante.classList.remove("press_animation")
    }

    // On ajoute l'animation
    $touche_correspondante.classList.add("press_animation")

    // Si la frappe clavier se relève,
    // On lance la fonction pour arrêter l'animation définie plus haut
    body.addEventListener("keyup", keyboard_animation_press_stop, true)

}


//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'affichage */
//////////////////////////////////////////////
//////////////////////////////////////////////

// Affichage pour le calcul en cours à la souris
//////////////////////////////////////////////
function clic_affichage(event)
{
    // Si l'élément est une option, on ne l'affiche pas
    if(event.target.classList.contains("option"))
    {
        clic_option_touch(event);
    }
    // Sinon, on l'affiche
    else
    {
        // Si le reset est sur FALSE, si une égaliter n'est pas afficher
        if(reset == false)
        {
            calcul_now += event.target.id;
            destination_now.innerHTML = calcul_now;
        }

        // Si le reset est sur TRUE, s une egaliter est en cours d'affichage
        else
        {
            // On reset la zone d'affichage
            calcul_now = "";
            calcul_now += event.target.id;
            destination_now.innerHTML = calcul_now;

            // on repasse le reset en FALSE
            reset = false;
        }
        
    }
    
}

// Affichage pour le calcul en cours au clavier
//////////////////////////////////////////////
function keyboard_affichage(event)
{
    let touche_correspondante = document.getElementById(event.key);

    if(touche_correspondante.classList.contains("option"))
    {
        keyboard_option_touch(touche_correspondante)
    }
    // Sinon, on l'affiche
    else
    {
        // Si le reset est sur FALSE, si une égaliter n'est pas afficher
        if(reset == false)
        {
            calcul_now += touche_correspondante.id;
            destination_now.innerHTML = calcul_now;
        }

        // Si le reset est sur TRUE, s une egaliter est en cours d'affichage
        else
        {
            // On reset la zone d'affichage
            calcul_now = "";
            calcul_now += touche_correspondante.id;
            destination_now.innerHTML = calcul_now;

            // on repasse le reset en FALSE
            reset = false;
        }
        
    }
}





//////////////////////////////////////////////
//////////////////////////////////////////////
/* Fonction d'option */
//////////////////////////////////////////////
//////////////////////////////////////////////

function clic_option_touch(event)
{

    // Si la touche Delete est utiliser
    if(event.srcElement.id == "Delete")
    {
        // On réinitialise les champs d'affichages
        calcul_now = "";
        destination_now.innerHTML = calcul_now;
        destination_before.innerHTML = "";
    }

    // Si la touche Suppression est utiliser
    else if(event.srcElement.id == "Backspace")
    {
        // Si un affichage n'est pas en cours
        if(reset == false)
        {
            // On supprime le dernier élément de la chaîne de caractère
            calcul_now = calcul_now.slice(0 ,-1);
            destination_now.innerHTML = calcul_now;
        }

        // Si un affichage de résultat est en cours
        else
        {
            calcul_now = "";
            destination_now.innerHTML = calcul_now;
        }

    }

    // Si la touche Egal est utiliser
    else if(event.srcElement.id == "Enter")
    {
        
        try // On essaie de detecter une erreur
        {
            let egality = eval(calcul_now);

            // Si l'expression est calculable :
            if(isNaN(egality) == false)
            {

                // on affecte le restulat à egality

                // On affiche le resultat, et on déplace le calcule
                destination_before.innerHTML = calcul_now;
                destination_now.innerHTML = egality;

                // On met reset sur TRUE, si un nouveau nombre est taper l'affichage se reset
                reset = true;
            }
        }

        // Si une erreur arrive, que l'expression n'est pas calculable
        catch (error)
        {
            let destination_animation_error = document.querySelector(".display_box_down");
            // On injecte une animation d'erreur de calcule
            destination_animation_error.classList.add("error_animation");

            // Qu'on supprime à la fin de l'animation
            setTimeout(() => {
                destination_animation_error.classList.remove("error_animation");
            }, 400);
        }
    }
}

function keyboard_option_touch(touche_correspondante)
{
    // Si la touche Delete est utiliser
    if(touche_correspondante.id == "Delete")
    {
        // On réinitialise les champs d'affichages
        calcul_now = "";
        destination_now.innerHTML = calcul_now;
        destination_before.innerHTML = "";
    }

    // Si la touche Suppression est utiliser
    else if(touche_correspondante.id == "Backspace")
    {
        // Si un affichage n'est pas en cours
        if(reset == false)
        {
            // On supprime le dernier élément de la chaîne de caractère
            calcul_now = calcul_now.slice(0 ,-1);
            destination_now.innerHTML = calcul_now;
        }

        // Si un affichage de résultat est en cours
        else
        {
            calcul_now = "";
            destination_now.innerHTML = calcul_now;
        }

    }

    // Si la touche Egal est utiliser
    else if(touche_correspondante.id == "Enter")
    {
        

        try // On essaie de detecter une erreur
        {
            let egality = eval(calcul_now);

            // Si l'expression est calculable :
            if(isNaN(egality) == false)
            {

                // on affecte le restulat à egality
                let egality = eval(calcul_now);

                // On affiche le resultat, et on déplace le calcule
                destination_before.innerHTML = calcul_now;
                destination_now.innerHTML = egality;

                // On met reset sur TRUE, si un nouveau nombre est taper l'affichage se reset
                reset = true;
            }
        }

        // Si une erreur arrive, que l'expression n'est pas calculable
        catch (error)
        {

            let destination_animation_error = document.querySelector(".display_box_down");
            // On injecte une animation d'erreur de calcule
            destination_animation_error.classList.add("error_animation");

            // Qu'on supprime à la fin de l'animation
            setTimeout(() => {
                destination_animation_error.classList.remove("error_animation");
            }, 400);
        }
    }
}
