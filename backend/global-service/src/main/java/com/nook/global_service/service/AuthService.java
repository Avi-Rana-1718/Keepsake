package com.nook.global_service.service;

import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nook.global_service.common.ResponseDto;
import com.nook.global_service.common.dto.AuthUserDto;
import com.nook.global_service.common.dto.CreateUserDto;
import com.nook.global_service.common.exception.CommonException;
import com.nook.global_service.entity.UserEntity;
import com.nook.global_service.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;

    AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseDto createUser(CreateUserDto request) {
        UserEntity userEntity = UserEntity.builder().email(request.email()).password(request.password()).username(request.username()).build();
        
        if(Objects.nonNull(userRepository.existsWithEmail(request.email()))) {
            throw new CommonException(HttpStatus.BAD_REQUEST, "Email already exists: " + request.email());
        }
        
        userRepository.save(userEntity);

        return new ResponseDto(HttpStatus.CREATED, "User created successfully", null);
    }

    public ResponseDto authUser(AuthUserDto request) {
        UserEntity userEntity = userRepository.authenticateUser(request.email(), request.password());

        if(Objects.isNull(userEntity)) {
            throw new CommonException(HttpStatus.UNAUTHORIZED, "Invalid email & password combination.");
        }

        return new ResponseDto(HttpStatus.OK, "User logged in: " + request.email(), null);
    }
}
