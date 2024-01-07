document.addEventListener('DOMContentLoaded', function() {
    const taskTable = document.getElementById('taskTable');
    const findBtn = document.getElementById('findBtn');
    const subButtons = document.querySelector('.subButtons');

    const updateTaskForm = document.getElementById('updateTaskForm');

    updateTaskForm.classList.add('hidden');

    findBtn.addEventListener('click', function() {
            subButtons.classList.toggle('hidden');
        });

        const findByTaskIdBtn = document.getElementById('findByTaskIdBtn');
        const findByTitleBtn = document.getElementById('findByTitleBtn');

        findByTaskIdBtn.addEventListener('click', function() {
            fetchTasksByID();
        });

        findByTitleBtn.addEventListener('click', function() {
            fetchTasksByTitle();
        });

        function fetchTasksByID() {
            const taskId = prompt('Enter Task ID:');
            if (!taskId) return;

            fetch(`http://localhost:8080/api/tasks/${taskId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        displayTasks(data);
                    } else if (data && typeof data === 'object') {
                        displayTasks([data]);
                    } else {
                        throw new Error('Invalid data format');
                    }
                })
                .catch(error => {
                    console.error('Error fetching tasks by ID:', error.message);
                });
        }

        function fetchTasksByTitle() {
            const title = prompt('Enter Task Title:');
            if (!title) return;

            fetch(`http://localhost:8080/api/tasks/title/${title}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        displayTasks(data);
                    } else if (data && typeof data === 'object') {
                        displayTasks([data]);
                    } else {
                        throw new Error('Invalid data format');
                    }
                })
                .catch(error => {
                    console.error('Error fetching tasks by title:', error.message);
                });

        }
        /////////////////////



        function fetchTasks() {
            fetch('http://localhost:8080/api/tasks')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    displayTasks(data);
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error.message);

                });
        }

//////////////////////////////////////////////////////////////

        function displayTasks(tasks) {

            const taskTableBody = document.getElementById('taskTableBody');

            taskTableBody.innerHTML = '';

            tasks.forEach(task => {
                const rawDueDate = task.dueDate;

                const formattedDueDate = rawDueDate ? new Date(rawDueDate.replace(' ', 'T')).toLocaleDateString() : '';

                const row = `
                    <tr>
                        <td>${task.id}</td>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td>${task.status}</td>
                        <td>${formattedDueDate}</td>
                        <td>${task.project_id}</td>

                        <td>
                                <button class="updateTaskBtn" data-taskid="${task.id}">Update</button>
                                <button class="deleteTaskBtn" data-taskid="${task.id}">Delete</button>
                            </td>
                        </tr>
                    `;
                taskTableBody.insertAdjacentHTML('beforeend', row);
            });
            ///////////////////////////////////

            const deleteButtons = document.querySelectorAll('.deleteTaskBtn');
                    deleteButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const taskId = this.getAttribute('data-taskid');
                            handleDeleteTask(taskId);
                        });
                    });

                    const updateButtons = document.querySelectorAll('.updateTaskBtn');
                    updateButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            updateTaskForm.classList.remove('hidden');
                            const taskId = this.getAttribute('data-taskid');
                            handleUpdateTask(taskId);
                        });
                    });
                }

///////////////////////////////////////////////////////////////////////////

function handleUpdateTask(taskId) {
    fetch(`http://localhost:8080/api/tasks/${taskId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(taskDetails => {
            const updateTaskForm = document.getElementById('updateTaskForm');
            updateTaskForm.classList.add('hidden');


            updateTaskForm.elements['taskId'].value = taskDetails.id;
            updateTaskForm.elements['taskTitle'].value = taskDetails.title;
            updateTaskForm.elements['taskDescription'].value = taskDetails.description;
            updateTaskForm.elements['taskStatus'].value = taskDetails.status;
            updateTaskForm.elements['taskDueDate'].value = taskDetails.dueDate;
            updateTaskForm.elements['taskProjectId'].value = taskDetails.project_id;


            updateTaskForm.classList.remove('hidden');


            updateTaskForm.addEventListener('submit', function(event) {
                event.preventDefault();


                const updatedTask = {
                    id: updateTaskForm.elements['taskId'].value,
                    title: updateTaskForm.elements['taskTitle'].value,
                    description: updateTaskForm.elements['taskDescription'].value,
                    status: updateTaskForm.elements['taskStatus'].value,
                    dueDate: updateTaskForm.elements['taskDueDate'].value,
                    project_id: updateTaskForm.elements['taskProjectId'].value

                };


                fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .then(updatedTaskData => {

                        console.log('Task updated:', updatedTaskData);

                    })
                    .catch(error => {
                        console.error('Error updating task:', error.message);

                    });
            });
        })
        .catch(error => {
            console.error('Error fetching task details for update:', error.message);
        });
}
////////////////////////////////////////////////
function handleDeleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(deletedTaskData => {
                console.log('Task deleted:', deletedTaskData);

                fetchTasks();
            })
            .catch(error => {
                console.error('Error deleting task:', error.message);

            });
        }
    }

    fetchTasks();
});





