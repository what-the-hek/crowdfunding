import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function CreateProjectForm() {
    const authToken = window.localStorage.getItem("token");
    const [loggedIn] = useOutletContext();

    // State
    const [project, setProject] = useState({
      "title": "",
      "description": "",
      "goal": null,
      "img": "",
    });
   
    // Hooks
    const navigate = useNavigate();

    // Actions
    const handleChange = (event) => {
        // target of event is input
        const {id, value} = event.target;

        // because we're not returning anything, we use ( brackets )
        setProject((prevProject) => ({
            // ... take all the values out of this object and put in new object
            ...prevProject,
            // this line overrides the previous credentials
            [id]: value,
        }));
    };

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}project/`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(project),
              }
            );
            if (!response.ok) {
              throw new Error(await response.text());
            }
            location.reload();
          } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
            }
          } else {
            // redirect to login page
            navigate(`/login`);
          }
          };

    return (
      <>
      {loggedIn?
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
            placeholder="Description of your project goal"
          />
        </div>
        <div>
          <label htmlFor="goal">Goal amount:</label>
          <input
            type="number"
            id="goal"
            onChange={handleChange}
            placeholder="$"
          />
        </div>

        <div>
        <label htmlFor="img">Image URL:</label>
          <input
            type="image"
            id="img"
            onChange={handleChange}
            placeholder="Enter an image URL"
          />
        </div>

        <button type="submit">
          Save
        </button>
      </form>
      : (<p>Log in to submit a project</p>) }
      </>
    );
  }
  
  export default CreateProjectForm;