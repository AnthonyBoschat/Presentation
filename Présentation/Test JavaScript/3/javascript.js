let noms = document.querySelectorAll(".texte.prenom"),
    count = 1;

noms.forEach(nom => 
{
    give_listener(nom)
}) 

function clonage_v2(cible)
{
    source = noms[0]

    source_clone = source.cloneNode(true)

    let destination = document.getElementById(cible)

    destination.appendChild(source_clone)

    listener(source_clone)
}

function give_listener(x)
{
    x.addEventListener("click", function()
    {
        clonage_v2("section")
    })
}





/*

function clonage(source, cible)
{
    // source_clone = clone de l'élément source ( true = cloner ses enfants aussi )
    source_clone = source.cloneNode(true)

    // application d'une id différente à chaque clone
    source_clone.setAttribute("id", "prenom_clone_" + count)
    count++;

    // destination = endroit ou mettre le clone
    let destination = document.getElementById(cible)

    // Ajout du clone dans la destination
    destination.appendChild(source_clone);
}

*/

/*

 // pour chaque attribut de source
 Array.from(source.attributes).forEach(attribut => 
    {
        // Donne les attribut à clone_source
        clone_source.setAttribute(attribut.name, attribut.value);
        clone_source.setAttribute("id", "prenom_" + count)
        count++
        console.log(attribut)
    });
    
    // pour chaque enfant de source
    Array.from(source.children).forEach(child => 
    {
        // créé une variable clone_child = clone enfant source
        var clone_child = child.cloneNode(true);
        
        // pour chaque attribut de clone enfant source
        Array.from(child.attributes).forEach(attribut => 
        { 
            // Donne les attribut à clone_child
            clone_child.setAttribute(attribut.name, attribut.value)
        });
        // imbrication de l'enfant dans le parent
        clone_source.appendChild(clone_child);
    })
    
    // placement du clone dans la destination
    const destination = document.getElementById("section");
    destination.appendChild(clone_source);

    */
