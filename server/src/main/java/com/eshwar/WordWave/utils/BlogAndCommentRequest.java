package com.eshwar.WordWave.utils;

import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.Comment;
import com.eshwar.WordWave.models.User;
import lombok.Data;

@Data
public class BlogAndCommentRequest {
    private Blog blog;
    private Comment comment;
    private User user;
}
