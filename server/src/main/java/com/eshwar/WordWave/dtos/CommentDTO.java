package com.eshwar.WordWave.dtos;

import com.eshwar.WordWave.models.Comment;
import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private String createdAt;
    private String authorUsername;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCommentedAt().toString(); // Format as needed
        this.authorUsername = comment.getAuthor().getUsername(); // Or use a nested UserDTO if needed
    }

    // Getters and Setters
}

