package com.example.taskmanagement.Service;

import com.example.taskmanagement.Entity.Project;
import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.User;
import com.example.taskmanagement.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task) {

        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {

        Optional<Task> existingTaskOptional = taskRepository.findById(id);
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();

            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setDueDate(updatedTask.getDueDate());
            existingTask.setStatus(updatedTask.getStatus());


            return taskRepository.save(existingTask);
        }
        return null;


    }

    @Override
    public boolean deleteTaskById(Long id) {
        Optional<Task> existingTaskOptional = taskRepository.findById(id);
        if (existingTaskOptional.isPresent()) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;

    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> getTasksByStatus(String status) {

        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> getTasksByTitle(String title) {

        return taskRepository.findByTitle(title);
    }

   /* @Override
    public List<Task> getTasksByAssignee(User assignee) {

        return taskRepository.findByAssignee(assignee);
    }
*/
    @Override
    public List<Task> getTasksByProject(Project project) {

        return taskRepository.findByProject(project);
    }

}
