board=[".",".",".",".",".",".",".",".","."],[""],["."],[""],["."],[""],["."]
n=["1","2","3","4","5","6","7","8","9","10","11","12"]


#### J'ai aucune idée de ton utilité gros
def newboard(n):
    return [0]*n
#### Afficher jeu   
def display(board,n):
    print(*board[0],*board[1],*board[2],*board[3],*board[4],*board[5],*board[6])
    print(*n)

#### coup légal
def possible(board,n,i):
    if str(i) in n and int(i)<9 and int(i)>1 and board[0][int(i)-1] == "." and board[0][int(i)-2] != "X" and board[0][int(i)] != "X":
        return True
    elif str(i) in n and int(i) == 9 and board[0][8] == "." and board[0][7] != "X" and board[2][0] != "X":
        return True
    elif str(i) in n and int(i) == 10 and board[2][0] == "." and board[0][8] != "X" and board[4][0] != "X":
        return True
    elif str(i) in n and int(i) == 11 and board[4][0] == "." and board[2][0] != "X" and board[6][0] != "X":
        return True
    elif str(i) in n and int(i) == 12 and board[6][0] == "." and board[4][0] != "X":
        return True
    elif str(i) in n and int(i) == 1 and board[0][0] == "." and board[0][1] != "X":
        return True


#### Interaction joueur
def select(board,n):
    while True:
        i=input("Choisissez un coup légal pour votre pion : ")
        if possible(board,n,int(i)) == True:
            return i


#### mise a jour du plateau de jeu
def put(board,n,i):
        i=int(i)
        if i<9 and i>1:
            board[0][i-1]="X"
            board[0][i-2]="O"
            board[0][i]="O"
        elif i == 9:
            board[0][8]="X"
            board[0][7]="O"
            board[2][0]="O"
        elif i == 10:
            board[2][0]="X"
            board[0][8]="O"
            board[4][0]="O"
        elif i == 11:
            board[4][0]="X"
            board[2][0]="O"
            board[6][0]="O"
        elif i == 12:
            board[6][0]="X"
            board[4][0]="O"
        elif i == 1:
            board[0][0]="X"
            board[0][1]="O"
        display(board,n)



#### fonction possibilité de suite ou non
def again(board,n):
        for element in n:
            if possible(board,n,element) == True :
                return True
        return False

#### écriture du déroulé du programme
def Dawson(n):
    display(board,n)
    while True:
        print("Joueur 1")
        i=select(board,n)
        put(board,n,i)
        if again(board,n) == True:
            while True:
                print("joueur 2")
                i=select(board,n)
                put(board,n,i)
                if again(board,n) == True:
                    break                    
                if again(board,n) == False:
                    print("La victoire revient au joueur 2 !")
                    return
                
        if again(board,n) == False:
            print("la victoire revient au joueur 1 !")
            break

Dawson(n)

