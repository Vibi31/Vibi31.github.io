from PIL import Image, ExifTags
import os

input_folder = "images"
output_folder = "images/thumbs"
thumb_size = (600, 600)

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # Fix EXIF orientation
        try:
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation]=='Orientation':
                    break
            exif=dict(img._getexif().items())

            if exif[orientation] == 3:
                img = img.rotate(180, expand=True)
            elif exif[orientation] == 6:
                img = img.rotate(270, expand=True)
            elif exif[orientation] == 8:
                img = img.rotate(90, expand=True)
        except:
            pass

        # Create thumbnail
        img.thumbnail(thumb_size)
        out_path = os.path.join(output_folder, filename)
        img.save(out_path, "JPEG", quality=85)
        print(f"Created thumbnail: {out_path}")
