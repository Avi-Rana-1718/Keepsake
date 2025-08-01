package com.nook.global_service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nook.global_service.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    @Query("SELECT u FROM UserEntity u where u.email = :email")
    UserEntity existsWithEmail(String email);

    @Query("SELECT u FROM UserEntity u where u.email = :email and u.password = :password")
    UserEntity authenticateUser(String email, String password);
}
