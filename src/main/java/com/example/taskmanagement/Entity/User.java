package com.example.taskmanagement.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotEmpty(message = "username cannot be empty")
    @Column(name = "username", unique = true)
    private String username;

    @NotEmpty(message =  "email can't be empty")
    @Size(min=7, max=50)
    @Column(name = "email", unique = true)
    private String email;

    @NotEmpty(message = "password cannot be empty")
    @Size(min=8, max=50)
    @Column(name="password")
    private String password;

    public User(){}

    public User(Long id, String username, String email, String password){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\''+
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
