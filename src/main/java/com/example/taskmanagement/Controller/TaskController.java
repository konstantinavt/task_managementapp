package com.example.taskmanagement.Controller;

import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Service.ProjectService;
import com.example.taskmanagement.Service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;

    public TaskController(TaskService taskService, ProjectService projectService) {

        this.taskService = taskService;
        this.projectService = projectService;
    }



    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
        Task createdTask = taskService.createTask(newTask);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTaskWithProject(@RequestBody Task newTask) {
        Project project = newTask.getProject();

        // Check if project is null or if project ID is null
        if (project == null || project.getId() == null) {
            return ResponseEntity.badRequest().body("Invalid project ID");
        }

        Long projectId = project.getId();

        // Assuming Project has an ID field and exists in the database
        Project retrievedProject = projectService.getProjectById(projectId);

        if (retrievedProject == null) {
            return ResponseEntity.notFound().build();
        }

        newTask.setProject(retrievedProject); // Set the project for the new task

        Task createdTask = taskService.createTask(newTask);

        if (createdTask != null) {
            return ResponseEntity.ok(createdTask);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Task task = taskService.updateTask(id, updatedTask);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTaskById(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable String status) {
        List<Task> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<List<Task>> getTasksByTitle(@PathVariable String title) {
        List<Task> tasks = taskService.getTasksByTitle(title);
        return ResponseEntity.ok(tasks);
    }

    /*@GetMapping("/assignee/{id}")
    public ResponseEntity<List<Task>> getTasksByAssignee(@PathVariable Long id) {
        List<Task> tasks = taskService.getTasksByAssignee(id);
        return ResponseEntity.ok(tasks);
    }*/

    @GetMapping("/project/{id}")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Project id) {
        List<Task> tasks = taskService.getTasksByProject(id);
        return ResponseEntity.ok(tasks);
    }


}
