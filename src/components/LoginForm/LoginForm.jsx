import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    // State
    const [credentials, setCredentials] = useState ({
        username: "",
        password: "",
    });

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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    );
  }
  
  export default LoginForm;