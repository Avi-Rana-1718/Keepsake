package com.nook.global_service.common;

import org.springframework.http.HttpStatus;


public record ErrorDto(HttpStatus statusCode, String message) {
    
}
