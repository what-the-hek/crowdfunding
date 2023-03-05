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

  // const d = new Date();
  // let newDate = d.toLocaleDateString('en-GB');

  // let isoDate = {date_created};
  // var newDate = new Date(isoDate);
  // newDate.toLocaleDateString('en-GB'); // dd/mm/yyyy
  // console.log(newDate)

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
          <div id="project-info">
            <p>Created by {project.owner}</p>
            <p>Date: {project.date_created}</p>
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

{/* <p>{`Status: ${project.is_open}`}</p> */}