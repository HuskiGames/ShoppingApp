import os
from PIL import Image

def downscale_images(input_folder, output_folder, scale_factor=0.3):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through all files in the input folder
    for filename in os.listdir(input_folder):
        # Check if the file is an image
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')) and filename != "Map.png":
            # Open the image file
            with Image.open(os.path.join(input_folder, filename)) as img:
                # Calculate the new dimensions
                new_width = int(img.width * scale_factor)
                new_height = int(img.height * scale_factor)
                # Resize the image
                img_resized = img.resize((new_width, new_height), Image.LANCZOS)
                # Save the downscaled image in the output folder
                img_resized.save(os.path.join(output_folder, filename))

if __name__ == "__main__":
    input_folder = "ChatGPTImages"
    output_folder = "static/Images"
    downscale_images(input_folder, output_folder)
