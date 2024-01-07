package com.example.taskmanagement.Controller;

import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.Task_User;
import com.example.taskmanagement.Entity.User;
import com.example.taskmanagement.Service.TaskService;
import com.example.taskmanagement.Service.Task_UserService;
import com.example.taskmanagement.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task-users")
public class TaskUserController {

    private final Task_UserService taskUserService;
    private final TaskService taskService;
    private final UserService userService;

    public TaskUserController(Task_UserService taskUserService, TaskService taskService, UserService userService) {

        this.taskUserService = taskUserService;
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Task_User>> getAllTaskUsers() {
        List<Task_User> taskUsers = taskUserService.getAllTaskUsers();
        return ResponseEntity.ok(taskUsers);
    }

    @PostMapping("/assign")
    public ResponseEntity<Task_User> assignTaskToUser(@RequestBody Map<String, Long> requestBody) {
        Long task_id = requestBody.get("task_id");
        Long user_id = requestBody.get("user_id");

        Task task = taskService.getTaskById(task_id);
        User user = userService.getUserById(user_id);

        if (task != null && user != null) {
            Task_User taskUser = taskUserService.assignTaskToUser(task, user);
            return ResponseEntity.status(HttpStatus.CREATED).body(taskUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{taskUserId}")
    public ResponseEntity<Void> removeTaskFromUser(@PathVariable Long taskUserId) {
        boolean removed = taskUserService.removeTaskFromUser(taskUserId);
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity<List<Task_User>> getTaskUsersForUser(@PathVariable Long user_id) {
        User user = userService.getUserById(user_id);
        if (user != null) {
            List<Task_User> taskUsers = taskUserService.getTaskUsersForUser(user);
            return ResponseEntity.ok(taskUsers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/tasks/{task_id}")
    public ResponseEntity<List<Task_User>> getTaskUsersForTask(@PathVariable Long task_id) {
        Task task = taskService.getTaskById(task_id);
        if (task != null) {
            List<Task_User> taskUsers = taskUserService.getTaskUsersForTask(task);
            return ResponseEntity.ok(taskUsers);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
