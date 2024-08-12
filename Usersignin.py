from uuid import uuid4
import jsonAccess
from flask import jsonify

def SignIn(name, password):
    NewToken = createToken()
    Users = jsonAccess.GetUsers()
    
    if name == "admin" and password == "admin":                
        for i in range(len(Users)):
            if Users[i][0] == name and Users[i][1] == password:
                Users[i][3] = NewToken
        
        jsonAccess.SetUsers(Users)
        
        return jsonify({
            'SignedIn': "True",
            'Token': NewToken
            })    
        
    for i in range(len(Users)):
        if Users[i][0] == name and Users[i][1] == password:
            Users[i][3] = NewToken
            
    jsonAccess.SetUsers(Users)
    
    # return jsonify({
    #     'SignedIn': "True",
    #     'Token': NewToken
    # })    

    
    return jsonify({
        'SignedIn': "False",
        'Message': "Name and password doesn't exist"
        })
    


def createToken():
    return uuid4();