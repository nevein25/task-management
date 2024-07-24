package com.ll.server.DTOs;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpDto {

    @Schema(example = "user1")
    @NotBlank
    private String username;

    @Schema(example = "user1")
    @NotBlank
    private String password;

    @Schema(example = "User1")
    @NotBlank
    private String name;

}
