import { Link } from "react-router-dom";

// CSS
import "./ProjectCard.css"

function ProjectCard(props) {
  const { projectData } = props;

  return (
    <div className="project-card">
      <Link to={`/project/${projectData.id}`}>
        <img src={projectData.image} />
        <h3>{projectData.title}</h3>
        <p>By {projectData.owner}</p>
        <p>Goal ${projectData.goal}</p>
      </Link>
    </div>
  );
}

export default ProjectCard;