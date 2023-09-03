// replaceState permet de modifier l(URL du vaiguateur sans provoquer de novueller equête HTTP)
// On verifie si replaceState est disponible et pris en charge
if(window.history.replaceState)
{
    // Si oui, windows.location.href = l'url se la page, 
    // .split("?")[0] Sépare l'URL en deux élément d'un tableau, séparer à partir du ?
    // [0] pour indiquer le premier élément du tableau
    // Donc, la fonction remplace l'url actuelle, par l'url sans la partie avec "?"
    window.history.replaceState(null, null, window.location.href.split("?")[0]);
}