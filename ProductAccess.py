import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

def SetProducts(list, filename = os.path.join(dir_path, "Products.json")):
    with open(filename, 'w') as file:
        json.dump(list, file, indent=3)

def GetProducts(filename = os.path.join(dir_path, "Products.json")):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list