let question = document.querySelectorAll(".question"),
    response = document.querySelectorAll(".response");

question.forEach(question => {

    question.addEventListener("click", function(actual_event)
    {
        clic(actual_event, "response")
    })

})

response.forEach(response => {

    response.addEventListener("click", function(actual_event)
    {
        clic(actual_event, "response_under")
    })
})

function clic(actual_event, cible)
{

    let parent = actual_event.target.closest(".question_response_box_t2");

    let destination = parent.querySelector("." + cible);

    let new_display = getComputedStyle(destination).display == "none" ? "flex" : "none";

    destination.style.display = new_display;

    /*
    
    1 : La ou se passe le clic, on cherche l'élément parent le plus proche avec la classe ".question_respose_box_t2"
    2: On définie la cible de ce qu'on veut afficher = Dans l'élément parent, on cherche l'élément .cible
    3: récupère le display en cour, et on le change dans une variable
    4: on applique le display à la cible

    */
}



