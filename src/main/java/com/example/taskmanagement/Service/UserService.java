package com.example.taskmanagement.Service;

import com.example.taskmanagement.Entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    User logIn(String email, String password);
    User getUserByUsername(String username);

    User getUserById(Long id);
    User saveUser(User user);
    User updateUser(Long userId, User updatedUser);
    void deleteUser(User user);


    User createUser(User user);
    boolean deleteUserById(Long id);
}
