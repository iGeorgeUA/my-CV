const fetchLoader = document.querySelector('fetchLoader');

function ProjectList() {
  this.projects = [];
}

ProjectList.prototype.addItem = function (item) {
  this.projects.push({
      item,
      isDone: false
  });
}

ProjectList.prototype.printItems = function () {
  for (let i = 0; i < this.projects.length; i++) {
      const p = document.createElement('p');
      p.setAttribute('data-project', i);
      p.textContent = this.projects[i].item;
      p.appendChild(p);
  }
}

const projectList = new ProjectList()

fetchLoader.addEventListener('onload', fetchLoaderAsync);

async function fetchLoaderAsync() {
  const loaderRaw = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const projects = await loaderRaw.json();

  projects.forEach(project => {
    projectList.addItem(project.full_name, project.html_url, project.description);
    projectList.printItems();
  });
}