import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

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
            <h1>Sanctuary</h1>
            <p>Crowdfunding for people have experienced family and domestic violence.</p>
            <div id="project-list">
                {projectList.map((project, key) => {
                    return <ProjectCard key={key} projectData={project} />;
                })}
            </div>
        </section>
    );
}
export default HomePage;