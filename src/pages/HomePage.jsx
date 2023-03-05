import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";
// import deco from "../assets/deco.png";

function HomePage() {
    // State
    const [projectList, setProjectList] = useState ([]);

    // runs the first time after the UI is rendered
    useEffect(() => {
        // fetch makes a network request, asks for URL in browser
        fetch(`${import.meta.env.VITE_API_URL}projects`)
        .then((results) => {
          return results.json();
        })
        .then((data) => {
            // if this doesn't work, add (data.results)
          setProjectList(data);
        });
    }, []);

    return (
        <section>
            <h1 id="title">Healium</h1>
            <div className="tagline">
            <p>Helping people financially recover from family and domestic abuse.</p>
            <p>Select the <span className="quick-exit-note">'quick exit'</span> button to instantly log out and leave this website.</p>
            </div>
            <p id="project-header">Help someone heal today, view a project to pledge.<br/><img src={`../assets/images/bubble-purple.png`} alt="logo"/></p>
            <h2 id="home-projects">Projects</h2>
            <div className="text-block">
                <p>Exiting an abusive situation or environment is already challenging.  
                    Your pledge can help someone find a new place to live, pay for medical bills, 
                    or provide care for their children. For more information about family and 
                    domestic violence support, visit our <Link to="/support">support page</Link>.</p>
            </div>
            <div id="project-list">
                {projectList.map((project, key) => {
                    return <ProjectCard key={key} projectData={project} />;
                })}
            </div>
        </section>
    );
}

export default HomePage;