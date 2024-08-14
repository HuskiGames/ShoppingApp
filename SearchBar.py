import jsonAccess

def update_listbox(name, index, D = 0,  id = False):
    global words
    
    filtered_words = []
    filtered_Index = []
    
    # gets list
    products = jsonAccess.GetProducts()
    search_term = name.lower()
    if search_term == "":
        return
    
    # reduces amount of things going into bubble sort
    if(len(search_term) < 0):
        return
    
    for i in range(len(products)):
        if(search_term.lower() in products[i][0].lower()): # products[i][0] is the name
            filtered_words.append(products[i])
            filtered_Index.append(i)


    # bubble sort
    Totalchanges = 0;
    changes = 0;
    lock = True
    i = 1;
    while(lock):   
        if(len(filtered_words) > 1): # checks if there are 2 items !impotent
            
            # Compares items 
            if(filtered_words[i - 1][0].lower().find(search_term.lower()) > filtered_words[i][0].lower().find(search_term.lower())):
                changes += 1
                Totalchanges += 1
                tmp = filtered_words[i]
                filtered_words[i] = filtered_words[i - 1]
                filtered_words[i - 1] = tmp

            i += 1

        # checks for exit case
        if(i >= len(filtered_words) - 1):
            if(changes == 0):
                
                lock = False
            else:
                lock = True
            i = 1
            changes = 0      
    
    # returns index of filtered_Index
    if len(filtered_words) > index:
        if(id):
            return filtered_Index[index]
        else:
            return filtered_words[index][D] 
    else:
        return ""    


# import jsonAccess

# def update_listbox(name, index, D = 0,  id = False):
#     global words
#     products = jsonAccess.GetProducts()
#     search_term = name.lower()
#     if search_term:
#         filtered_words = []
#         filtered_Index = []
#         for word in search_term.split():
#             if(len(word) > 0):
#                 for i in range(50):
#                     if(word.lower() in products[i][0].lower()):
#                         filtered_words.append(products[i])
#                         filtered_Index.append(i)
#         if len(filtered_words) > index:
#             if(id):
#                 return filtered_Index[index]
#             else:
#                 return filtered_words[index][D] 
#         else:
#             return ""
#     else:
#         return ""   