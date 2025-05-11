package com.eshwar.WordWave.controllers;
import com.eshwar.WordWave.dtos.BlogDTO;
import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.services.BlogService;
import com.eshwar.WordWave.utils.BlogAndCommentRequest;
import com.eshwar.WordWave.utils.BlogUploadRequest;
import com.eshwar.WordWave.utils.MyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blog")
public class BlogController {
    @Autowired
    BlogService service;
    //crud
    @PostMapping("/upload")
    public MyResponse<Object> uploadBlog(@RequestBody BlogUploadRequest blogReq){
        System.out.println(blogReq);
        try{
            Blog blog = service.postBlog(blogReq.getUser(),blogReq.getBlog());
            if(blog==null)
                return new MyResponse<>(
                        "Unable  to upload blog ",
                        "no error",
                        "Please Try again",
                        false
                );
            return new MyResponse<>(
                    new BlogDTO(blog),
                    "no error",
                    "uploaded blog",
                    false
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
    public MyResponse<Object> addCommentToBlog(@RequestBody BlogAndCommentRequest req){
        System.out.println(req);
        System.out.println("Here at comment adding controller");
        try{
            Object response = service.addComment(req.getUser(),req.getBlog(),req.getComment());
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
