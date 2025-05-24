package com.eshwar.WordWave.controllers;


import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.services.CloudinaryService;
import com.eshwar.WordWave.services.UserService;
import com.eshwar.WordWave.utils.MyResponse;
import com.eshwar.WordWave.utils.MyResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AuthController {
    @Autowired
    private UserService service;
    @Autowired
    CloudinaryService cloudinaryService;
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MyResponse<Object>> register(
            @RequestPart("user") String userJson,
            @RequestPart("image") MultipartFile image) {
        try {
            // 1. Convert JSON string to User object
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(userJson, User.class);
            System.out.println(user+"\n"+image);

            // 2. Upload image to Cloudinary
            String imageUrl = cloudinaryService.uploadToCloudinary(image);
            user.setProfileImage(imageUrl); // Add `imageUrl` field to your User model

            // 3. Continue with registration
            MyResponse<Object> response = service.register(user);
            if (!response.isStatus())
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                    new MyResponse<>("Error occurred", e.getMessage(), null, false),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    @PostMapping("/login")
    public ResponseEntity<MyResponse<Object>> login(@RequestBody User user) {
        try {
            System.out.println(user);
            MyResponse<Object> response = service.verify(user);
            if(!response.isStatus())
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(response,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( new MyResponse("error occured",e.getMessage(),null,false), HttpStatus.FAILED_DEPENDENCY);
        }
    }
}
