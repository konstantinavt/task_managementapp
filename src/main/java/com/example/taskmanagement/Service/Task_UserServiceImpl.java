package com.example.taskmanagement.Service;

import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.Task_User;
import com.example.taskmanagement.Entity.User;
import com.example.taskmanagement.Repository.TaskUserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class Task_UserServiceImpl implements Task_UserService{

    private final TaskUserRepository taskUserRepository;


    public Task_UserServiceImpl(TaskUserRepository taskUserRepository) {
        this.taskUserRepository = taskUserRepository;
    }


    @Override
    public List<Task_User> getAllTaskUsers(){
        return taskUserRepository.findAll();
    }


    @Override
    public Task_User assignTaskToUser(Task task, User user) {
        Task_User taskUser = new Task_User();
        taskUser.setTask(task);
        taskUser.setUser(user);
        return taskUserRepository.save(taskUser);
    }

    @Override
    public boolean removeTaskFromUser(Long id){
        Optional<Task_User> existingTaskUserOptional = taskUserRepository.findById(id);
        if (existingTaskUserOptional.isPresent()) {
            taskUserRepository.deleteById(id);
            return true; // Deletion successful
        }
        return false;

    }

    @Override
    public Task_User findById(Long id){

            return taskUserRepository.findById(id).orElse(null);
    }

    @Override
    public List<Task_User> getTaskUsersForUser(User user) {
        return taskUserRepository.findAllByUser(user);
    }

    @Override
    public List<Task_User> getTaskUsersForTask(Task task) {
        return taskUserRepository.findAllByTask(task);
    }
}
