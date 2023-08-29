import f

p1 = f.classe.personnage("Anthony","Guerrier",10,8,3,None,"h")
p2 = f.classe.personnage("Solène","Sorcière",8,4,1,10,"f")
p3 = f.classe.personnage("Mathias","Voleur",6,4,4,None,"h")

e1 = f.classe.ennemi("Araignée",10,2,1)
e2 = f.classe.ennemi("Chauve-souris",15,3,1)
e3 = f.classe.ennemi("Squelette",10,7,2)

liste = [p1.nom, p2.nom, p3.nom, e1.nom, e2.nom, e3.nom]


def HUD():
    
    f.clear()
    
    #### Récuparation taille terminal
    lines = f.os.get_terminal_size().lines
    columns = f.os.get_terminal_size().columns
    
    #### Position du nom / classe
    
    # Personnage
    lines_nom_classe_1 = (lines//6)
    lines_nom_classe_2 = (lines//6)*2
    lines_nom_classe_3 = (lines//6)*3
    columns_nom_classe = (columns//4)
    
    # Ennemi
    lines_nom_ennemi_1 = (lines//6)
    lines_nom_ennemi_2 = (lines//6)*2
    lines_nom_ennemi_3 = (lines//6)*3
    columns_nom_ennemi = (columns//4)*3
    
    #### Ecriture du HUD dans le terminal
    
    # Pour les personnages
    if p1.nom in liste:
        print("\033[{};{}H\033[0;32m{}\033[0m".format(lines_nom_classe_1,columns_nom_classe,p1.nom))
        f.jauge.jauge_p(p1.pv_max,p1.pv_rest,lines_nom_classe_1,columns_nom_classe)
    if p2.nom in liste:
        print("\033[{};{}H\033[0;32m{}\033[0m".format(lines_nom_classe_2,columns_nom_classe,p2.nom))
        f.jauge.jauge_p(p2.pv_max,p2.pv_rest,lines_nom_classe_2,columns_nom_classe)
    if p3.nom in liste:
        print("\033[{};{}H\033[0;32m{}\033[0m".format(lines_nom_classe_3,columns_nom_classe,p3.nom))
        f.jauge.jauge_p(p3.pv_max,p3.pv_rest,lines_nom_classe_3,columns_nom_classe)
        
    # Pour les ennemis
    if e1.nom in liste:
        print("\033[{};{}H\033[0;31m{}\033[0m".format(lines_nom_ennemi_1,columns_nom_ennemi-len(e1.nom),e1.nom))
        f.jauge.jauge_e(e1.pv_max,e1.pv_rest,lines_nom_ennemi_1,columns_nom_ennemi,e1.nom)
    if e2.nom in liste:
        print("\033[{};{}H\033[0;31m{}\033[0m".format(lines_nom_ennemi_2,columns_nom_ennemi-len(e1.nom),e2.nom))
        f.jauge.jauge_e(e2.pv_max,e2.pv_rest,lines_nom_ennemi_2,columns_nom_ennemi,e1.nom)
    if e3.nom in liste:
        print("\033[{};{}H\033[0;31m{}\033[0m".format(lines_nom_ennemi_3,columns_nom_ennemi-len(e1.nom),e3.nom))
        f.jauge.jauge_e(e3.pv_max,e3.pv_rest,lines_nom_ennemi_3,columns_nom_ennemi,e1.nom)
        
    print("\n")
    print("\n")
    print("\n")
    print("\n")

    

        
HUD()
f.wait()


