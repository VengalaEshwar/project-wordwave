package com.eshwar.WordWave.services;

import com.eshwar.WordWave.dtos.BlogDTO;
import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.Comment;
import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.repos.BlogRepo;
import com.eshwar.WordWave.repos.CommentRepo;
import com.eshwar.WordWave.repos.UserRepo;
import com.eshwar.WordWave.utils.MyResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class BlogService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    BlogRepo blogRepo;

    @Transactional
    public Blog postBlog(User user, Blog blog) {
        try {
            User dbUser = userRepo.findByUsername(user.getUsername());

            blog.setAuthor(dbUser);
            Blog savedBlog = blogRepo.save(blog);

            dbUser.getBlogs().add(savedBlog);
            userRepo.save(dbUser);
            System.out.println(dbUser.getUsername());
            return savedBlog;

        } catch (Exception e) {
            System.out.println("Error occurred in creating the blog\n" + e.getMessage());
            return null;
        }
    }


    public MyResponse<Object> fetchAllBlogs() {
        try{
            List<Blog> blogs = blogRepo.findAll();
            List<BlogDTO> blogDTOs = new ArrayList<>();
            for(Blog blog  : blogs)
                blogDTOs.add(convertToDTO(blog));
            return new MyResponse<>(
                    blogDTOs,
                    "no error",
                    "Fetched the all the blogs",
                    true
            );
        }catch(Exception e){
            System.out.println("Error occurred in creating the blog\n" + e.getMessage());
            return new MyResponse<>(
                    "Error occurred ",
                    e.getMessage(),
                    "Try again",
                    false
                    );
        }
    }
    public BlogDTO convertToDTO(Blog blog) {
        return new BlogDTO(blog);
    }

    @Autowired
    private CommentRepo commentRepo;
    public Comment addComment(User user, Blog blogg, Comment comment) {
        // Fetch fresh user from DB to avoid detached entities
        User fetchedUser = userRepo.findByUsername(user.getUsername());
        Blog blog = blogRepo.findById(blogg.getId()).orElse(null);
        // Set author and blog in comment
        comment.setAuthor(fetchedUser);
        comment.setBlog(blog);

        // Save the comment
        Comment savedComment = commentRepo.save(comment);

        // Add the comment to user's comments list
        if(fetchedUser.getComments()==null)
            fetchedUser.setComments(new ArrayList<>());
        fetchedUser.getComments().add(savedComment);
        userRepo.save(fetchedUser);

        // Add the comment to blog's comments list
        if(blog.getComments()==null)
            blog.setComments(new ArrayList<>());
        blog.getComments().add(savedComment);
        blogRepo.save(blog);

        // Return the saved comment
        return savedComment;
    }

}
