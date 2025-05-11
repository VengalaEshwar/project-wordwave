package com.eshwar.WordWave.utils;

import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.User;
import lombok.Data;

@Data
public class BlogUploadRequest {
    private Blog blog;
    private User user;
}
