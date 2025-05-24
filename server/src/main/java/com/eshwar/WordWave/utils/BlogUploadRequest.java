package com.eshwar.WordWave.utils;

import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BlogUploadRequest {
    private Blog blog;
    private User user;
    private MultipartFile image;
}
