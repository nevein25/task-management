package com.ll.server.DTOs;

import java.time.ZonedDateTime;
import java.util.List;

public record UserDto(Long id, String username, String name,List<TaskDto> tasks) {

    public record TaskDto(String id, String description, ZonedDateTime createdAt) {
    }
}