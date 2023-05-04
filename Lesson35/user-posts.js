const API_URL = 'https://dummyjson.com/posts';

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;

  console.log(params.get('id'));
}

async function getPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const product = await response.json();

  return product;
}

getIdFromUrl();