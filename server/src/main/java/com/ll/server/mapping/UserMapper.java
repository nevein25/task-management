package com.ll.server.mapping;


import com.ll.server.DTOs.UserDto;
import com.ll.server.entities.Task;
import com.ll.server.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapper implements IUserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) return null;

        List<UserDto.TaskDto> tasks = user.getTasks().stream().map(this::toUserDtoTaskDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getName(),user.getEmail(), tasks);

    }

    private UserDto.TaskDto toUserDtoTaskDto(Task task) {
        if (task == null) return null;

        return new UserDto.TaskDto(task.getId(), task.getDescription(), task.getCreatedAt());
    }
}
