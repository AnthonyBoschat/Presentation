# Gérer la cohérence dans les HUD, les condenser, et acceder aux objet avec inventaire
# curseur pour selections de perso

import os

#### Parler avec le joueur et HUD
def dial(x):
    
    rows = os.get_terminal_size().lines
    print("\033[{};{}H{}".format(rows, 0, x))
#### Classe
class Joueur():
    
    def __init__(self,nom,classe, pv, force, mana):
        
        self.nom = nom
        self.classe = classe
        self.pv = pv
        self.force = force
        self.mana = mana
class PNJ():
    def __init__(self, nom, pv, force):
        self.nom = nom
        self.pv = pv
        self.force = force     
#### Fonction wait
def wait():
    
    return input("")
#### Clear du terminal
def saut():
    os.system('cls' if os.name == 'nt' else 'clear')
#### Fonction de combat ( à ameliorer )
def combat(joueur,ennemi):
    
    while ennemi.pv > 0:
        
        if joueur.classe == "Guerrier":
            
            while True:
                
                # Tour du joueur
                HUD_COMBAT(joueur,ennemi)
                dial("\033[0;34mAttaquer : 1\033[0m")
                action = wait()
                if action == "1":
                    ennemi.pv = ennemi.pv - joueur.force
                    HUD_COMBAT(joueur,ennemi)
                    dial("{} subi {} point de dégâts".format(ennemi.nom,joueur.force))
                    wait()
                    break
                else :
                    pass   
                
            # Tour de l'ennemi        
            if ennemi.pv > 0:
                
                HUD_COMBAT(joueur,ennemi)       
                dial("{} attaque !".format(ennemi.nom))
                wait()
                joueur.pv = joueur.pv - ennemi.force
                HUD_COMBAT(joueur,ennemi)
                dial("{} inflige {} point de dégat, il te reste {} point de vie.".format(ennemi.nom,ennemi.force,joueur.pv))
                wait()
                
        
    HUD_COMBAT(joueur,ennemi)
    dial("Félicitation ! {} est mort".format(ennemi.nom))
    wait()
    return

#### HUD                  
def HUD(joueur):
    
    saut()
    print("\033[{};{}H\033[0;32m{}, {}".format(2,0,joueur.nom,joueur.classe))
    print("\033[{};{}HPv : {}".format(3,0,joueur.pv))
    print("\033[{};{}HForce : {}\033[0m".format(4,0,joueur.force))
    
    if joueur.classe == "Magicien":
        print("\033[{};{}H\033[0;32m{}, {}\033[0m".format(5,0,joueur.mana))            
def HUD_PNJ(PNJ):
    
    print("\033[{};{}H\033[0;31m{}".format(7,0,PNJ.nom))
    print("\033[{};{}HPv : {}".format(8,0,PNJ.pv))
    print("\033[{};{}HForce : {}\033[0m".format(9,0,PNJ.force))
def HUD_COMBAT(joueur,ennemi):
    HUD(joueur) 
    HUD_PNJ(ennemi)
def HUD_INVENTAIRE():
    columns = os.get_terminal_size().columns 
    print("\033[{};{}H\033[0;33mInventaire\033[0m".format(2, columns-10))


