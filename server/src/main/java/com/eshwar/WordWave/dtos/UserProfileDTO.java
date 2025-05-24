package com.eshwar.WordWave.dtos;

import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String profileImage;
    private List<BlogDTO> blogs = new ArrayList<>();
    // Constructor
    public UserProfileDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profileImage = user.getProfileImage();
//        System.out.println(user.getBlogs());
        for(Blog blog  : user.getBlogs()){
            blogs.add(new BlogDTO(blog));
        }
    }

    // Getters and Setters
}
