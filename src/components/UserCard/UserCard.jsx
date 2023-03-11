// CSS
import "./ProjectCard.css"

function UserCard(props) {
  const { user } = props;

  return (
    <div className="project-card">
      <p>{`/users/${user.id}`}</p>
        <h4>Username: {user.username}</h4>
        <p>Email: {user.email}</p>
    </div>
  );
}

export default UserCard;