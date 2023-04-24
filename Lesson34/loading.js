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
  const loaderRaw = await fetch('https://api.github.com/users/iGeorgeUA/repos');
  const projects = await loaderRaw.json();

  projects.forEach(project => {
    projectList.addItem(project.full_name, project.html_url, project.description);
    projectList.printItems();
  });
}

const fetchApi = document.querySelector('fetchApi');
const API_TOKEN = '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';

fetchApi.addEventListener('onload', fetchApiAsync);

class Api {
  constructor(token, userName) {
    this.token = token;
    this.userName = userName;
  }

  async function fetchApiAsync(url = 'https://api.github.com/users/iGeorgeUA/repos', data = {
    headers: {
        'Authorization': 'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28',
    },
  }) {
    const response = await fetch(url, data);
    const userName = await response.json();
  }

  getRepos() {
    return this.userName;
  }
}

const api = new Api();
console.log(api instanceof Api);