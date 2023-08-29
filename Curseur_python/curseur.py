#### n taille != 0
#### variable qui garde curseur en mémoire

import os
import keyboard

#### Fonction du curseur position X et Y
def curseur_fonction():
    
    x = 0
    y = 0
    
    return [x,y]

#### Fonction pour la visualisation des lignes complet
def ligne_fermeture(n):
    
    petite_croix_début()
    for element in range(n-1):
        petite_ligne()
    petite_croix_fin()    
def ligne_point_complet(n,liste,x,y):
    
    
    for indice in range(n):
        if liste == x and indice == y:
            ligne_vide_rouge()
        elif grille[liste][indice] == 0:
            ligne_vide_blanc()
        elif grille[liste][indice] == 1:
            ligne_vide_vert()
    ligne_fin_blanc()
    

    for indice in range(n):
        if liste == x and indice == y:
            if grille[x][y] == 1:
                ligne_point_rouge_vert()
            else : 
                ligne_point_rouge()
        elif grille[liste][indice] == 0:
            ligne_point_blanc()
        elif grille[liste][indice] == 1:
            ligne_point_vert()
    ligne_fin_blanc()
    
    for indice in range(n):
        if liste == x and indice == y:
            ligne_vide_rouge()
        elif grille[liste][indice] == 0:
            ligne_vide_blanc()
        elif grille[liste][indice] == 1:
            ligne_vide_vert()
    ligne_fin_blanc()
    
#### Fonction pour la visualisation ligne par ligne
# Pour les fermetures haut et bas
def petite_croix_début():
    
    print("+",end="")    
def petite_croix_fin():
    
    print("-----+",end="\n")
def petite_ligne():
    
    print("------",end="")

# Pour les lignes de point blanc
def ligne_vide_blanc():
    
    print("|     ",end="")
def ligne_point_blanc():
    
    print("|  *  ",end="")
def ligne_fin_blanc():
    
    print("|",end="\n")

# Pour les lignes de point rouge ( curseur )
def ligne_vide_rouge():
    
    print("|\033[1;41m     \033[0m",end="")
def ligne_point_rouge():
    
    print("|\033[1;37;41m  *  \033[0m",end="")    
def ligne_point_rouge_vert():
    
    print("|\033[1;32;41m  *  \033[0m",end="")
# Pour les lignes de point vert ( selectionner )
def ligne_vide_vert():
    
    print("|\033[1;42m     \033[0m",end="")
def ligne_point_vert():
    
    print("|\033[1;30;42m  *  \033[0m",end="")
#### Fonction du curseur, connaitre la position X (ordonnée / liste ) et Y ( abscisse / indice )
def PositionX():
    
    x = None
    for liste, element in enumerate(grille):
        if 1 in element:
            x = liste
            return x
def PositionY():
    
    y = None
    for liste, element in enumerate(grille):
        if 1 in element:
            y = grille[liste].index(1)
            return y    

#### Fonction de déplacement et selection
# haut
def haut(x,n):
    
    if x > 0:
        x -= 1
        return x
    else:
        x += n-1
        return x
def bas(x,n):
    
    if x < n-1:
        x += 1
        return x
    else:
        x -= n-1
        return x  
def droite(y,n):
    
    if y < n-1 :
        y += 1
        return y
    else:
        y -= n-1
        return y 
def gauche(y,n):
    
    if y > 0:
        y -= 1
        return y
    else:
        y += n-1
        return y
def entrer(x,y):
    
    if grille[x][y] == 0:
        grille[x][y] += 1
        return
    elif grille[x][y] == 1:
        grille[x][y] -= 1
        return
#### initialisation de la liste
grille = []

#### Fonction pour clear le terminal
def saut():
     os.system('cls' if os.name == 'nt' else 'clear')
    
#### Fonction qui demande une taille de plateau, return n
def taille_de_la_grille():
    
    try:
        
        n = int(input("Choisissez une taille pour le plateau : "))
        if n > 0:
            return n
        else:
            saut()
            ValueError
            print("Vous devez rentrer un nombre entier pour la taille de plateau.")
            n = taille_de_la_grille()
            return n
    except:
        
        saut()
        ValueError
        print("Vous devez rentrer un nombre entier pour la taille de plateau.")
        n = taille_de_la_grille()
        return n

#### Fonction constructeur de la grille
def constructeur(n):
    
    # créé n liste 
    for element in range(n):
        
        if n == 0:
            pass
        elif n > 0:
            grille.append([])
    
    # ajouter n * [0] pour chaque liste        
    for element in range(n):
        
        grille[element].extend([0]*(n))

#### Fonction pour la visualisation de la grille dans le terminal
def visualisation(n,x,y):
    
    ligne_fermeture(n)
    
    for liste in range(n):
        
        ligne_point_complet(n,liste,x,y)
        
    ligne_fermeture(n)

#### Fonction d'interaction
def interaction(n,x,y):
    
    while True:
        
        saut()
        visualisation(n,x,y)
        print(grille)
        
        deplacement = keyboard.read_event()
        
        if deplacement.event_type == "down":
            
            if deplacement.name in ["haut","up"]:
                x = haut(x,n)
            if deplacement.name in ["bas","down"]:
                x = bas(x,n)
            if deplacement.name in ["droite","right"]:
                y = droite(y,n)
            if deplacement.name in ["gauche","left"]:
                y = gauche(y,n)
            if deplacement.name in ["enter"]:
                entrer(x,y)
                     
#### Programme principal
def programme():
    
    saut()    
    n = taille_de_la_grille()
    constructeur(n)
    curseur = curseur_fonction()
    x = curseur[0]
    y = curseur[1]
    visualisation(n,x,y)
    interaction(n,x,y)

programme()
