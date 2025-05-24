package com.eshwar.WordWave.controllers;
import com.eshwar.WordWave.dtos.BlogDTO;
import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.Comment;
import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.services.BlogService;
import com.eshwar.WordWave.services.CloudinaryService;
import com.eshwar.WordWave.utils.BlogAndCommentRequest;
import com.eshwar.WordWave.utils.BlogUploadRequest;
import com.eshwar.WordWave.utils.MyResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    BlogService service;
    @Autowired
    CloudinaryService cloudinaryService;
    //crud
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MyResponse<Object> uploadBlog(
            @RequestPart("blog") String blogJson,
            @RequestPart("user") String userJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {

            System.out.println("I'n in the blog Controller");
            // Convert JSON strings to Java objects
            ObjectMapper mapper = new ObjectMapper();
            Blog blog = mapper.readValue(blogJson, Blog.class);
            User user = mapper.readValue(userJson, User.class);
            // Upload to cloud if image is present
            if (image != null && !image.isEmpty()) {
                String imageUrl = cloudinaryService.uploadToCloudinary(image);
                blog.setBlogImage(imageUrl);
            }

            Blog savedBlog = service.postBlog(user, blog);
            if (savedBlog == null) {
                return new MyResponse<>("Unable to upload blog", "no error", "Please Try again", false);
            }
            return new MyResponse<>(new BlogDTO(savedBlog), "no error", "uploaded blog", true);
        } catch (Exception e) {
            return new MyResponse<>("some error occurred", e.getMessage(), "no message", false);
        }
    }


    @GetMapping("/")
    public MyResponse<Object> getAllBlogs(){
        System.out.println("Reaced the getAll controller");
        try{
            return service.fetchAllBlogs();
        }catch(Exception e){
            return new MyResponse<>(
                    "some error occured",
                    e.getMessage(),
                    "no message",
                    false
            );
        }
    }
    @PostMapping("/comment")
    public MyResponse<Object> addCommentToBlog(@RequestBody Comment req){
//        System.out.println(req);
        System.out.println("Here at comment adding controller");
        try{
            Object response = service.addComment(req);
            return new MyResponse<>(
                    response,
                    "no error",
                    "success",
                    true
            );
        }catch(Exception e){
            return new MyResponse<>(
                    "some error occured",
                    e.getMessage(),
                    "no message",
                    false
            );
        }

    }
}
