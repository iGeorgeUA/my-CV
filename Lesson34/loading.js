const fetchLoader = document.querySelector('fetchLoader');

class ProjectList {
  constructor() {
    this.projects = [];
  }

  addItem(name, url, desc) {
    this.projects.push({
      name, url, desc
    });
  }

  printItems() {
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
}

const projectList = new ProjectList();
window.addEventListener('load', getRepos)

class Api {
  constructor(token, userName) {
    this.token = token;
    this.userName = userName;
  }

  async function getRepos() {
    const loaderRaw = await fetch(`https://api.github.com/users/${this.userName}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    const projects = await loaderRaw.json();

    projects.forEach(project => {
      projectList.addItem(project.full_name, project.html_url, project.description);
      projectList.printItems();
    });
  }
}

const api = new Api('', '');