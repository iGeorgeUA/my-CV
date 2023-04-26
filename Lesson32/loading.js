const fetchLoader = document.querySelector('.fetchLoader');
/*
fetch('https://api.github.com/users/iGeorgeUA/repos')
  .then(res => res.json())
  .then(data => console.log(data))

fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(res => res.json())
  .then(data => console.log(data))
*/
function ProjectList() {
  this.projects = [];
}

ProjectList.prototype.addItem = function (item) {
  this.projects.push({
      item
  });
}

ProjectList.prototype.printItems = function () {
  fetchLoader.innerHTML = '';

  for (let i = 0; i < this.projects.length; i++) {
    const p = document.createElement('p');
    p.setAttribute('data-project', i);
    p.textContent = this.projects[i].item;

    fetchLoader.appendChild(p);
  }
}

const projectList = new ProjectList()
window.addEventListener('load', fetchLoaderAsync);

async function fetchLoaderAsync() {
  const loaderRaw = await fetch('https://api.github.com/users/iGeorgeUA/repos');
  const projects = await loaderRaw.json();

  projects.forEach(project => {
    projectList.addItem(project.full_name);
    projectList.addItem(project.html_url);
    projectList.addItem(project.description);
    console.log(projectList)
    projectList.printItems();

  });
}