package com.nook.global_service.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.nook.global_service.common.exception.CommonException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.BAD_REQUEST, e.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CommonException.class)
    public ResponseEntity<ErrorDto> handleCommonException(CommonException e) {
        ErrorDto errorDto = new ErrorDto(e.getStatusCode(), e.getMessage());
        return new ResponseEntity<>(errorDto, e.getStatusCode());
    }
}
