package com.ll.server.repositories;

import com.ll.server.entities.Task;
import java.util.List;

import com.ll.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByUserOrderByCreatedAtDesc(User user);
}