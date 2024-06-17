from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

import static.ProductAccess as ProductAccess 

def update_listbox(name, index, D = 0):
    global words
    search_term = name.lower()
    if search_term:
        # filtered_words = [word for word in Products.list if  word[0].lower().startswith(search_term)]
        filtered_words = []
        for word in search_term.split():
            if(len(word) > 0):
                for product in ProductAccess.GetProducts():
                    if(word.lower() in product[0].lower()):
                        filtered_words.append(product)
                        
        for product in ProductAccess.GetProducts():
            if(product[2].lower().startswith(search_term.lower())):
                filtered_words.append(product)

        if len(filtered_words) > index:
            return filtered_words[index][D] 
        else:
            return ""
            

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    input_data = request.form['input_data']
    return jsonify(
        {'Search_Data_Name_1': update_listbox(input_data, 0, 0),
         'Search_Data_Name_2': update_listbox(input_data, 1, 0),
         'Search_Data_Name_3': update_listbox(input_data, 2, 0),
         'Search_Data_Name_4': update_listbox(input_data, 3, 0),
         'Search_Data_Name_5': update_listbox(input_data, 4, 0),
         
         'Search_Data_Desc_1': update_listbox(input_data, 0, 1),
         'Search_Data_Desc_2': update_listbox(input_data, 1, 1),
         'Search_Data_Desc_3': update_listbox(input_data, 2, 1),
         'Search_Data_Desc_4': update_listbox(input_data, 3, 1),
         'Search_Data_Desc_5': update_listbox(input_data, 4, 1),
         
         'Search_Data_Barcode_1': update_listbox(input_data, 0, 2),
         'Search_Data_Barcode_2': update_listbox(input_data, 1, 2),
         'Search_Data_Barcode_3': update_listbox(input_data, 2, 2),
         'Search_Data_Barcode_4': update_listbox(input_data, 3, 2),
         'Search_Data_Barcode_5': update_listbox(input_data, 4, 2),
         
         'Search_Data_Img_1': update_listbox(input_data, 0, 3),
         'Search_Data_Img_2': update_listbox(input_data, 1, 3),
         'Search_Data_Img_3': update_listbox(input_data, 2, 3),
         'Search_Data_Img_4': update_listbox(input_data, 3, 3),
         'Search_Data_Img_5': update_listbox(input_data, 4, 3),
         
         'Search_Data_Aisle_Type_1': update_listbox(input_data, 0, 4),
         'Search_Data_Aisle_Type_2': update_listbox(input_data, 1, 4),
         'Search_Data_Aisle_Type_3': update_listbox(input_data, 2, 4),
         'Search_Data_Aisle_Type_4': update_listbox(input_data, 3, 4),
         'Search_Data_Aisle_Type_5': update_listbox(input_data, 4, 4),
         
         'Search_Data_Aisle_1': update_listbox(input_data, 0, 5),
         'Search_Data_Aisle_2': update_listbox(input_data, 1, 5),
         'Search_Data_Aisle_3': update_listbox(input_data, 2, 5),
         'Search_Data_Aisle_4': update_listbox(input_data, 3, 5),
         'Search_Data_Aisle_5': update_listbox(input_data, 4, 5)
         })

if __name__ == '__main__':
    app.run()
