package com.example.taskmanagement.Repository;
import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.User;
import com.example.taskmanagement.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitle(String title);

    Task save(Task task);
    List<Task> findByStatus(String status);
    // List<Task> findByAssignee(User assignee);
     List<Task> findByProject(Project project);


}
