package com.ll.server.auth;


import com.ll.server.entities.User;
import com.ll.server.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

   private final IUserService IUserService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = IUserService.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
        return mapUserToCustomUserDetails(user);

    }


private CustomUserDetails mapUserToCustomUserDetails(User user) {

    CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(user.getId());
        customUserDetails.setUsername(user.getUsername());
        customUserDetails.setPassword(user.getPassword());
        customUserDetails.setName(user.getName());
        customUserDetails.setEmail(user.getEmail());

    customUserDetails.setAuthorities(Collections.emptyList());
        return customUserDetails;
    }
}
