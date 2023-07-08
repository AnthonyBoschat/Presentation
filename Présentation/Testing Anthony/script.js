let add = document.querySelectorAll(".add"),
    del = document.querySelectorAll(".del"),
    trash = document.querySelectorAll(".trash"),
    quantiter = document.querySelectorAll(".quantiter"),
    prix = document.querySelectorAll(".prix_value"),
    total = document.getElementById("valeur_panier_value"),
    retour = document.getElementById("return"),
    liste_element_detruit = [];




initialisation()


////////// Instruction du programme principal //////////
function initialisation()
{
    surveillance_ajouter()
    surveillance_retirer()
    surveillance_trash()
    surveillance_retour_arriere()
    calcul_total_panier()
    calcul_sous_total_initialisation()
}

////////// Application des surveillance et du processus de surveillance//////////
function surveillance_ajouter()
{
    // Pour chaque element ("add") du tableau add, on applique un listener, qui applique la fonction ajouter, pour incrémenter l'indicateur de quantiter de 1, et on relance un calcul pour mettre à jour dynamiquement le montant total. (On récupère les informations de l'évènement grâve à event)
    add.forEach(add => {
        add.addEventListener("click", function(event)
        {
            ajouter_1(event)
            calcul_total_panier()
            calcul_sous_total(event)
        })
    })
}

function surveillance_retirer()
{
    del.forEach(del => {
        del.addEventListener("click", function(event)
        {
            // Retire 1 de l'indicateur de quantiter en cours
            retirer_1(event)
            // Calcul le total du panier
            calcul_total_panier()
            // Calcul le sous_total du produit en cours
            calcul_sous_total(event)
        })
    })
}

function surveillance_trash()
{
    trash.forEach(poubelle => {
        poubelle.addEventListener("click", function(event)
        {
            supprimer(event)
            calcul_sous_total(event)
        })
    })
}

function surveillance_retour_arriere()
{
    retour.addEventListener("click", function()
    {
        retour_arriere()
        au_moin_un_de_detruit()
    })
}
////////// Fonction de calcul //////////

// Fonction qui permet de calculer en fonction des indicateur de quantité et des prix, et de l'afficher dans le montant total du panier. ( on part du postulat que le nombre d'élément dans le tableau "prix" et "quantiter" sont les même, pour pouvoir utiliser le même index "i" pour les deux )
function calcul_total_panier()
{
    let montant = 0;

    for(let i = 0; i < prix.length; i++)
    {
        montant += parseFloat(prix[i].innerHTML) * parseFloat(quantiter[i].innerHTML)
    }

    montant = (montant.toLocaleString('fr-FR', {minimumFractionDigits: 2}))

    total.innerHTML = montant
}

function calcul_sous_total(event)
{
    let parent = event.target.closest(".article_box");
    let prix_fixe = parent.querySelector(".prix_value").innerHTML
    let quantiter = parent.querySelector(".quantiter").innerHTML
    let destination = parent.querySelector(".sous_total_value")
    let montant = parseFloat(prix_fixe) * parseFloat(quantiter)

    montant = (montant.toLocaleString('fr-FR', {minimumFractionDigits: 2}))
    destination.innerHTML = montant
}

// Comme la fonction calcul_sous_total se base sur un évènement, lors du chargement de la page, ce n'est pas pris en compte, c'est pourquoi je passe par une fonction qui ne nécessite pas d'avoir d'évènement pour effectuer l'opération, que je lance une seule fois dans l'initialisation.

// En soit, je pourrais utiliser cette fonction a chaque fois, plutôt que celle qui se base sur l'évènement, la meilleure ?? //
function calcul_sous_total_initialisation()
{
    let article = document.querySelectorAll(".article_box")
    for(let i = 0; i < article.length; i++)
    {
        let prix_fixe = article[i].querySelector(".prix_value").innerHTML;
        let quantiter = article[i].querySelector(".quantiter").innerHTML;
        let destination = article[i].querySelector(".sous_total_value");
        let montant = parseFloat(prix_fixe) * parseFloat(quantiter);
        montant = (montant.toLocaleString('fr-FR', {minimumFractionDigits: 2}))
        destination.innerHTML = montant
    }
}


////////// Fonction ajouter/retirer/supprimer //////////
//add
function ajouter_1(event)
{
    // parent = l'élément parent le plus proche de la zone de l'evenement avec pour classe (".article_box")
    let parent = event.target.closest(".article_box")
    // destination = l'élément dans l'élément parent qui a pour classe ".quantiter"
    let destination = parent.querySelector(".quantiter")
    // montant = le l'information html renseigner dans destination, converti en float pour pouvoir être manipuler mathématiquement
    let montant = parseFloat(destination.innerHTML)
    // on ajoute 1 à montant
    montant += 1
    // l'information html de destination est attribué au nouveau montant
    destination.innerHTML = montant
}

// del
function retirer_1(event)
{
    let parent = event.target.closest(".article_box")
    let destination = parent.querySelector(".quantiter")
    let montant = parseFloat(destination.innerHTML)

    switch(montant)
    {
        case 1:
            // Question expliquer dans la fonction "supprimer"
            let question = confirm("Êtes-vous sur de vouloir supprimer cet article du panier ?")
            if(question)
            {
                montant -= 1;
                destination.innerHTML = montant;
                destruction(destination)
            }
            return
            
        default:
            montant -= 1;
            destination.innerHTML = montant;
            return;
    }
}

