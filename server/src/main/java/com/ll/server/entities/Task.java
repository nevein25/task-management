package com.ll.server.entities;

import com.ll.server.common.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    private String id;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private ZonedDateTime createdAt;

    private String title;


    @Enumerated(EnumType.STRING)
    private Status status;


    private LocalDate dueDate;

    public Task(String description, String title, Status status, LocalDate dueDate ) {
        this.description = description;
        this.title = title;
        this.status = status;
        this.dueDate = dueDate;
    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
}
