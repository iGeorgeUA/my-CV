import React, {useState, useEffect} from 'react';

export function Repos() {

  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    const response = await fetch('https://api.github.com/users/iGeorgeUA/repos');
    setRepos(await response.json());
  }

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div>
      <h2>My projects:</h2><hr />
      <div>
        {
          repos.map((e) => {
            return(
              <div>
                <a href={e.html_url}>{e.full_name}</a>
                <p>{e.description}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}