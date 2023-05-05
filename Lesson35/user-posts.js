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
  listEmail.classList.add('p');
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

async function getPosts() {
  const id = getIdFromUrl();
  const response = await fetch(`${API_URL}/${id}/posts`);
  const posts = await response.json();
  posts.forEach(post => {
    const list = createPostList(post);
    postContainer.appendChild(list);
  });
}


getPosts();