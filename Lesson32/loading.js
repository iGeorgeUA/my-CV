const fetchLoader = document.querySelector('.fetchLoader');

function ProjectList() {
  this.projects = [];
}

ProjectList.prototype.addItem = function (name, url, desc) {
  this.projects.push({
    name, url, desc
  });
}

ProjectList.prototype.printItems = function () {
  fetchLoader.innerHTML = '';

  for (let i = 0; i < this.projects.length; i++) {
    const pr = document.createElement('p');
    pr.setAttribute('id', `project-${i}`);

    const a = document.createElement('a');
    a.setAttribute('data-link', i);
    a.textContent = this.projects[i].name;
    a.href = this.projects[i].url;

    const p = document.createElement('p');
    p.setAttribute('data-project', i);
    p.textContent = this.projects[i].desc;

    pr.appendChild(a);
    if (p != null) {
      pr.appendChild(p);
    }
    fetchLoader.appendChild(pr);
  }
}

const projectList = new ProjectList()
window.addEventListener('load', fetchLoaderAsync);

async function fetchLoaderAsync() {
  const loaderRaw = await fetch('https://api.github.com/users/iGeorgeUA/repos');
  const projects = await loaderRaw.json();

  projects.forEach(project => {
    projectList.addItem(project.full_name, project.html_url, project.description);
    projectList.printItems();
  });
}