from flask import Flask, request, jsonify, render_template
import os
app = Flask(__name__)
from SearchBar import update_listbox
import Usersignin


@app.route('/')
def index():
    return render_template("FindProductPage.html")

@app.route('/Signin', methods=['POST'])
def Signin():
    Username = request.form['name']
    Password = request.form['pass']
    print(Username + "  " + Password)
    return jsonify({
        'SigninCorrect': Usersignin.SignIn(Username, Password),
    })


@app.route('/Search', methods=['POST'])
def Search():
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
         
         'Search_Data_Img_1': update_listbox(input_data, 0, 2),
         'Search_Data_Img_2': update_listbox(input_data, 1, 2),
         'Search_Data_Img_3': update_listbox(input_data, 2, 2),
         'Search_Data_Img_4': update_listbox(input_data, 3, 2),
         'Search_Data_Img_5': update_listbox(input_data, 4, 2),
         
         'Search_Data_Aisle_Type_1': update_listbox(input_data, 0, 3),
         'Search_Data_Aisle_Type_2': update_listbox(input_data, 1, 3),
         'Search_Data_Aisle_Type_3': update_listbox(input_data, 2, 3),
         'Search_Data_Aisle_Type_4': update_listbox(input_data, 3, 3),
         'Search_Data_Aisle_Type_5': update_listbox(input_data, 4, 3),
         
         'Search_Data_Aisle_1': update_listbox(input_data, 0, 4),
         'Search_Data_Aisle_2': update_listbox(input_data, 1, 4),
         'Search_Data_Aisle_3': update_listbox(input_data, 2, 4),
         'Search_Data_Aisle_4': update_listbox(input_data, 3, 4),
         'Search_Data_Aisle_5': update_listbox(input_data, 4, 4)
         })
    
if __name__ == '__main__':
    app.run()
    # app.run(debug=True, host="0.0.0.0", port="4200", ssl_context='adhoc')


