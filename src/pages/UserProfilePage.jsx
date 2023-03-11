import { useState, useEffect } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

// Components


function UserProfilePage() {
  const authToken = window.localStorage.getItem("token");
  const [loggedIn] = useOutletContext();
  
// State
  const [user, setUser] = useState({pledges: []});
  const [owner, setOwner] = useState([]);

  // Hooks
  const { id } = useParams();

  // Effects
  useEffect(() => {
    // fetch is an asynchronis function
    // using 'await' stops the code and makes it wait for the function to finish, it's typically used instead of 
    // useEffect as an async code
    fetch(`${import.meta.env.VITE_API_URL}users/${id}`)
    .then(results => {
      return results.json();
    })
    .then((data) => {
      setUser(data);
    });
  }, []);
  
  return (
    <>
      {loggedIn?
      <>
        <h2>User profile</h2>
        <div>
          <h3>Hello {user.username}</h3>
          <p>Email: {user.email}</p>
        </div>
      </>
      : (<p>Log in to view profile</p>) }
      </>
    );
  }

export default UserProfilePage;