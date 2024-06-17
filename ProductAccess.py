import json

def SetProducts(list, filename = "Products.json"):
    with open(filename, 'w') as file:
        json.dump(list, file, indent=3)

def GetProducts(filename = "Products.json"):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list