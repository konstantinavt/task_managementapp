document.addEventListener('DOMContentLoaded', function() {
    const userTable = document.getElementById('userTable');
    const findBtn = document.getElementById('findBtn');
    const subButtons = document.querySelector('.subButtons');

     findBtn.addEventListener('click', function() {
             subButtons.classList.toggle('hidden');
     });

     const findByUserIdBtn = document.getElementById('findByUserIdBtn');
     const findByUsernameBtn = document.getElementById('findByUsernameBtn');


     findByUserIdBtn.addEventListener('click', function() {
             fetchUsersByID();
     });


     findByUsernameBtn.addEventListener('click', function() {
             fetchUsersByUsername();
      });


      function fetchUsersByID() {
            const userId = prompt('Enter User ID:');
            if (!userId) return; // Exit if ID is empty or canceled

            fetch(`http://localhost:8080/api/users/id/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        displayUsers(data);
                    } else if (data && typeof data === 'object') {

                        displayUsers([data]);
                    } else {
                        throw new Error('Invalid data format');
                    }
                })
                .catch(error => {
                    console.error('Error fetching users by ID:', error.message);
                });
        }


         function fetchUsersByUsername() {
             const username = prompt('Enter Username:');
             if (!username) return;

             fetch(`http://localhost:8080/api/users/${username}`)
                 .then(response => {
                     if (!response.ok) {
                         throw new Error('Network response was not ok.');
                     }
                     return response.json();
                 })
                 .then(data => {
                     if (Array.isArray(data)) {
                         displayUsers(data);
                     } else if (data && typeof data === 'object') {

                         displayUsers([data]);
                     } else {
                         throw new Error('Invalid data format');
                     }
                 })
                 .catch(error => {
                     console.error('Error fetching users by username:', error.message);
                 });
         }


///////////////////////////////////////

     if (userTable) {
        fetchUsers();

    function fetchUsers() {
        fetch('http://localhost:8080/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                // Display users in the table
                displayUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error.message);

            });
    }
    ///////////////////////////////////////////////

    function displayUsers(users) {

        userTable.innerHTML = '';


        const tableHeaders = `
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>

               <th>Action</th>

            </tr>
        `;
        userTable.insertAdjacentHTML('beforeend', tableHeaders);


        users.forEach(user => {
            const row = document.createElement('tr');
            const tdUserId = document.createElement('td');
                    tdUserId.textContent = user.id;
                    row.appendChild(tdUserId);

                    const tdUsername = document.createElement('td');
                    tdUsername.textContent = user.username;
                    row.appendChild(tdUsername);

                    const tdEmail = document.createElement('td');
                    tdEmail.textContent = user.email;
                    row.appendChild(tdEmail);

                    //const tdPassword = document.createElement('td');
                    //tdPassword.textContent = user.password;
                    //row.appendChild(tdPassword);

                    const tdActions = document.createElement('td');
/////////////////////////////////
          const updateButton = document.createElement('button');
                  updateButton.classList.add('updateUserBtn');
                  updateButton.dataset.userid = user.id;
                  updateButton.textContent = 'Update';
                  updateButton.addEventListener('click', function() {
                      const userId = this.dataset.userid;
                      handleUpdateUser(userId);
                  });
                  tdActions.appendChild(updateButton);

                  const deleteButton = document.createElement('button');
                  deleteButton.classList.add('deleteUserBtn');
                  deleteButton.dataset.userid = user.id;
                  deleteButton.textContent = 'Delete';
                  deleteButton.addEventListener('click', function() {
                      const userId = this.dataset.userid;
                      handleDeleteUser(userId);
                  });
                  tdActions.appendChild(deleteButton);

                  row.appendChild(tdActions);

                  userTable.appendChild(row);
              });
          }
/////////////////////////////////////////
           function handleUpdateUser(userId) {

                fetch(`http://localhost:8080/api/users/id/${userId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .then(userDetails => {
                        const updateUserForm = document.getElementById('updateUserForm');

                                    updateUserForm.elements['userId'].value = userDetails.id;
                                    updateUserForm.elements['username'].value = userDetails.username;
                                    updateUserForm.elements['email'].value = userDetails.email;
                                    updateUserForm.elements['password'].value = userDetails.password;


                                    updateUserForm.classList.remove('hidden');


                                    updateUserForm.addEventListener('submit', function(event) {
                                        event.preventDefault();


                                        const updatedUser = {
                                            id: updateUserForm.elements['userId'].value,
                                            username: updateUserForm.elements['username'].value,
                                            email: updateUserForm.elements['email'].value,
                                            password: updateUserForm.elements['password'].value
                                        };


                                        fetch(`http://localhost:8080/api/users/${userId}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(updatedUser)
                                        })
                                        .then(response => {
                                            if (!response.ok) {
                                                throw new Error('Network response was not ok.');
                                            }
                                            return response.json();
                                        })
                                        .then(updatedUserData => {

                                            console.log('User updated:', updatedUserData);

                                        })
                                        .catch(error => {
                                            console.error('Error updating user:', error.message);

                                        });
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching user details for update:', error.message);
                                });
                        }
                        if (userTable) {
                                fetchUsers();
                         } else {
                                console.error("User table element not found");
                         }


            }
            ////////////////////////////
            function handleDeleteUser(user_id) {
                fetch(`http://localhost:8080/api/users/${user_id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    console.log(`User with ID ${user_id} deleted successfully.`);

                })
                .catch(error => {
                    console.error('Error deleting user:', error.message);

                });
            }


       });





