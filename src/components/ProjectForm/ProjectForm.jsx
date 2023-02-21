import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProjectForm() {

    // State


    // Hooks
    const navigate = useNavigate();

    // Actions
    const handleChange = (event) => {
        // target of event is input
        const {id, value} = event.target;

        // because we're not returning anything, we use ( brackets )
        setCredentials((prevCredentials) => ({
            // ... take all the values out of this object and put in new object
            ...prevCredentials,
            // this line overrides the previous credentials
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        return response.json();
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
          const { token } = await postData();
        //   "token" is the id, token is the value
          window.localStorage.setItem("token", token);
          navigate("/");
        }
      };

    return (
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
    );
  }
  
  export default CreateProjectForm;