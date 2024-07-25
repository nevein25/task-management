package com.ll.server.DTOs;


import com.ll.server.common.Status;

import java.time.LocalDate;
import java.time.ZonedDateTime;

public record TaskDto(String id, String description, TaskDto.UserDto user, ZonedDateTime createdAt, String title, Status status, LocalDate dueDate) {

    public record UserDto(String username) {
    }
}