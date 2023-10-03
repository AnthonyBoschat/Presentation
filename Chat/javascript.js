// Récupération du HTML
const nom_utilisateur = document.querySelector("#user_name").innerHTML







// Lorsque que le fichier est chargé e
document.addEventListener("DOMContentLoaded", function(){
    // Charge les message enregistrer dans la base de donnée
    loading_all_message()
    // Pour permettre d'enregistrer un message dans la base de donnée
    listener_submit_button()
    // Effectue des interval régulier pour récupérer tout les message à chaque fois
    setInterval(() => {
        loading_all_message()
    }, 3000);
})

function loading_all_message()
{
    let query = XMLrequest("POST", "load_all_message", "routeur.php")
    query.onload = function(){
        if(query.status === 200){
            let response = JSON.parse(query.responseText)
            if(response.status === true){
                console.log("Tout les messages sont afficher")
                let data = response.data
                let destination = document.querySelector("#content_box")
                destination.innerHTML = ""
                for(let i = 0; i<data.length; i++){
                    let new_element = document.createElement("div")
                    new_element.classList.add("message")
                    let child_element = `
                    <span class="username">${data[i]["user_name"]}</span>
                    <span class="text_content">: ${data[i]["message_content"]}</span>
                    `
                    new_element.innerHTML = child_element
                    destination.appendChild(new_element)
                }
            }
        }
    }
}

function listener_submit_button()
{
    let formulaire = document.querySelector("#formulaire")
    formulaire.addEventListener("submit", function(event)
    {
        event.preventDefault()
        let user_message = document.querySelector("#writting_area").value
        let object = {}
        object.user_name = nom_utilisateur
        object.user_message = user_message
        object_JSON = JSON.stringify(object)
        let query = XMLrequest("POST", "save_message", "routeur.php", true, object_JSON)

        query.onload = function()
        {
            if(query.status === 200)
            {
                let response = JSON.parse(query.responseText)
                if(response.status === true)
                {
                    let zone_de_texte = document.querySelector("#writting_area")
                    zone_de_texte.value = "";
                    console.log("message enregistrer dans la base de donnée")
                    loading_all_message()
                }
            }
        }
    })
}