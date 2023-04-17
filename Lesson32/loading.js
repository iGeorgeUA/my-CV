const loader = document.querySelector('.loader');
loader.innerHTML = '';

loader.addEventListener('load', fetchLoaderAsync);

async function fetchLoaderAsync() {
  const loading = await fetch('https://api.github.com/users/iGeorgeUA/repos');
  const projects = await loading.json();

  projects.forEach(project => {
    loader.addItem(project.full_name, project.html_url, project.description);
    loader.printItems();
  });
}