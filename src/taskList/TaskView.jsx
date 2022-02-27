import { Link } from "react-router-dom";
import { format, isPast, isThisWeek } from "date-fns";
import config from "globalConfig.json";

function TaskView({ task }) {
  let className = "";
  const next = new Date(task.next);
  if (isPast(next)) {
    className = "bg-danger text-white";
  } else if (isThisWeek(next)) {
    className = "bg-warning";
  }
  return (
    <div className={`card ${className} mb-3`}>
      <h5 className="card-header ">
        <Link style={{ color: "inherit" }} to={`/edit/${task.id}`}>
          {task.label}
        </Link>
      </h5>
      <div className="card-body ">
        <div className="fs-6 fw-lighter">Every {task.period} days</div>
        <div>{`Last: ${format(
          new Date(task.last || task.startDate),
          config.internalDateFormat
        )}`}</div>
        <h6>{`Next: ${format(
          new Date(task.next),
          config.internalDateFormat
        )}`}</h6>
      </div>
    </div>
  );
}

export default TaskView;
