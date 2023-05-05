const API_URL = 'https://gorest.co.in/public/v2/posts';

const postContainer = document.getElementById('post-list');
const comContainer = document.getElementById('com-list');

const titleEl = document.querySelector('.post-title');
const bodyEl = document.querySelector('.post-body');

function createComList(com) {
  const list = document.createElement('ul');
  list.classList.add('list-group');

  const listBody = document.createElement('li');
  listBody.classList.add('list-group-item', 'list-group-item-action');

  const listName = document.createElement('p');
  listName.classList.add('h5', 'name-link');
  listName.innerText = com.name;
  
  const listEmail = document.createElement('p');
  listEmail.classList.add('p');
  listEmail.innerText = com.body;

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
  const response = await fetch(`${API_URL}/${id}`);
  const post = await response.json();

  titleEl.innerText = post.title;
  bodyEl.innerText = post.body;
}

async function getComs() {
  const id = getIdFromUrl();
  const response = await fetch(`${API_URL}/${id}/comments`);
  const coms = await response.json();
  coms.forEach(com => {
    const list = createComList(com);
    comContainer.appendChild(list);
  });
}

getPosts();
getComs();