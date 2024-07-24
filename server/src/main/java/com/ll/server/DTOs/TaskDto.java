package com.ll.server.DTOs;


import java.time.ZonedDateTime;

public record TaskDto(String id, String description, TaskDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}