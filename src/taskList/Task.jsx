import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Task({ task }) {
  return (
    <div className="card">
      <h5 className="card-header">
        <Link to={`/edit/${task.id}`}>{task.label}</Link>
      </h5>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          {" "}
          Every {task.period} days
        </h6>
        <h6>{`Last: ${task.last || task.startDate}`}</h6>
        <h6>{`Next: ${task.next}`}</h6>
      </div>
    </div>
  );
}

export default Task;
