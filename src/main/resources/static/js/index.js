const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});


const toggleSubButtons = (buttonId, subButtonsClass) => {
    const mainButton = document.getElementById(buttonId);
    const subButtons = document.querySelector(`.${subButtonsClass}`);

    mainButton.addEventListener('click', () => {
        subButtons.classList.toggle('hidden');
    });
};


toggleSubButtons('viewBtn', 'subButtons');
//toggleSubButtons('viewUserTasksBtn', 'userTasksSubButtons');
//toggleSubButtons('assignTaskForm', 'assignTaskSubButtons');
//toggleSubButtons('findBtn', 'subButtons');
//toggleSubButtons('updateBtn', 'subButtons');
//toggleSubButtons('deleteBtn', 'subButtons');

document.addEventListener('DOMContentLoaded', function() {
    const createUserButton = document.getElementById('createUserBtn');
    const userCreationForm = document.querySelector('.userCreationForm');

    createUserBtn.addEventListener('click', function() {

        userCreationForm.classList.remove('hidden');
    });

    const submitUserButton = document.getElementById('submitUserBtn');
    const userForm = document.getElementById('userForm');

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();


        createUser();
    });
    let errorMessage='';
    function createUser() {


        const username = document.getElementById('usernameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;


        const newUser = {
            username: username,
            email: email,
            password: password
        };


        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => {

            if (!response.ok) {
                 throw new Error('Error creating user');
            }
            return response.json();
        })
        .then(data => {

            console.log('User created:', data);
            const userCreationForm = document.querySelector('.userCreationForm');
            userCreationForm.classList.add('hidden');

        })
        .catch(error => {

                 console.error('Error creating user:', errorMessage || 'Unknown error occurred');
                 errorMessage = error.message;

        });
    }

    const createTaskButton = document.getElementById('createTaskBtn');
        const taskCreationForm = document.querySelector('.taskCreationForm');

        createTaskButton.addEventListener('click', function() {
            taskCreationForm.classList.remove('hidden');

            const submitTaskButton = document.getElementById('submitTaskBtn');
            const taskForm = document.getElementById('taskForm');

            submitTaskButton.addEventListener('click', function(event) {
                event.preventDefault();
                createTask();
            });
        });

        function createTask() {
            const taskTitle = document.getElementById('taskTitleInput').value;
            const taskDescription = document.getElementById('taskDescriptionInput').value;
            const taskStatus = document.getElementById('taskStatusInput').value;
            const taskDueDate = document.getElementById('taskDueDateInput').value;
            const taskProjectId = document.getElementById('taskProjectIdInput').value;

            const newTask = {
                title: taskTitle,
                description: taskDescription,
                status: taskStatus,
                dueDate: taskDueDate,
                project: {
                            id: taskProjectId
                        }
            };

            fetch('http://localhost:8080/api/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Task created:', data);

            })
            .catch(error => {
                console.error('Error creating task:', error.message);

            });
        }


        const createProjectButton = document.getElementById('createProjectBtn');
        const projectCreationForm = document.querySelector('.projectCreationForm');

        createProjectButton.addEventListener('click', function() {
            projectCreationForm.classList.remove('hidden');

            const submitProjectButton = document.getElementById('submitProjectBtn');
            const projectForm = document.getElementById('projectForm');

            submitProjectButton.addEventListener('click', function(event) {
                event.preventDefault();
                createProject();
            });
        });

        function createProject() {
            const projectName = document.getElementById('projectNameInput').value;
            const projectDescription = document.getElementById('projectDescriptionInput').value;

            const newProject = {
                name: projectName,
                description: projectDescription
            };


            fetch('http://localhost:8080/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Project created:', data);

            })
            .catch(error => {
                console.error('Error creating project:', error.message);

            });
        }
        ///////////////////////////
        ///////////////////////////
        document.addEventListener('DOMContentLoaded', function() {
            const user_id = localStorage.getItem('user_id'); // Retrieve userId from storage if needed

            if (user_id) {
                console.log('Retrieved user_id:', user_id);

                const viewUserTasksButton = document.getElementById('viewUserTasksBtn');
                const userTasksSection = document.getElementById('userTasksSection');

                userTasksSection.classList.add('hidden');
                //
                assignTaskForm.classList.add('hidden');
                //console.log('viewUserTasksButton:', viewUserTasksButton);
                //console.log('userTasksSection:', userTasksSection);

                viewUserTasksButton.addEventListener('click', function() {
                    console.log('View tasks button clicked');
                    userTasksSection.classList.toggle('hidden');

                    if (!userTasksSection.classList.contains('hidden') && user_id) {
                        console.log('Fetching tasks for user:', user_id);
                        fetchUserTasks(user_id, userTasksSection) ;
                    }
                });

            }

        });

        //////////////////////////
        function displayUserTasks(tasks, userTasksSection) {

              const userTasksList = document.getElementById('userTasksList');


               userTasksList.innerHTML = '';


                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = `Task ID: ${task.id}`;
                     userTasksList.appendChild(taskItem);
                 });
                 userTasksSection.classList.remove('hidden');
         }
        ///////////////////////////
        function fetchUserTasks(user_id,userTasksSection) {
             fetch(`http://localhost:8080/api/task-users/users/${user_id}`)
                  .then(response => {
                    if (response.ok) {
                            return response.json();
                     }
                      throw new Error('Network response was not ok.');
                     })
                     .then(userTasks => {
                         console.log('User tasks:', userTasks);


                        displayUserTasks(userTasks,userTasksSection);
                      })
                    catch(error => {
                         console.error('Error fetching user tasks:', error.message);

                    });
         }
        ////////////////////////////

         const loginForm = document.getElementById('loginForm');

         loginForm.addEventListener('submit', function(event) {
         event.preventDefault();

          const userEmail = document.getElementById('userEmailInput').value;
           const userPassword = document.getElementById('userPasswordInput').value;

            const userCredentials = {
               email: userEmail,
               password: userPassword
            };

            loginUser(userCredentials);
            });
            ////////////////////

            function loginUser(credentials) {
                    fetch('http://localhost:8080/api/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Network response was not ok.');
                    })
                    .then(data => {
                        console.log('User logged in:', data);
                        const userId = data.id;
                        localStorage.setItem('user_id', userId);

                        const viewUserTasksButton = document.getElementById('viewUserTasksBtn');
                        const userTasksSection = document.getElementById('userTasksSection');
                        const assignTaskForm = document.getElementById('assignTaskForm');

                        viewUserTasksButton.classList.remove('hidden');
                        logoutButton.classList.remove('hidden');
                        userTasksSection.classList.remove('hidden');
                        assignTaskForm.classList.remove('hidden');

                        fetchUserTasks(userId, userTasksSection);

                    })
                    .catch(error => {
                        console.error('Error logging in:', error.message);

                    });
                }
                /////////////////////////
                const assignTaskForm = document.getElementById('assignTaskForm');
                assignTaskForm.classList.add('hidden');

                assignTaskForm.addEventListener('submit', function(event) {

                    event.preventDefault();

                    const assignedUserId = document.getElementById('assignedUserIdInput').value;
                    const assignedTaskId = document.getElementById('assignedTaskIdInput').value;


                    const taskDetails = {

                        user_id: parseInt(assignedUserId),
                        task_id: parseInt(assignedTaskId)

                    };

                    assignTask(taskDetails);
              });
              ///////////////////////////////////
              function assignTask(taskDetails) {
                  const user_id = localStorage.getItem('user_id');
                  fetch(`http://localhost:8080/api/task-users/assign`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(taskDetails),
                  })
                  .then(response => {
                      if (response.ok) {
                          return response.json();
                      }
                      throw new Error('Network response was not ok.');
                  })
                  .then(data => {
                      console.log('Task assigned:', data);

                  })
                  .catch(error => {
                      console.error('Error assigning task:', error.message);

                  });
              }
              ////////////////////
              const logoutButton = document.getElementById('logoutBtn');
              logoutButton.addEventListener('click', function() {

                  logoutUser();
              });

              function logoutUser() {

                  localStorage.removeItem('user_id');
                  window.location.href = 'index.html';
              }


   });
