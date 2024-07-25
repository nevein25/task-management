package com.ll.server.DTOs;


import com.ll.server.common.Status;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTaskDto {

    @Schema(example = "My task description")
    @NotBlank
    private String description;

    @Schema(example = "My task title")
    @NotBlank
    private String title;

    @Schema(example = "2024-07-30")
    @NotNull
    private LocalDate dueDate;

    @Schema(example = "TODO")
    @NotNull
    private Status status;
}
