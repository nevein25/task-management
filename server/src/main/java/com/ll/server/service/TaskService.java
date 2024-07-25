package com.ll.server.service;


import com.ll.server.exceptions.TaskNotFoundException;
import com.ll.server.entities.Task;
import com.ll.server.entities.User;
import com.ll.server.repositories.TaskRepository;
import com.ll.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;


    public Task getTaskById(String id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(String.format("Task with id %s not found", id)));
    }

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Task> getTasksContainingText(String text) {
        return taskRepository.findByIdContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByCreatedAtDesc(text, text);
    }

    @Override
    public Task validateAndGetTask(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(String.format("Task with id %s not found", id)));
    }

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }


    public boolean isTaskOwnedByUser(Task task, User user) {
        return task.getUser().equals(user);
    }
    public List<Task> getTasksForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return taskRepository.findByUserOrderByCreatedAtDesc(user);
    }
}
