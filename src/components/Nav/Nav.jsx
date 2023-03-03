import { Link } from "react-router-dom";

import "./Nav.css"

function Nav(props) {

    const { loggedIn, setLoggedIn } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token");
        setLoggedIn(false);
    }

    return (
    <nav>
        <p>Sanctuary</p>
        <Link to="/">Home</Link>
        <Link to="/projects-list">Browse</Link>
        <Link to="/create-project">Create project</Link>
        {!loggedIn && <Link to="/login" className="btn">Login In</Link>}
        {loggedIn && <button onClick={handleClick}>Sign Out</button>}
    </nav>
    );
}

export default Nav;

    // const handleClick  = () => {
    //     // window.close();
    // // this isn't working yet, needs to stop 'back' from going back to the website, for some reason it is clearing the
    // // last item but not all (though when I double checked, it doesn't seem to matter if this line is here or not)
    // // I also checked the white ribbon website where I found a similar button and it doesn't work either
    //     window.history.replaceState({}, 'foo', '/foo');
    // // found another website where they open a new tab and redirect the existing, I prefer this approach https://www.ruah.org.au/stories/
    //     window.open("http://www.bom.gov.au/","_blank");
    // // this works
    //     window.location.replace("https://google.com");
    // };