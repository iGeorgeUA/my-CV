const API_URL = 'https://dummyjson.com/users';

const userContainer = document.getElementById('user-list')

function createList(user) {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  const listBody = document.createElement('li');
  listBody.classList.add('list-group-item', 'list-group-item-action');

  const listImage = document.createElement('img');
  listImage.classList.add('list-image');
  listImage.src = user.image;

  const listText = document.createElement('div');
  listText.classList.add('list-text');

  const listName = document.createElement('a');
  listName.classList.add('h5', 'name-link');
  listName.href = `user-posts.html?id=${user.id}`;
  listName.innerText = user.firstName + user.lastName;
  
  const listUserName = document.createElement('p');
  listUserName.classList.add('p');
  listUserName.innerText = '@' + user.username;

  listText.appendChild(listName);
  listText.appendChild(listUserName);

  listBody.appendChild(listImage);
  listBody.appendChild(listText);

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

function getUsers() {
  return fetch(API_URL)
    .then(response => {
      handleLoaded();
      if (!response.ok) {
        throw new Error('Users not found');
      }

      return response.json()
    })
    .then(({ users }) => {
      users.forEach(user => {
        const list = createList(user);
        userContainer.appendChild(list);
      })
    })
    .catch (error => {
      const errorMessageBox = createErrorMessageBox(error.message);
      userContainer.appendChild(errorMessageBox);
    })
}

getUsers();