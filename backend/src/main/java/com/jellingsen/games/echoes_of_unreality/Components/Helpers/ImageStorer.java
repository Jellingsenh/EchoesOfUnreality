package com.jellingsen.games.echoes_of_unreality.Components.Helpers;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

import java.io.File;
import java.io.IOException;

public class ImageStorer {
    private String locationImageStoragePath = "../../imageStorage/locationImages";

    public ImageStorer() {}

    public String saveImage(MultipartFile imageFile, String name, String type) { // returns filepath
        try {
            Path imageSavePath = Paths.get(locationImageStoragePath);
            // System.out.println(imageSavePath);
            if (!Files.exists(imageSavePath)) {
                Files.createDirectories(imageSavePath);
            }

            //  3. Clean and secure the filename to prevent Path Traversal attacks
            String originalFilename = imageFile.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = name + "-" + type + fileExtension;

            // File fileExists = new File(locationImageStoragePath + "/" + uniqueFilename);
            // if (fileExists.exists()) {
            //     return uniqueFilename; // do not save if already exists (should only happen after a rename)
            // }

            // 4. Resolve the absolute target path
            Path targetLocation = imageSavePath.resolve(uniqueFilename);
            // 5. Stream the contents of the MultipartFile into the final folder
            Files.copy(imageFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            // System.out.println("Stored image: " + uniqueFilename);
            return uniqueFilename;
        } catch (Exception e) {
            System.out.println("Error storing image: " + e.getMessage());
        }
        return null;
    }

    public ResponseEntity<byte[]> retreiveImage(String imageName) {
        try {
            File imgFile = new File(locationImageStoragePath + "/" + imageName);
            if (!imgFile.exists()) {
                return ResponseEntity.ok().body("NOIMAGE".getBytes(StandardCharsets.UTF_8));  // NOIMAGE
            }
            byte[] imageBytes = Files.readAllBytes(imgFile.toPath());

            // Dynamic content type evaluation (Optional)
            MediaType contentType = imageName.toLowerCase().endsWith(".png") ? 
                    MediaType.IMAGE_PNG : 
                    MediaType.IMAGE_JPEG;

            return ResponseEntity.ok()
                .contentType(contentType)
                .body(imageBytes);
        } catch (Exception e) {
            System.out.println("Error retreiving image: " + e.getMessage());
        }
        return ResponseEntity.badRequest().body("Error".getBytes(StandardCharsets.UTF_8));
    }

    public boolean deleteImage(String imageName) {
        if (imageName == null) { return false; }
        Path imagePath = Paths.get(locationImageStoragePath + "/" + imageName);
        try {
            // Deletes the file if it exists, avoids throwing an error if it doesn't
            return Files.deleteIfExists(imagePath);
        } catch (IOException e) {
            // Triggers if the file is locked, in use, or permissions are denied
            System.err.println("Failed to delete image: " + e.getMessage());
        }
        return false;
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int dotIndex = filename.lastIndexOf(".");
        
        // Ensure the dot exists and is not the first or last character
        if (dotIndex >= 0 && dotIndex < filename.length() - 1) {
            return filename.substring(dotIndex + 1);
        }
        return ""; // No extension found
    }

    public void changeImageFileName(String oldImageFileName, String newImageName, LocationType type) {
        if (oldImageFileName == null) { return; }

        Path imagePath = Paths.get(locationImageStoragePath + "/" + oldImageFileName);

        String newFileName = newImageName + "-" + type + "." + getFileExtension(oldImageFileName);

        // File newImageFile = new File(locationImageStoragePath + "/" + newFileName);
        // if (newImageFile.exists()) {
        //     deleteImage(oldImageFileName);
        //     return; // do not rename if new name already exists, judt delete old one
        // }

        try {
            // System.out.println("Renaming image");
            Files.move(imagePath, imagePath.resolveSibling(newFileName), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {

        }

    }
}
