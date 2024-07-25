package com.ll.server.service;

import com.ll.server.entities.Task;
import com.ll.server.entities.User;

import java.util.List;


public interface ITaskService {

    List<Task> getTasks();

    List<Task> getTasksContainingText(String text);

    Task validateAndGetTask(String id);

    Task saveTask(Task task);

    void deleteTask(Task task);
    Task getTaskById(String id);
    boolean isTaskOwnedByUser(Task task, User user);
    List<Task> getTasksForUser(String username);
}
