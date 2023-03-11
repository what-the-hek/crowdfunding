import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./Nav.css"

function Nav(props) {

    const { loggedIn, setLoggedIn } = props;
    const { user } = props;

    // Hooks
    const { id } = useParams(user);

    const handleClick = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
    };

    // Quick exit button for user safety - should update to also log out
    const handleClickExit  = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
        window.history.replaceState({}, 'foo', '/foo');
        window.open("http://www.bom.gov.au/","_blank");
        window.location.replace("https://google.com");
    };


  // Effects
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}users/${id}`)
//     .then(results => {
//       return results.json();
//     })
//     .then((data) => {
//       setUser(data);
//     });
//   }, []);


    return (
    <nav className="nav-links">
        <div>
        <Link to="/support">Support</Link>
        <Link to="/create-project">Start a project</Link>
        </div>
        <div>
        <img src={`../assets/images/bubble-white.png`} alt="logo"/>
        <p id="title">Healium</p>
        </div>
        <div>
        <Link to="/">Home</Link>
        {!loggedIn && <Link to="/login">Log In</Link>}
        {loggedIn && <Link to="users/">User profile</Link>}
        {loggedIn && <button onClick={handleClick}>Log Out</button>}
        <button id="quick-exit" onClick={handleClickExit}>Quick exit</button>
        </div>
    </nav>
    );
}

export default Nav;