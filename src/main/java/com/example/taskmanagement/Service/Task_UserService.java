package com.example.taskmanagement.Service;

import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.Task_User;
import com.example.taskmanagement.Entity.User;

import java.util.List;

public interface Task_UserService {

    List<Task_User> getAllTaskUsers();
    Task_User assignTaskToUser(Task task, User user);

    boolean removeTaskFromUser(Long id);
    Task_User findById(Long id);

    List<Task_User> getTaskUsersForUser(User user);
    List<Task_User> getTaskUsersForTask(Task task);
}
