import { Link } from "react-router-dom";
import { format } from "date-fns";
import config from "globalConfig.json";

function Task({ task }) {
  return (
    <div className="card mb-3">
      <h5 className="card-header">
        <Link to={`/edit/${task.id}`}>{task.label}</Link>
      </h5>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          {" "}
          Every {task.period} days
        </h6>
        <h6>{`Last: ${format(
          new Date(task.last || task.startDate),
          config.internalDateFormat
        )}`}</h6>
        <h6>{`Next: ${format(
          new Date(task.next),
          config.internalDateFormat
        )}`}</h6>
      </div>
    </div>
  );
}

export default Task;
