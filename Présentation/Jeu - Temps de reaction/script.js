const body = document.querySelector("body");
const box_best_score = document.getElementById("box_best_score");
const destination_best_score = document.getElementById("value_best_score");
const start_button = document.getElementById("start_button");
const boite_explication = document.getElementById("box_explication");
const destination_resultat = document.getElementById("message_resultat");
let meilleur_score = [];

start_button.addEventListener("click", jeu);

function jeu()
{
    // On change la couleur du fond
    body.style.backgroundColor = "white";

    // On efface le bouton
    start_button.style.display = "none";

    // On efface le message d'explication
    boite_explication.style.display = "none";

    // On efface le meilleure score
    box_best_score.style.display = "none";

    // On efface eventuellement la destination_resultat
    destination_resultat.style.display = "none";

    // On détermine le temps d'apparition
    let temp_apparition = Math.random() * (10000 - 2000) + 2000

    // On lance le compte à rebours
    let delai = setTimeout(() => {

        // On change la couleur en rouge
        body.style.backgroundColor = "red";

        // On récupère la date en milliseconde actuelle
        start_now = Date.now()

    }, temp_apparition);

    // Récupère le retour dans la variable start_now

    // On surveille le clique sur l'écran ( fonction anonyme pour pouvoir passer les arguments delai, start_now )
    setTimeout(() => {
        body.addEventListener("click", function()
        {
            evenement_clique(delai, start_now, destination_resultat)
        }, true)
    }, 0);
}

let start_now = 0
// Détermine si l'utilisateur a cliquer trop tot ou pas
function victoire_ou_pas(delai, start_now)
{
    // Si c'est trop tôt et que l'écran est blanc, on remet tout comme avant, et on sort de la fonction, et on clear le timeout delai
    if(body.style.backgroundColor == "white")
    {

        // On remet la couleur d'origine
        body.style.backgroundColor = "rgb(90, 173, 173)";

        // On remet le bouton
        start_button.style.display = "";

        // On remet le message d'explication
        boite_explication.style.display = "";

        // On remet le meilleure score
        box_best_score.style.display = "";

        // On affiche un message dans la destination message_resultat
        destination_resultat.innerHTML = "Oups, trop tôt !"

        // On rend visible le resultat
        destination_resultat.style.display = "";

        // On supprime le listener du body
        body.removeEventListener("click", function()
        {
            evenement_clique(delai, start_now)
        }, true);

        // On sort de la fonction
        return;
    }

    // Si c'est bon on compte le temp écouler, et on affiche un message
    else if(body.style.backgroundColor == "red")
    {
        // On remet la couleur d'origine
        body.style.backgroundColor = "rgb(90, 173, 173)";

        // On remet le bouton
        start_button.style.display = "";

        // On remet le message d'explication
        boite_explication.style.display = "";

        // On remet le meilleure score
        box_best_score.style.display = "";

        // On récupère la date en milliseconde actuelle
        let start_end = Date.now()

        // On calcule la différence
        let duree = start_end - start_now
        let duree_en_seconde = duree / 1000
        let vrai_duree = duree_en_seconde.toFixed(3);
        // On affiche le resultat dans la destination message_resultat
        destination_resultat.innerHTML = vrai_duree+" secondes";

        // On rend visible le resultat
        destination_resultat.style.display = "";

        // On met à jour le meilleure score
        controle_meilleure_score(vrai_duree)
    }
}

function evenement_clique(delai, start_now)
{
    // On clear le compte à rebours
    clearTimeout(delai);
    // On analyse la victoire ou non
    victoire_ou_pas(delai, start_now);
}

function controle_meilleure_score(x)
{
    // On envoie le nouveau resultat dans le tableau
    meilleur_score.push(x);
    
    // On récupère la valeur la plus courte
    let plus_courte_reaction = Math.min(...meilleur_score);

    // On reset le tableau
    meilleur_score = [];

    // On lui reaffecte la valeur la plus courte
    meilleur_score.push(plus_courte_reaction);

    // On injecte la valeur du tableau dans la destination destination_best_score
    destination_best_score.innerHTML = meilleur_score[0];
}

