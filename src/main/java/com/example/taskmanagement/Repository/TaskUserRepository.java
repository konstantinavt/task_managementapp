package com.example.taskmanagement.Repository;

import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.Task_User;
import com.example.taskmanagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskUserRepository extends JpaRepository<Task_User, Long> {


    List<Task_User> findAllByUser(User user);
    List<Task_User> findAllByTask(Task task);

}
