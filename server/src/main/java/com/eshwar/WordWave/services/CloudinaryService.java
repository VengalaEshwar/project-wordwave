package com.eshwar.WordWave.services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    /**
     * Uploads an image to Cloudinary.
     * @param image MultipartFile image to upload
     * @return the secure URL of the uploaded image
     * @throws IOException if upload fails
     */
    public String uploadToCloudinary(MultipartFile image) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                ObjectUtils.asMap(
                        "folder", "uploads",
                        "resource_type", "image"
                )
        );
        // The 'secure_url' key contains the HTTPS URL to the uploaded image
        return uploadResult.get("secure_url").toString();
    }

    /**
     * Deletes an image from Cloudinary using its public ID.
     * @param publicId the public ID of the image to delete
     * @return true if deletion was successful
     * @throws IOException if deletion fails
     */
    public boolean deleteFromCloudinary(String publicId) throws IOException {
        Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return "ok".equals(result.get("result"));
    }
}
