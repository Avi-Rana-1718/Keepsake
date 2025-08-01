package com.nook.global_service.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nook.global_service.common.ResponseDto;
import com.nook.global_service.common.dto.AuthUserDto;
import com.nook.global_service.common.dto.CreateUserDto;
import com.nook.global_service.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpHeaders;


@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<ResponseDto> authenticate(@Valid @RequestBody AuthUserDto request) {
        return new ResponseEntity<>(authService.authUser(request), HttpStatus.OK);
    }
    
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createUser(@Valid @RequestBody CreateUserDto request) {
        return new ResponseEntity<>(authService.createUser(request), HttpStatus.CREATED);
    }
    
}
