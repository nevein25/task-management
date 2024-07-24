package com.ll.server.mapping;


import com.ll.server.DTOs.CreateTaskDto;
import com.ll.server.DTOs.TaskDto;
import com.ll.server.entities.Task;

public interface ITaskMapper {

    Task toTask(CreateTaskDto createTaskRequest);

    TaskDto toTaskDto(Task task);
}