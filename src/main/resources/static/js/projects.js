document.addEventListener('DOMContentLoaded', function() {
       const projectTable = document.getElementById('projectTable');
       const findBtn = document.getElementById('findBtn');
       const subButtons = document.querySelector('.subButtons');

        findBtn.addEventListener('click', function() {
            subButtons.classList.toggle('hidden');
        });

        const findByProjectIdBtn = document.getElementById('findByProjectIdBtn');
        const findByProjectNameBtn = document.getElementById('findByProjectNameBtn');

        findByProjectIdBtn.addEventListener('click', function() {
            fetchProjectsByID();
        });

        findByProjectNameBtn.addEventListener('click', function() {
            fetchProjectsByName();
        });

        function fetchProjectsByID() {
            console.log('Fetching projects by ID...');
            const projectId = prompt('Enter Project ID:');
            if (!projectId) return;

            fetch('http://localhost:8080/api/projects/${projectId}')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        displayProjects(data);
                    } else if (data && typeof data === 'object') {
                        displayProjects([data]);
                    } else {
                        throw new Error('Invalid data format');
                    }
                })
                .catch(error => {
                    console.error('Error fetching projects by ID:', error.message);
                });
        }

        function fetchProjectsByName() {
            console.log('Fetching projects by name...');
            const projectName = prompt('Enter Project Name:');
            if (!projectName) return;

            fetch('http://localhost:8080/api/projects/name/${projectName}')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        displayProjects(data);
                    } else if (data && typeof data === 'object') {
                        displayProjects([data]);
                    } else {
                        throw new Error('Invalid data format');
                    }
                })
                .catch(error => {
                    console.error('Error fetching projects by name:', error.message);
                });
        }
        ///////

    if (projectTable) {
        fetchProjects();

        function fetchProjects() {
            fetch('http://localhost:8080/api/projects')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    displayProjects(data);
                })
                .catch(error => {
                    console.error('Error fetching projects:', error.message);
                    // Handle error
                });
        }

        function displayProjects(projects) {
            projectTable.innerHTML = '';

            const tableHeaders = `
                <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Task Titles</th>
                    <th>Action</th>
                </tr>
            `;
            projectTable.insertAdjacentHTML('beforeend', tableHeaders);

            projects.forEach(project => {
            const taskTitles = project.tasks.map(task => task.title).join(', ');

                const row = `
                                <tr>
                                    <td>${project.id}</td>
                                    <td>${project.name}</td>
                                    <td>${project.description}</td>
                                    <td>${taskTitles}</td>
                                    <td>
                                        <button class="updateProjectBtn" data-projectid="${project.id}">Update</button>
                                        <button class="deleteProjectBtn" data-projectid="${project.id}">Delete</button>
                                    </td>
                                </tr>
                            `;
                            projectTable.insertAdjacentHTML('beforeend', row);
                        });

                        const deleteButtons = document.querySelectorAll('.deleteProjectBtn');
                        deleteButtons.forEach(button => {
                            button.addEventListener('click', function() {
                                const projectId = this.getAttribute('data-projectid');
                                handleDeleteProject(projectId);
                            });
                        });

                        const updateButtons = document.querySelectorAll('.updateProjectBtn');
                        updateButtons.forEach(button => {
                            button.addEventListener('click', function() {
                                const projectId = this.getAttribute('data-projectid');
                                handleUpdateProject(projectId);
                            });
                        });
        }
/////////////////////////////
         function handleUpdateProject(projectId) {

             console.log('Fetching project details for project ID:', projectId);
             fetch('http://localhost:8080/api/projects/' + projectId)
                  .then(response => {
                      if (!response.ok) {
                         throw new Error('Network response was not ok.');
                       }
                        return response.json();
                   })
                   .then(projectDetails => {
                       if (!projectDetails) {
                        throw new Error('Project details not found.');
                    }


                  console.log('Project details:', projectDetails);

                   const updateProjectForm = document.getElementById('updateProjectForm');




            updateProjectForm.elements['projectId'].value = projectDetails.id;
            updateProjectForm.elements['projectName'].value = projectDetails.name;
            updateProjectForm.elements['projectDescription'].value = projectDetails.description;
            const taskTitles = projectDetails.tasks.map(task => task.title).join(', ');
            updateProjectForm.elements['projectTaskTitles'].value = taskTitles;


            updateProjectForm.classList.remove('hidden');


            updateProjectForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default form submission


                const updatedProject = {
                    id: updateProjectForm.elements['projectId'].value,
                    name: updateProjectForm.elements['projectName'].value,
                    description: updateProjectForm.elements['projectDescription'].value,
                    taskTitles: updateProjectForm.elements['projectTaskTitles'].value.split(',').map(title => title.trim())
                };


                fetch('http://localhost:8080/api/projects/' + projectId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProject)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .then(updatedProjectData => {

                        console.log('Project updated:', updatedProjectData);

                    })
                    .catch(error => {
                        console.error('Error updating project:', error.message);

                    });
            });
        })
        .catch(error => {
            console.error('Error fetching project details for update:', error.message);
        });
  }
///////////////////////////////////////
   function handleDeleteProject(projectId) {
        if (confirm('Are you sure you want to delete this project?')) {
            fetch(`http://localhost:8080/api/projects/${projectId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(deletedProjectData => {
                console.log('Project deleted:', deletedProjectData);

                fetchProjects();
            })
            .catch(error => {
                console.error('Error deleting project:', error.message);

            });
      }

    }

  }
  fetchProjects();
});
