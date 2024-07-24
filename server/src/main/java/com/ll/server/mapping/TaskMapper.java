package com.ll.server.mapping;


import com.ll.server.DTOs.CreateTaskDto;
import com.ll.server.DTOs.TaskDto;
import com.ll.server.entities.Task;
import org.springframework.stereotype.Service;

@Service
public class TaskMapper implements ITaskMapper {

    @Override
    public Task toTask(CreateTaskDto createTaskRequest) {
        if (createTaskRequest == null) {
            return null;
        }
        return new Task(createTaskRequest.getDescription());
    }

    @Override
    public TaskDto toTaskDto(Task task) {
        if (task == null) {
            return null;
        }
        TaskDto.UserDto userDto = new TaskDto.UserDto(task.getUser().getUsername());
        return new TaskDto(task.getId(), task.getDescription(), userDto, task.getCreatedAt());
    }
}
