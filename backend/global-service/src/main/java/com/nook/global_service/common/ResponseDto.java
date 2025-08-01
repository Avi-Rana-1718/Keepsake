package com.nook.global_service.common;

import org.springframework.http.HttpStatus;

public record ResponseDto(HttpStatus statusCode, String message, String data) {
    
}
