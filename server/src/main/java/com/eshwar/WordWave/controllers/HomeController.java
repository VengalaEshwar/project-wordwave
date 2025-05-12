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
    @GetMapping("/test")
    public Object test(){
        return new Object(){
            String name = "Eshwar";
            String College = "GRIET";

            @Override
            public String toString() {
                return "anonymous Object{" +
                        "name='" + name + '\'' +
                        ", College='" + College + '\'' +
                        '}';
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getCollege() {
                return College;
            }

            public void setCollege(String college) {
                College = college;
            }
        };
    }
}
