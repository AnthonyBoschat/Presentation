#### reste à utiliser les touches de clavier
#### reste a donner de nouvelles regle pour les taille > 3

import os
import random
import keyboard

# Initialisation de la liste
liste=[]

# Fonction d'affichage
def point():
    print(" ","."," ",end="")
def croix():
    print(" ","X"," ",end="")
def rond():
    print(" ","O"," ",end="")
def croixselection():
    print("(","X",")",end="")
def rondselection():
    print("(","O",")",end="")
def selection():
    print("(",".",")",end="")

# Fonction de déplacement
def haut(n):
    
    for element in range(n):
        for element2 in range(n):
            if liste[element][element2] in [1,3,5]:
                liste[element][element2] -= 1
                
                if element < len(liste):
                    if liste[element-1][element2] in [0,2,4]:
                        liste[element-1][element2]+=1
                        visualisation(liste,n)
                        return                      
def bas(n):
    
    for element in range(n):
        for element2 in range(n):
            
            if liste[element][element2] in [1,3,5]:
                liste[element][element2] -= 1
                
                if element+1 < len(liste):
                    if liste[element+1][element2] in [0,2,4]:
                        liste[element+1][element2] += 1
                        visualisation(liste,n)
                        return
                        
                        
                if element+1 >= len(liste):
                    if liste[element-element][element2] in [0,2,4]:
                        liste[element-element][element2]+=1
                        visualisation(liste,n)
                        return
def gauche(n):
    
    for element in range(n):
        for element2 in range(n):
            
            if liste[element][element2] in [1,3,5]:
                liste[element][element2] -= 1
                
                if element2 < len(liste[element]):
                    if liste[element][element2-1] in [0,2,4]:
                        liste[element][element2-1]+=1
                        visualisation(liste,n)
                        return         
def droite(n):
    
    for element in range(n):
        for element2 in range(n):
            
            if liste[element][element2] in [1,3,5]:
                liste[element][element2] -= 1
                
                if element2+1 < len(liste[element]):
                    if liste[element][element2+1] in [0,2,4]:
                        liste[element][element2+1]+=1
                        visualisation(liste,n)
                        return
                        
                elif element2+1 >= len(liste[element]):
                    if liste[element][element2-element2] in [0,2,4]:
                        liste[element][element2-element2]+=1
                        visualisation(liste,n)
                        return
                    
# Fonction pour la selection OK
def ok(joueur,n):
    
    for element in range(n):
        for element2 in range(n):
            if joueur == 1 or joueur == 2:
                if joueur == 1 :
                    if liste[element][element2]==1:
                        liste[element][element2]=3                            
                        joueur = 2
                        visualisation(liste,n)
                        return joueur
                        
                if joueur == 2 :
                    if liste[element][element2]==1:
                        liste[element][element2]=5
                        joueur = 1
                        visualisation(liste,n)
                        return joueur    
            if liste[element][element2] in [3,5]:
                
                visualisation(liste,n)
                print("Vous ne pouvez pas selectionner cet emplacement, c'est déjà pris ! ")
                return joueur

# Fonction qui détermine la position du curseur quand selection
def curseur(liste):
    x = None
    for i, element in enumerate(liste):
        if 3 in element:
            x=liste[i].index(3)
            return x
        elif 5 in element:
            x=liste[i].index(5)
            return x
        
# Fonction pour la selection de taille de plateau
def taille():
    try:
        n=int(input("Choisissez une taille de plateau : "))
        return n
    except:
        ValueError
        saut()
        print("vous devez rentrer un chiffre pour une taille de plateau")
        n=taille()
        return n

# Fonction sortie de la selection pour la première visualisation
def sortie():
    liste[0][0]=1

# Fonction pour clear le terminal
def saut():
    os.system('cls' if os.name == 'nt' else 'clear')

# Création du constructeur
def constructeur(n):
    # Création des listes en fonction du nombre renseigner, si c'est 0, ca fait rien.
    # Si c'est 2 ou plus, ça créé autant de liste [0] que d'élément in range (n) ( exemple 3: 0 - 1 - 2)
    for element in range(n):
        if n == 0:
            pass       
        if n >=1:
            liste.append([0])
    # Ajout des 0 dans les listes créé, tant que la longueur de la liste[element] (exemple 3: liste 0/1/2) est inferieur au nombre demander, ca continue d'en ajouter.
    for element in range(n):
        while len(liste[element]) < n:
            liste[element].append(0)
    return n
    
# Création de la visualisation
def visualisation(liste,n):
    saut()
    # pour chaque élément jusque n ( ici 3), donc 0-1-2, ca commence à 0
    for element in range(n):
        # si 0,1,2 est dans ma liste[element], ici liste[0]
        if any(x in (0, 1, 2, 3, 4, 5) for x in liste[element]):
            # pour chaque element2 jusqu'e n (0,1,2)
            for element2 in range(n):
            # si ma liste[element][element2]==0,  ici liste[0][0,1,2]
                if liste[element][element2] == 0:
                    # à la place de 0, ca m'affiche le print de la fonction point()
                    point()
                    # Placement du curseur
                elif liste[element][element2] == 1:
                    selection()
                elif liste[element][element2] == 2:
                    croix()
                elif liste[element][element2] == 3:
                    croixselection()
                elif liste[element][element2] == 4:
                    rond()
                elif liste[element][element2] == 5:
                    rondselection()
            # Après avoir remplacer tout les 0 de liste[element][element2] par l'affichage point(), saut à la ligne 2 fois.
            print(end="\n")
            print(end="\n")
    
