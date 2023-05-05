const API_URL = 'https://gorest.co.in/public/v2/users';

const userContainer = document.getElementById('user-list')

function createUserList(user) {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  const listBody = document.createElement('li');
  listBody.classList.add('list-group-item', 'list-group-item-action');

  const listName = document.createElement('a');
  listName.classList.add('h5', 'name-link');
  listName.href = `user-posts.html?id=${user.id}`;
  listName.innerText = user.name;
  
  const listEmail = document.createElement('p');
  listEmail.classList.add('p');
  listEmail.innerText = user.email;

  listBody.appendChild(listName);
  listBody.appendChild(listEmail);

  list.appendChild(listBody);

  return list;
}

function createErrorMessageBox(message) {
  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('alert', 'alert-danger');
  errorMessageBox.innerText = message;

  return errorMessageBox;
}

function handleLoaded() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

async function getUsers() {
  try {
    const response = await fetch(API_URL);
    handleLoaded();
    if (!response.ok) {
      throw new Error('Users not found');
    }
    const users = await response.json();
    users.forEach(user => {
      const list = createUserList(user);
      userContainer.appendChild(list);
    });
  } catch (error) {
    const errorMessageBox = createErrorMessageBox(error.message);
    userContainer.appendChild(errorMessageBox);
  }
}

getUsers();