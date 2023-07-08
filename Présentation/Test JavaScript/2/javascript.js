let add = document.getElementById("cursor"),
    supp = document.getElementById("supprimer"),
    input = document.getElementsByClassName("input"),
    result = document.getElementById("result"),
    tableau = document.getElementById("table"),
    total = null;





// Listener clic 1 : si clic => ajoute une input avec la classe input + applique les listener pour la nouvelle input
add.addEventListener("click", function() {

    var new_input = document.createElement("input");
    new_input.classList.add("input");
    tableau.append(new_input);

    modification_input_dans_tableau()
})

// Listerner clic 2 : si clic => supprime la dernière input + affiche le résultat des inputs restantes
supp.addEventListener("click", function() {

    if(input.length > 1)
    {
        input[input.length-1].remove("input");
        
        affichage_resultat()
    }
    
})


// Si placé plus haut, ne fonctionne pas
modification_input_dans_tableau()

// Listener change : => en cas de changement de valeur d'une input ( classe input ) affiche le résultat
function modification_input_dans_tableau()
{
    for(element in input)
    {
        input[element].addEventListener("change", affichage_resultat)
    }
}

// Fonction d'affichage de la valeur des input
function affichage_resultat()
{
    for(element in input)
    {
        total = 0;

        for(element in input)
        {
            let value = (isNaN(parseInt(input[element].value))) ? 0 : input[element].value;
            total += parseInt(value);
        }

        result.innerHTML = total;
    }
}


