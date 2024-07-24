package com.ll.server.mapping;


import com.ll.server.DTOs.UserDto;
import com.ll.server.entities.User;

public interface IUserMapper {

    UserDto toUserDto(User user);
}