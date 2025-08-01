package com.nook.global_service.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record AuthUserDto(
    @Email(message = "Invalid email.")    
    String email, 
    
    @NotNull(message = "Password can't be null.")
    String password) {
    
}
