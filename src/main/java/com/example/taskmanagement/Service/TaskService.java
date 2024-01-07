package com.example.taskmanagement.Service;
import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.User;
import com.example.taskmanagement.Entity.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Task task);
    Task updateTask(Long taskId, Task updatedTask);
    boolean deleteTaskById(Long id);
    Task getTaskById(Long id);
    List<Task> getTasksByTitle(String title);
    List<Task> getAllTasks();
    List<Task> getTasksByStatus(String status);
    //List<Task> getTasksByAssignee(Long id);
    List<Task> getTasksByProject(Project project);
}

