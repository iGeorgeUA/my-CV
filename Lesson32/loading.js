const loader = document.querySelector('.loader');

loader.addEventListener("load", fetchLoaderAsync);

async function etchLoaderAsync() {
  const loader = await fetch('https://api.github.com/users/iGeorgeUA/repos');
    loader.addItem(project.full_name, project.html_url, project.description);
    loader.printItems();
}