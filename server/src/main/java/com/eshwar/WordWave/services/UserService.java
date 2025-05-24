package com.eshwar.WordWave.services;

import com.eshwar.WordWave.dtos.BlogDTO;
import com.eshwar.WordWave.dtos.UserDTO;
import com.eshwar.WordWave.dtos.UserProfileDTO;
import com.eshwar.WordWave.models.Blog;
import com.eshwar.WordWave.models.User;
import com.eshwar.WordWave.repos.UserRepo;
import com.eshwar.WordWave.utils.LoginResponse;
import com.eshwar.WordWave.utils.MyResponse;
import com.eshwar.WordWave.utils.MyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    JwtService jwt;
    @Autowired
    UserRepo repo;

    public MyResponse<Object> register(User user) throws Exception {

        User ixExist = repo.findByUsername(user.getUsername());
        if (ixExist != null) {
            return new MyResponse(
                    "User already Exist",
                    "No error",
                    "no message",
                    false
            );
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return new MyResponse(
                "User registered",
                "No error",
                user.getUsername(),
                true
        );
    }

    public MyResponse verify(User user) {
        if (user == null || user.getUsername() == null || user.getPassword() == null) {
            return new MyResponse(
                    "User not found",
                    "Missing username or password",
                    "no message",
                    false
            );
        }

        try {
            Authentication authToken = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (!authToken.isAuthenticated()) {
                return new MyResponse(
                        "User not found",
                        "No error",
                        "no message",
                        false
                );
            }
            User returnUser = repo.findByUsername(user.getUsername());
            String jwtToken = jwt.generateToken(user.getUsername());
            return new MyResponse<LoginResponse>(
                    new LoginResponse(returnUser,jwtToken),
                    "No error",
                    "user login success",
                    true
            );

        } catch (Exception e) {
            return new MyResponse(
                    "User not found",
                    e.getMessage(),
                    "no message",
                    false
            );
        }
    }
    public UserDTO convertToDTO(User user) {
        return new UserDTO(user);
    }

    public MyResponse<UserProfileDTO> getUserProfileDTO(String username) {
        User user = repo.findByUsername(username);
        if(user==null){
            return new MyResponse(
                    "No user found",
                    "No error",
                    "no message",
                    false
            );
        }
        return new MyResponse<UserProfileDTO>(
                new UserProfileDTO(user),
                "No error",
                "user data success",
                true
        );
    }
}

