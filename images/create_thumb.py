from PIL import Image
import os

# Paths
input_folder = "images"      # where your original images are
output_folder = "images/thumbs"  # where thumbnails will be saved
thumb_size = (600, 600)      # thumbnail size (change as needed)

# Make sure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Loop through all files in input folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # Create thumbnail (keeps aspect ratio)
        img.thumbnail(thumb_size)

        # Save to thumbs folder
        out_path = os.path.join(output_folder, filename)
        img.save(out_path, "JPEG", quality=85)

        print(f"Created thumbnail: {out_path}")
