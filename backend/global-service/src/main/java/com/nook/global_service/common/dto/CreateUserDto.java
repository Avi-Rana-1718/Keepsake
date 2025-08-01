package com.nook.global_service.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserDto(
    @NotBlank(message = "Username can't be empty.")
    String username,
    
    @Email(message = "Invalid email.")
    String email, 
    
    @Size(min = 6, message = "Password must be longer than six characters.")
    String password) {
    
}
