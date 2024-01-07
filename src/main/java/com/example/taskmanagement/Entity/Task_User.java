package com.example.taskmanagement.Entity;



import javax.persistence.*;

@Entity
@Table(name = "task_user")
public class Task_User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Task_User() {}

    public Task_User(Task task, User user) {
        this.task = task;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Task_User{" +
                "id=" + id +
                ", task=" + task.getId() +
                ", user=" + user.getId() +
                '}';
    }

}