// trash
function supprimer(event)
{ 
    // Pose une question à l'utilisateur : S'il est certain de vouloir supprimer cet article
    const question = confirm("Êtes-vous sur de vouloir supprimer cet article du panier ?")
    // Si question = true ( si l'utilisateur clique sur OK, lance la fonction de destruction)
    if(question)
    {
        let parent = event.target.closest(".interaction_produit")
        let destination = parent.querySelector(".quantiter")
        destination.innerHTML = 0

        destruction(destination)
        calcul_total_panier()
        calcul_sous_total(event)
    }
    
}

////////// Fonction special //////////


// Fonction qui permet de supprimer un élément quand son indicateur de quantiter atteint 0, ajoute une classe à l'élément à détruire ".destruction", pour provoquer un style css, une animation.

function destruction(destination)
{
    let parent = destination.closest(".article_box")
    parent.classList.add("destruction")

    // (setTimeout) pour provoquer le display none 2000ms après.
    setTimeout(function(){

        parent.style.display = "none"
        // Verifie avec "no_article" à chaque destruction, si tout les articles ont été détruit, si oui affiche le message, 2000ms seconde après aussi
        no_article()
        // Affiche le bouton retour arrière en même temps si un élément a été détruit
        au_moin_un_de_detruit()
        // Envoie l'élément détruit dans la liste "liste_element_parent" pour pouvoir être réafficher avec la fonction "retour_arrière"
        liste_element_detruit.push(parent)

    }, 1000)

}

// Fonction pour indiquer qu'il n'y a plus d'article dans le panier
function no_article()
{
    // Compte le nombre d'élément avec la classe ".destruction" ( les éléments détruit )
    let verification = document.querySelectorAll(".destruction")
    // Compte le nombre d'élément présent qui sont des articles
    let comparateur = document.querySelectorAll(".article_box")
    // Determine la zone ou le message s'affichera ( a la place des articles du coup )
    let destination = document.querySelector("#section_article")
    // Si le nombre d'élément détruit est égale au nombre d'élément qui sont des articles, c'est que tout les articles ont été détruit
    if(verification.length == comparateur.length)
    {
        // créé un élément div
        let message = document.createElement("div")
        // Avec cette information html dedans
        message.innerHTML="Vous n'avez plus d'articles dans votre panier"
        // Lui donne une classe "no_article" qui peut être lu dans le fichier css.
        message.classList = "no_article"
        
        // Ajoute cet élément dans la destination
        destination.appendChild(message)
    }
    // Et si le document comporte cette div avec ce message ( si tout a été supprimer, que le message s'est afficher, et qu'on revient en arrière ), le message est retirer
    else if(document.querySelector(".no_article"))
    {
        let message = document.querySelector(".no_article")
        message.remove()
    }
}

// Fonction qui affiche le retour arrière si au moin un élément a été détruit
function au_moin_un_de_detruit()
{
    // Vérification = tableau qui représente tout les élément avec pour classe ".destruction"
    let verification = document.querySelectorAll(".destruction")

    // pointe l'élément avec pour id "return" dans le document
    let destination = document.getElementById("return")

    // Si la taille du tableau est superieur à 0 ( S'il y a au moin un élément de détruit )
    if(verification.length > 0)
    {
        // passe son display en flex ( de base, il est en none )
        destination.style.display = "flex"
    }
    // Et si ce n'est pas le cas ( que la taille du tableau est de 0 ou moin),
    else if(destination.style.display = "flex")
    {
        // remet son display en none, si ce n'etait pas déjà le cas
        destination.style.display = "none"
    }
}

// Fonction fait réapparaitre le dernier élément détruit ( en se servant des push effectuer dans la fonction destruction )
function retour_arriere()
{
    // dernier_element_supprimer = dans la liste des élément détruit, celui qui a l'index qui correspond à la longueur de cette liste -1 ( commence à 0 )
    let dernier_element_supprimer = liste_element_detruit[liste_element_detruit.length-1];

    // on lui reaffecte par défaut à 1 pour l'indicateur d'article
    let quantiter = dernier_element_supprimer.querySelector(".quantiter")
    quantiter.innerHTML = 1

    // on relance le calcul sous-total et le calcul total avec la valeur réaffecter par défaut
    calcul_sous_total_initialisation()
    calcul_total_panier()

    // on lui retire le display none
    dernier_element_supprimer.style.display = "flex";

    // on lui retire la classe destruction, et on efface l'élément de retour arrière s'il n'y a plus d'élément de détruit, 1ms après avoir remis le flex, sinon, l'animation n'a pas le temps de se lancer, le display:"flex" arrive trop vite
    setTimeout(function()
    {
        dernier_element_supprimer.classList.remove("destruction");
        au_moin_un_de_detruit()
        no_article()
    },1)

    // on le retire de la liste des élément supprimer (-1 = le dernier élément de la liste)
    liste_element_detruit.splice(-1)
}

function surveillance_quantiter()
{
    quantiter.forEach(input => {
        input.addEventListener("blur", function(event)
        {
            let quantiter = parseInt(event.target.innerHTML)
            let parent = event.target.closest(".interaction_produit")
            let destination = parent.querySelector(".quantiter")
            if(quantiter > 0)
            {
                destination.innerHTML = quantiter
                calcul_sous_total_initialisation()
                calcul_total_panier()
            }
            else
            {
                destination.innerHTML = 1
                calcul_sous_total_initialisation()
                calcul_total_panier()
            }
            
        })
    })
}

surveillance_quantiter()