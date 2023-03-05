import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import PledgeForm from "../components/PledgeForm/PledgeForm";

const getUser = async () => {
  // fetch request for users
  // console log and results.json
  // pass 'id' into this func as parameter
  // map over list of users and match the id, once there is a match return users username
  // parse id over list
  
    // Hooks
    const { id } = useParams();

    const userList = await fetch(`${import.meta.env.VITE_API_URL}users/`);
  
    const parsedUserList = await userList.json();
  
    console.log(parsedUserList);
}


function ProjectPage() {
// State
  const [project, setproject] = useState({pledges: []});
  const [user, setUser] = useState();


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
  
getUser()

  return (
    <>
    <h2>Healium project</h2>
    <section id="project-page-layout">
      <div className="project-and-pledge">
        <div>
        <h3>{project.title}</h3>
        <p>{project.owner}</p>
        <p>Created: {project.date_created}</p>
        <p>{`Status: ${project.is_open}`}</p>
        <p>Goal ${project.goal}</p>
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
      <PledgeForm />
      </section>
    </>
  );
}

export default ProjectPage;