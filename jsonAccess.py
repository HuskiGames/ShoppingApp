import json
import os

# [name, description, img, quick location name (Aisle), quick location spot (7), x, y]

dir_path = os.path.dirname(os.path.realpath(__file__))

def SetProducts(list, filename = os.path.join(dir_path, "static/json/Shop1", "Products.json")):
    with open(filename, 'w') as file:
        json.dump(list, file, indent=3)

def GetProducts(filename = os.path.join(dir_path, "static/json/Shop1", "Products.json")):
    with open(filename, 'r') as file:
        list = json.load(file)
    return list
