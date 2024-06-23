from openai import OpenAI
import requests
import json

# disabled lol
client = OpenAI(api_key="sk-proj-YTL8INj0jCJUYdyGDd9MT3BlbkFJTAAGNwLu1HPdzVUYVKYH")

def CreateImage(Item, desc):
    print("Creating " + Item)
    response = client.images.generate(
        model="dall-e-3",
        prompt= "a picture of only" + Item + " (" + desc + ")" + ", needs to look like a simple cartoon food that you would find in a shop and be framed so the whole item is fully visible, make the background contrast the item",
        quality="standard",
        n=1
    )

    image_url = response.data[0].url

    img_data = requests.get(image_url).content
    with open('ChatGPTImages/' + Item.lower() + '.jpg', 'wb') as handler:
        handler.write(img_data)
    return Item.lower() + '.jpg'


count = 0

while count < 90:
    link = CreateImage(json.GetProducts()[count][0], json.GetProducts()[count][1])
    print("Created " + link)
    list = json.GetProducts()
    list[count][3] = link
    json.SetProducts(list)
    count = count + 1