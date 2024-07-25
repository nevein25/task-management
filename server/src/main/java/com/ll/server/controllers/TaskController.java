package com.ll.server.controllers;


import com.ll.server.DTOs.CreateTaskDto;
import com.ll.server.DTOs.TaskDto;
import com.ll.server.exceptions.UserNotAuthorizedException;
import com.ll.server.auth.CustomUserDetails;
import com.ll.server.entities.Task;
import com.ll.server.entities.User;
import com.ll.server.mapping.TaskMapper;
import com.ll.server.service.IUserService;
import com.ll.server.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ll.server.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final IUserService userService;
    private final TaskService taskService;
    private final TaskMapper taskMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public List<TaskDto> getTasks(@RequestParam(value = "text", required = false) String text) {
        List<Task> tasks = (text == null) ? taskService.getTasks() : taskService.getTasksContainingText(text);
        return tasks.stream()
                .map(taskMapper::toTaskDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public TaskDto createTask(@AuthenticationPrincipal CustomUserDetails currentUser,
                              @Valid @RequestBody CreateTaskDto createTaskRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Task task = taskMapper.toTask(createTaskRequest);
        task.setId(UUID.randomUUID().toString());
        task.setUser(user);
        return taskMapper.toTaskDto(taskService.saveTask(task));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public TaskDto deleteTasks(@PathVariable UUID id) {
        Task task = taskService.validateAndGetTask(id.toString());
        taskService.deleteTask(task);
        return taskMapper.toTaskDto(task);
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{id}")
    public TaskDto updateTask(@PathVariable String id,
                              @Valid @RequestBody CreateTaskDto updateTaskRequest, @AuthenticationPrincipal CustomUserDetails currentUser) {
        Task existingTask = taskService.getTaskById(id);
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());

        if (!taskService.isTaskOwnedByUser(existingTask, user)) {
            throw new UserNotAuthorizedException("Unauthorized to delete this task");
        }

        existingTask.setDescription(updateTaskRequest.getDescription());
        existingTask.setTitle(updateTaskRequest.getTitle());
        existingTask.setStatus(updateTaskRequest.getStatus());
        existingTask.setDueDate(updateTaskRequest.getDueDate());

        Task updatedTask = taskService.saveTask(existingTask);
        return taskMapper.toTaskDto(updatedTask);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})

    @GetMapping("/my-tasks")
    public List<TaskDto> getMyTasks(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        List<Task> tasks = taskService.getTasksForUser(user.getUsername());
        return tasks.stream()
                .map(taskMapper::toTaskDto)
                .collect(Collectors.toList());
    }
}
