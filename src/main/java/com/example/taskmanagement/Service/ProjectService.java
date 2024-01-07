package com.example.taskmanagement.Service;

import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.Task;

import java.util.List;
import java.util.Set;

public interface ProjectService {
    Project createProject(Project project);
    Project updateProject(Long id, Project project);
    boolean deleteProjectById(Long id);
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project getProjectByName(String name);

    Set<Task> getTasksByProject(Long projectId);

}
