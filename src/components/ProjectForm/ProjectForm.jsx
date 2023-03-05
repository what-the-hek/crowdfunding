import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function CreateProjectForm() {
    const authToken = window.localStorage.getItem("token");
    const [loggedIn] = useOutletContext();

    // State
    const [projects, setProjects] = useState({
      "title": "",
      "description": "",
      "goal": null,
      // couldn't get the image field in form to work, so inserting generic images here for now
      "image": "https://images.pexels.com/photos/1487100/pexels-photo-1487100.jpeg?auto=compress&cs=tinysrgb&w=600",
      "is_open": true,
      // this date needs to be created automatically from today's date and time
      "date_created": "2023-03-05T12:31:24.145010Z",
    });
   
    // Hooks
    const navigate = useNavigate();

    // Actions
    const handleChange = (event) => {
        // target of event is input
        const {id, value} = event.target;

        // because we're not returning anything, we use ( brackets )
        setProjects((prevProjects) => ({
            // ... take all the values out of this object and put in new object
            ...prevProjects,
            // this line overrides the previous credentials
            [id]: value,
        }));
    };

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}projects/`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(projects),
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
        {/* <div>
        <label htmlFor="image">Image URL:</label>
          <input
            type="image"
            id="image"
            onChange={handleChange}
            placeholder="Enter an image URL"
          />
        </div> */}
        <button type="submit">
          Create project
        </button>
      </form>
      : (<p>Log in to create a project</p>) }
      </>
    );
  }
  
  export default CreateProjectForm;