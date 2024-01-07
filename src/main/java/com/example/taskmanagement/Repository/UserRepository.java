package com.example.taskmanagement.Repository;

import com.example.taskmanagement.Entity.Task;
import com.example.taskmanagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);
    User findByUsername(String username);

    void deleteUserById(Long id);



    User save(String username);
}
