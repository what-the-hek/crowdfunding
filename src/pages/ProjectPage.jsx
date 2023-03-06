import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import PledgeForm from "../components/PledgeForm/PledgeForm";

function ProjectPage() {
// State
  const [project, setproject] = useState({pledges: []});
  const [owner, setOwner] = useState([]);

  // convert ISO date to desired format
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  };
  const date = new Date(project.date_created).toLocaleDateString(undefined, options);

  // Hooks
  const { id } = useParams();

  // Effects
  useEffect(() => {
    // fetch is an asynchronis function
    // using 'await' stops the code and makes it wait for the function to finish, it's typically used instead of 
    // useEffect as an async code
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
    .then(results => {
      return results.json();
    })
    .then((data) => {
      setproject(data);

      // get username of owner
      const userId = data.owner;
      return fetch(`${import.meta.env.VITE_API_URL}users/${userId}`);
    })
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return setOwner(data);
    });
  }, []);
  
  return (
    <>
    <h2>Healium project</h2>
    <section id="project-page-layout">
      <div className="project-and-pledge">
        <div>
          <h3>{project.title}</h3>
          <div id="project-info">
            <p>Created by {owner.username}</p>
            <p>Date: {`${date}`}</p>
            <p>Goal amount ${project.goal}</p>
            <p>Total pledges $---</p>
          </div>
          <p>{project.description}</p>
        </div>
        <div>
            <h3>Pledges</h3>
            <ul id="pledge-list">
              {project.pledges.map((pledgeData, key) => {
                return (
                  <li key={key}>
                    ${pledgeData.amount} from {pledgeData.supporter}. "{pledgeData.comment}"
                  </li>
                );
              })}
            </ul>
        </div>
      </div>
      <div>
        <img id="project-image" src={project.image} />
        <PledgeForm />
        </div>
      </section>
    </>
  );
}

export default ProjectPage;