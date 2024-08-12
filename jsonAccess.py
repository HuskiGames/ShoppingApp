import json
from uuid import UUID
import os

# [name, description, img, quick location name (Aisle), quick location spot (7), x, y]

dir_path = os.path.dirname(os.path.realpath(__file__))

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)

def SetProducts(list, filename = os.path.join(dir_path, "static/json/Shop1", "Products.json")):
    with open(filename, 'w') as file:
        json.dump(list, file, indent=3)

def GetProducts(filename = os.path.join(dir_path, "static/json/Shop1", "Products.json")):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list

def GetUsers(filename = os.path.join(dir_path, "static/json/Shop1", "users.json")):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list
            
def SetUsers(list, filename = os.path.join(dir_path, "static/json/Shop1", "users.json")):
    with open(filename, 'w') as file:
        
        json.dump(list, file, indent=3, cls=UUIDEncoder)
    
def GetShop(filename = os.path.join(dir_path, "static/json/Shop1", "Shop.json")):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list
