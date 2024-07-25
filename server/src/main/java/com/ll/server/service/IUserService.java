package com.ll.server.service;


import com.ll.server.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> getUsers();

    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);
    boolean hasUserWithEmail(String email);


    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

}
