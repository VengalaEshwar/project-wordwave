package com.eshwar.WordWave.controllers;


import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.services.UserService;
import com.eshwar.WordWave.utils.MyResponse;
import com.eshwar.WordWave.utils.MyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<MyResponse<Object>> register(@RequestBody User user) {
        try {
            System.out.println(user);
            MyResponse<Object> response = service.register(user);
            if(!response.isStatus())
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(response,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( new MyResponse("error occured",e.getMessage(),null,false), HttpStatus.FAILED_DEPENDENCY);
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
