package com.eshwar.WordWave.dtos;

import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO {
    private Long id;
    private String title;
    private String content;
    private List<String> tags;
    private LocalDateTime createdAt;
    private UserDTO author;
    private List<CommentDTO> comments;
    // Constructor
    public BlogDTO(Blog blog) {
        this.id = blog.getId();
        this.title = blog.getTitle();
        this.content = blog.getContent();
        this.tags = blog.getTags();
        this.createdAt = blog.getCreatedAt();
        this.author = new UserDTO(blog.getAuthor()); // Construct UserDTO from the Blog's author
        this.comments = blog.getComments().stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());;
    }

    // Getters and Setters
}