# Création de l'interaction joueur flèche et selection
def interaction(n,joueur):
    
    print("\n")
    if joueur == 1:
        print("Joueur {} : X".format(joueur))
    if joueur == 2:
        print("Joueur {} : O".format(joueur))
    print("\n")
    
    print("Flèche du clavier pour se déplacer")
    print("Touche Entrer pour selectionner")
    if n > 3:
        print("Rêgle spécial pour les grands plateaux : les diagonales de taille {} permettent également la victoire".format(n-1))
    
    while True:
        
        
            event = keyboard.read_event()
            if event.event_type == 'down':
                if event.name == 'bas':
                    bas(n)
                elif event.name == 'haut':
                    haut(n)
                elif event.name == 'gauche':
                    gauche(n)
                elif event.name == 'droite':
                    droite(n)
                elif event.name == 'enter':
                    joueur = ok(joueur,n)
                else:
                    print("mauvaise touche")
                    continue
                break
        
        
    return joueur

# Ccondition de victoire global
def victoire(n):
    
    victoire = False
    
    for element in range(n):
        
        # Condition de victoire pour les lignes
        if ligne(element):
            victoire = True
            break
        
        # condition de victoire pour les colonnes  
        if colonne(n,element):
            victoire = True
            break
        
        if diagonale(n,element):
            victoire = True
            break
        
    return victoire

# Condition de victoire spécifique                  
def diagonale(n,element):
    
    if n <= 3:
        
        if diag_impair(n,element):
            return True
                
        if diag_pair(n,element):
            return True
    
    elif n > 3:
        
         if diag_impair(n,element):
             return True
         
         if diag_pair(n,element):
             return True
         
         if diag_special(n,element):
             return True
def colonne(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            for element in range(n):
                if liste[element][x] not in [2,3]:
                    return False
            return True
        
        if liste[element][element2] in [5]:
            x = curseur(liste)
            for element in range(n):
                if liste[element][x] not in [4,5]:
                    return False
            return True
def ligne(element):
    if all(element2 in [2,3] for element2 in liste[element]):
        return True
    elif all(element2 in [4,5] for element2 in liste[element]):
        return True

# Condition de victoire spécifique aux diagonales et problème pair / impair
def diag_impair(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            if element != x :
                element = 0
                x = n-1
                while element < n :
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element +=1
                        x -=1                        
                return True
        
        if liste[element][element2] in [5]:
            x = curseur(liste)
            if element != x :
                element = 0
                x = n-1
                while element < n :
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element +=1
                        x -=1                        
                return True
def diagbas(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            if element == x :
                element = 0
                x = 0
                while element < n :
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element += 1
                        x +=1
                return True
            
        if liste[element][element2] in [5]:
            x = curseur(liste)
            if element == x :
                element = 0
                x = 0
                while element < n :
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element += 1
                        x +=1
                return True
def diaghaute2(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            if element == x :
                element = 0
                x = n-1
                while element < n :
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element +=1
                        x -=1                        
                return True 
            
        if liste[element][element2] in [5]:
            x = curseur(liste)
            if element == x :
                element = 0
                x = n-1
                while element < n :
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element +=1
                        x -=1                        
                return True  
def diag_pair(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            if element == x :
                if diagbas(n,element):
                    return True
                if diaghaute2(n,element):
                    return True
                else :
                    return False
                
        if liste[element][element2] in [5]:
            x = curseur(liste)
            if element == x :
                if diagbas(n,element):
                    return True
                if diaghaute2(n,element):
                    return True
                else :
                    return False
def diag_special(n,element):
    
    for element2 in range(n):
        
        if liste[element][element2] in [3]:
            x = curseur(liste)
            
            if element + x == n-2:
                element = 0
                x = n-2
                while x >= 0:
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element += 1
                        x -= 1
                return True
            
            if element + x == n:
                element = 1
                x = n-1
                while element < n:
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element += 1
                        x -= 1
                return True
            
            if x - element == 1:
                element = 0
                x = 1
                while x < n :
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element += 1
                        x +=1
                return True
            
            if element - x == 1:
                element = 1
                x = 0
                while element < n:
                    if liste[element][x] not in [2,3]:
                        return False
                    if liste[element][x] in [2,3]:
                        element += 1
                        x +=1
                return True
            
        if liste[element][element2] in [5]:
            x = curseur(liste)
            
            if element + x == n-2:
                element = 0
                x = n-2
                while x >= 0:
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element += 1
                        x -= 1
                return True
            
            if element + x == n:
                element = 1
                x = n-1
                while element < n:
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element += 1
                        x -= 1
                return True
            
            if x - element == 1:
                element = 0
                x = 1
                while x < n :
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element += 1
                        x +=1
                return True
            
            if element - x == 1:
                element = 1
                x = 0
                while element < n:
                    if liste[element][x] not in [4,5]:
                        return False
                    if liste[element][x] in [4,5]:
                        element += 1
                        x +=1
                return True
# programme du jeu               
def TicTacToe():
    joueur = 1
    saut()
    n=taille()
    constructeur(n)
    sortie()
    visualisation(liste,n)

    while victoire(n)==False:
        joueur = interaction(n,joueur)
        
    if joueur == 1:
        joueur = 2
    else :
        joueur = 1
        
    visualisation(liste,n)
    print("Victoire pour le joueur {}".format(joueur))
                    
                        


TicTacToe()






  


