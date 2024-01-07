package com.example.taskmanagement.Service;


import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project updateProject(Long id,Project updatedProject) {

        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project projectToUpdate = existingProject.get();
            projectToUpdate.setName(updatedProject.getName());
            projectToUpdate.setDescription(updatedProject.getDescription());
            // You can update other properties as needed

            return projectRepository.save(projectToUpdate);
        } else {
            return null;
        }
    }

    @Override
    public Project createProject(Project project) {

        return projectRepository.save(project);
    }

    @Override
    public boolean deleteProjectById(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @Override
    public Project getProjectByName(String name) {
        return projectRepository.findByName(name);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Set<Task> getTasksByProject(Long projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        return projectOptional.map(Project::getTasks).orElse(Collections.emptySet());
    }
}


