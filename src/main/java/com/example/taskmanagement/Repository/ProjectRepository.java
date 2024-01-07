package com.example.taskmanagement.Repository;

import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Project findByName(String name);

}