######## Ce qui est dans le programme principal
#### OBLIGATOIRE #### Création du personnage, présentation du jeu, et interface
def P1():
    # initialisation des branches
    x = 0
    # Bonjour aventurier
    saut()
    print("Bonjour aventurier, prêt pour l'aventure ?")
    wait()
    
    # Choisir un nom
    saut()
    print("Déjà, comment est-ce que tu t'appelle ?")
    nom = wait()
    if len(nom) == 0:
        print("Fait un petit effort, choisi toi un nom au moins.")
        nom = wait()
        if len(nom) == 0:
            print("Allez, pour me faire plaisir, s'il te plait, seulement un petit caractère.")
            nom = wait()
            if len(nom) == 0:
                print("Bon monsieur le têtu ! Très bien, il me faut un nom et je ne bougerai pas tant que tu n'en a pas choisi un.")
                nom = wait()
                x = 1
                while len(nom) == 0:
                    saut()
                    print("Donne moi un nom")
                    nom = wait()
    
    
    # Validation du nom
    saut()
    print("{} ? J'aime bien ! ".format(nom))
    wait()
    
    # Choix du personnage
    saut()
    print("Très bien {}, Maintenant on va te choisir un personnage.".format(nom))
    if x == 1 :
        print("( En ésperant que tu ne soit pas aussi têtu pour choisir ta classe que pour te choisir un nom. )")
    else :
        pass
    wait()
    
    # Présentation des classes
    saut()
    print("Pour le moment, tu n'a le choix qu'entre :")
    print("1 : le Guerrier.")
    print("2 : Le Magicien.")
    print("( Ecrit simplement 1 ou 2, je me débrouille pour le reste )")
    classe = wait()
    
    # Selection de la classe et variante
    if classe in ["1"] :
        saut()
        print("Le Guerrier donc !")
        print("Le Guerrier commence la partie avec 3 de force et 10 point de vie.")
        wait()
        
    elif classe in ["2"]:
        saut()
        print("Le Magicien donc !")
        print("Le Magicien commence la partie avec 1 de force, 6 point de vie et 3 points de mana.")
        wait()
        
    else : 
        if x == 0:
            saut()
            print("Oups, je ne t'ai pas compris, 1 pour le Guerrier, 2 pour le Magicien.")
            print("Tu peux aussi écrire Guerrier ou Magicien.")
            print("( Si tu aime te compliquer la vie )")
            classe = wait()
            if classe not in ["1","2","Guerrier","Magicien","guerrier","magicien"] :
                print("Un petit effort, c'est de niveau CP")
                wait()
                while classe not in ["1","2","Guerrier","Magicien","guerrier","magicien"] :
                    saut()
                    print("1 : Guerrier.")
                    print("2 : Magicien.")
                    classe = wait()
                
        if x == 1:
            saut()
            print("Ah non, non ! ça ne vas pas recommencer, c'est simple, 1 pour le Guerrier, 2 pour le Magicien.")
            print("Ou au pire, écrit Guerrier ou Magicien si tu es tordu")
            classe = wait()
            if classe not in ["1","2","Guerrier","Magicien","guerrier","magicien"] :
                saut()
                print("Je ne bougerais")
                while classe not in ["1","2","Guerrier","Magicien","guerrier","magicien"] :
                    saut()
                    print("1 : Guerrier.")
                    print("2 : Magicien.")
                    classe = wait()
    # Attribution de la classe choisi à la variable classe               
    if classe in ["1","Guerrier","guerrier"]:

        joueur = Joueur(nom,"Guerrier",10,3,x)
    if classe in ["2","Magicien","magicien"]:
        
        joueur = Joueur(nom,"Magicien",6,1,3)
        
    # Validation de la classe               
    saut()
    print("{} tu jouera donc la classe {}".format(joueur.nom,joueur.classe))
    wait()
    
    # Présentation du HUD
    saut()
    print("Pas besoin de noté tes caractéristiques, tout est enregistrer, regarde..")
    wait()
    
    saut()
    HUD(joueur)
    print("")

    print("Tadaaaaa ! ")
    wait()
    
    HUD(joueur)
    dial("Bon, en revanche je suis obliger maintenant d'écrire en bas, sinon c'est le foutoire")
    wait()
    
    HUD(joueur)
    dial("Mais au moins, tu a en permanence tes caractéristique ! Et puis, c'est dynamique, regarde je te rajoute un point de vie, je suis sympa.")
    wait()
    joueur.pv += 1
    
    HUD(joueur)
    dial("Merveilleux, non ?")
    wait()
    return joueur
#### Pose la question au joueur s'il veut effectuer le tuto d'apprentissage pour se servir du jeu ou non
def Tuto_question(joueur):
    while True:
        saut()
        print("Veut-tu faire le tuto pour apprendre les bases du combat, et de la gestion d'inventaire ?")
        tuto = input("")
        if tuto in ["oui","Oui","OUI"]:
            P2(joueur)
            P3(joueur)
            return
        elif tuto in ["non","Non","NON"]:
            saut()
            print("Ok, c'est noté, tu dois déjà tout connaitre. On skip le tuto")
            wait()
            return
        else :
            saut()
            print("Désolé, je n'ai pas compris")
            wait()
#### TUTO #### Premier combat, initiation au bouton attaquer
def P2(joueur):
    
    HUD(joueur)
    dial("Bon, et si maintenant on essayait un premier combat ?") 
    wait()
    
    HUD(joueur)
    dial("Voici un rat, hop")
    wait()
    
    ennemi = PNJ("Rat",7,1) 
    HUD_COMBAT(joueur, ennemi)
    dial("héhé, on va voir comment est-ce que tu t'en sors.")
    wait()
    
    combat(joueur,ennemi)
    
    HUD(joueur)
    dial("Alors, ça fait quel effet ?")
    wait()
#### TUTO #### Premier objet, et inventaire
def P3(joueur):
    
    HUD(joueur)
    dial("Tiens, regarde, le rat a laisser tomber quelque chose : {}".format("\033[0;33mDent en or\033[0m"))
    wait()
    
    HUD(joueur)
    HUD_INVENTAIRE()
    dial("Et voilà, ton inventaire se situe en haut à droite.")
    
    
#### Programe principal  
def Jeu():
    joueur = P1()
    Tuto_question(joueur)

Jeu()

