#### initialisation des classes et de leurs attributs

class personnage():
    
    def __init__(self,nom,classe,pv_max,pv_rest,force,mana,sexe):
        
        self.nom = nom
        self.classe = classe
        self.pv_max = pv_max
        self.pv_rest = pv_rest
        self.force = force
        self.mana = mana
        self.sexe = sexe

class ennemi():
    
    def __init__(self,nom,pv_max,pv_rest,force):
        
        self.nom = nom
        self.pv_max = pv_max
        self.pv_rest = pv_rest
        self.force = force
    