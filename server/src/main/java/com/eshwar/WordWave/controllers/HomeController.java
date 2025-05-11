package com.eshwar.WordWave.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @RequestMapping("/")
    public String greet(){
        return "Hello!,Welcome to WordWave:A place to explore your thoughts...";
    }
    @RequestMapping("/about")
    public String about(){
        return "This is About us page";
    }
    @GetMapping("/contact")
    public String contact(){
        return "This is contacts page";
    }
}
