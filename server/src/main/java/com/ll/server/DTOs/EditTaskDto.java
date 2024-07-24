package com.ll.server.DTOs;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditTaskDto {

    @Schema(example = "My task description")
    @NotBlank
    private String description;

    @Schema(example = "1")

    @NotBlank
    private String id;
}
