#### Fonction pour les personnages
def jauge_p(pv_max,pv_rest,lines_nom_classe_1,columns_nom_classe):
    
    x = 0
    
    #### Affiche les pv restant en rouge
    while x != pv_rest:
        print("\033[{};{}H\033[0;30;41m \033[0m".format(lines_nom_classe_1+1,columns_nom_classe,end=""))
        columns_nom_classe += 1
        x +=1
        
    #### Affiche les pv manquant (s'il y en a) en gris
    while x != pv_max:
        print("\033[{};{}H\033[1;30;100m \033[0m".format(lines_nom_classe_1+1,columns_nom_classe,end=""))
        columns_nom_classe += 1
        x +=1
        
    #### Affiche le nombre de point de vie restant à droite de la jauge
    print("\033[{};{}H\033[0;37m{}/{}\033[0m".format(lines_nom_classe_1+1,columns_nom_classe+2,pv_rest,pv_max))
    
    
    
#### Fonction pour les ennemis
def jauge_e(pv_max,pv_rest,lines_nom_classe_1,columns_nom_classe,nom):
    
    x = 0
    
    
     #### Affiche les pv restant en rouge
    while x != pv_rest:
        print("\033[{};{}H\033[0;30;41m \033[0m".format(lines_nom_classe_1+1,columns_nom_classe-len(nom),end=""))
        columns_nom_classe += 1
        x +=1
        
    #### Affiche les pv manquant (s'il y en a) en gris
    while x != pv_max:
        print("\033[{};{}H\033[1;30;100m \033[0m".format(lines_nom_classe_1+1,columns_nom_classe-len(nom),end=""))
        columns_nom_classe += 1
        x +=1
        
    #### Affiche le nombre de point de vie restant à droite de la jauge
    print("\033[{};{}H\033[0;37m{}/{}\033[0m".format(lines_nom_classe_1+1,columns_nom_classe-len(nom)+2,pv_rest,pv_max))
    
    

       