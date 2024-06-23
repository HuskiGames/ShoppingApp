import jsonAccess


def update_listbox(name, index, D = 0):
    global words
    products = jsonAccess.GetProducts()
    search_term = name.lower()
    if search_term:
        # filtered_words = [word for word in Products.list if  word[0].lower().startswith(search_term)]
        filtered_words = []
        for word in search_term.split():
            if(len(word) > 0):
                for product in products:
                    if(word.lower() in product[0].lower()):
                        filtered_words.append(product)
        if len(filtered_words) > index:
            print(filtered_words[index][D])
            return filtered_words[index][D] 
        else:
            return ""
    else:
        return ""   
