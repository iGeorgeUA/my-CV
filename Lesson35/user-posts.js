const API_URL = 'https://gorest.co.in/public/v2/users';

const postContainer = document.getElementById('posts-list')

function createPostList(post) {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  const listBody = document.createElement('li');
  listBody.classList.add('list-group-item', 'list-group-item-action');

  const listName = document.createElement('a');
  listName.classList.add('h5', 'name-link');
  listName.href = `post.html?id=${post.id}`;
  listName.innerText = post.title;
  
  const listEmail = document.createElement('p');
  listEmail.classList.add('p', 'text-truncate');
  listEmail.innerText = post.body;

  listBody.appendChild(listName);
  listBody.appendChild(listEmail);

  list.appendChild(listBody);

  return list;
}

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;
  return params.get('id');
}

function createErrorMessageBox(message) {
  const errorMessageBox = document.createElement('div');
  errorMessageBox.classList.add('alert', 'alert-danger');

  const errorMessage = document.createElement('div');
  errorMessage.classList.add('alert-danger');
  errorMessage.innerText = message;

  const errorMessageBtn = document.createElement('a');
  errorMessageBtn.classList.add('btn', 'btn-outline-danger');
  errorMessageBtn.href = 'index.html';
  errorMessageBtn.innerText = 'Back';

  errorMessageBox.appendChild(errorMessage);
  errorMessageBox.appendChild(errorMessageBtn);

  return errorMessageBox;
}

function handleLoaded() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}

async function getPosts() {
  try {
    const id = getIdFromUrl();
    const response = await fetch(`${API_URL}/${id}/posts`);
    handleLoaded();
    if (!response.ok) {
      throw new Error('User has no posts');
    }
    const posts = await response.json();
    posts.forEach(post => {
      const list = createPostList(post);
      postContainer.appendChild(list);
    });
  } catch (error) {
    const errorMessageBox = createErrorMessageBox(error.message);
    postContainer.appendChild(errorMessageBox);
  }
}

getPosts();