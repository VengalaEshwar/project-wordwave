package com.eshwar.WordWave.utils;

import com.eshwar.WordWave.dtos.UserDTO;
import com.eshwar.WordWave.dtos.UserProfileDTO;
import com.eshwar.WordWave.models.User;
import lombok.Data;

@Data
public class LoginResponse {
    String token;
    UserProfileDTO user;
    public LoginResponse(User user,String token){
        this.user=new UserProfileDTO(user);
        this.token=token;
    }
}
