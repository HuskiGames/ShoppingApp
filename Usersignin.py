from uuid import uuid4
import jsonAccess

def SignIn(name, password):
    
    # jsonAccess.GetUsers

    
    if name == "1" and password == "1":
        return True
    else:
        return False;


def createToken():
    return uuid4();