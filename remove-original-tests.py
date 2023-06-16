# Este script foi feito com a ajuda do ChatGPT:
# https://chat.openai.com/share/cbfdca6c-10a2-45ab-badf-24475b20f256

import os

def delete_files_with_spec_extension(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith("spec.ts"):
                file_path = os.path.join(root, file)
                print(f"Deleting file: {file_path}")
                os.remove(file_path)

        for dir in dirs:
            delete_files_with_spec_extension(dir)

# Specify the folder path to start the traversal
folder_path = "src"

# Call the function to delete files
delete_files_with_spec_extension(folder_path)
