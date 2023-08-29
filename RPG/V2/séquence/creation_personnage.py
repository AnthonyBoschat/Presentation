#### Création du personnage, nom, sexe, choix de classe

import f

p1 = f.classe.personnage(None,None,None,None,None,None,None)

def choix_nom():
  
    while True:
        
        f.clear()
        nom = f.input_center("Nom ?","")
        if len(nom) >= 1:
            f.clear()
            valid = f.input_center("Êtes vous sûr de vouloir vous appelez {} ?".format(nom),"")
            valid = valid.lower()
            if valid in ["oui","yes","yeah"]:
                return nom
            if valid in ["non","no","nope"]:
                pass
            else : 
                f.clear()
                f.input_center("Je n'ai pas compris ce que vous vouliez.","")
                f.clear()
                while True:
                    f.clear()
                    f.indice_center("( Oui / Non )")
                    valid = f.input_center("Êtes vous sûr de vouloir vous appelez {} ?".format(nom),"")
                    valid = valid.lower()
                    if valid in ["oui","yes","yeah"]:
                        return nom
                    if valid in ["non","no","nope"]:
                        break
                    
        if len(nom) < 1:
            pass
            
    return nom

def choix_sexe():
    
    f.clear()
    
    while True:
        
        
        sexe = f.input_center("Sexe ?","")
        sexe = sexe.lower()
        if sexe in ["homme","garçon","boy","mâle"]:
            sexe = "h"
            return sexe
            
        if sexe in ["femme","fille","girl","femelle"]:
            sexe = "f"
            return sexe
            
        else:
            f.clear()
            f.input_center("Je n'ai pas compris ce que vous vouliez.","")
            f.clear()
            f.indice_center("( Homme / Femme )")
                
def choix_classe():
    
    x = 0
    
    while True:
        
        f.clear()
        f.print_center(-4,0,"Entrer pour selectionner")
        f.indice_center("<---   Classe    --->")
        
        if x == 0:
            f.print_center(1,0,"Guerrier")
            f.print_center(3,0,"♥  : 12")
            f.print_center(4,0,"Force : 3")
            f.print_center(5,0,"Attaque 1 X par tour")
        elif x == 1:
            f.print_center(1,0,"Voleur")
            f.print_center(3,0,"♥  : 8")
            f.print_center(4,0,"Force : 2")
            f.print_center(5,0,"Attaque 2 X par tour")
        elif x == 2:
            f.print_center(1,0,"Magicien")
            f.print_center(3,0,"♥  : 6")
            f.print_center(4,0,"Force : 1")
            f.print_center(5,0,"Attaque 1 X par tour")
            f.print_center(6,0,"Mana : 10")
        
        f.keyboard.read_event()
    
        if f.keyboard.is_pressed("droite") or f.keyboard.is_pressed("right"):
            if  x < 2:
                x += 1
            else : 
                x = 0
        if f.keyboard.is_pressed("gauche") or f.keyboard.is_pressed("left"):
            if x > 0 :
                x -= 1
            else : 
                x = 2
        if f.keyboard.is_pressed("enter"):
                
            while True:
            
                f.clear()
                f.print_center(-4,0,"Entrer pour valider / esc pour annuler")
                f.indice_center("<---   Classe    --->")
                
                if x == 0:
                    f.print_center(1,0+3,"\033[0;94mGuerrier")
                    f.print_center(3,0,"♥  : 12")
                    f.print_center(4,0,"Force : 3")
                    f.print_center(5,0+2,"Attaque 1 X par tour\033[0m")
                elif x == 1:
                    f.print_center(1,0+3,"\033[0;94mVoleur")
                    f.print_center(3,0,"♥  : 8")
                    f.print_center(4,0,"Force : 2")
                    f.print_center(5,0+2,"Attaque 2 X par tour\033[0m")
                elif x == 2:
                    f.print_center(1,0+3,"\033[0;94mMagicien")
                    f.print_center(3,0,"♥  : 6")
                    f.print_center(4,0,"Force : 1")
                    f.print_center(5,0,"Attaque 1 X par tour")
                    f.print_center(6,0+2,"Mana : 10\033[0m")
                    
                f.keyboard.read_event()
                
                if f.keyboard.is_pressed("enter"):
                    if x == 0:
                        return ["Guerrier",12,3,None]
                    if x == 1:
                        return ["Voleur",8,2,None]
                    if x == 2:
                        return ["Magicien",6,1,10]
                if f.keyboard.is_pressed("esc"):
                    break                     
  

p1.nom = choix_nom()
p1.sexe = choix_sexe()
value_classe = choix_classe()
p1.classe = value_classe[0]
p1.pv_max = value_classe[1]
p1.force = value_classe[2]
p1.mana = value_classe[3]


