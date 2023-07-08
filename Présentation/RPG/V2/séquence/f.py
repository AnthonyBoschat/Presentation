######## Instance de toute les fonctions et tout les imports

import os
import classe
import jauge
import keyboard

#### clear le terminal
def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

#### input dans le vide
def wait():
    return input("")

#### Print une question et une input au centre
def input_center(q,r):
    
    lines = os.get_terminal_size().lines
    columns = os.get_terminal_size().columns
    
    print("\033[{};{}H{}".format((lines//3)-1,(columns//2)-(len(q)//2),q))
    reponse = input("\033[{};{}H{}".format((lines//3)+1,(columns//2)-3,r))
    
    return reponse

#### Print quelque chose au centre ( pour le moment, sert à rien )
def print_center(o,a,p):
    
    lines = os.get_terminal_size().lines
    columns = os.get_terminal_size().columns
    
    print("\033[{};{}H{}".format((lines//3)+o,((columns//2)-(len(p)//2))+a,p))

#### Indice quelque chose au centre
def indice_center(i):
    
    lines = os.get_terminal_size().lines
    columns = os.get_terminal_size().columns
    
    print("\033[{};{}H{}".format((lines//3)-2,(columns//2)-(len(i)//2),i))