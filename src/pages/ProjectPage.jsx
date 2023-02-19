import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ProjectPage() {
// State
  const [project, setproject] = useState({pledges: []});


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
    });
  }, []);

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          return (
            <li>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;