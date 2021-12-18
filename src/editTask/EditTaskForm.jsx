import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";
import { format, addDays, parse } from "date-fns";
import { config } from "globalConfig";
import taskStorage from "storageService";
import ReactDatePicker from "react-datepicker";

function EditTaskForm({ onSave, onDelete, onAddExec }) {
  const { id } = useParams();
  const task = taskStorage.getTask(id);
  const [label, setLabel] = useState(task?.label);
  const [period, setPeriod] = useState(task?.period);
  const [startDate] = useState(
    parse(task.startDate, config.dateFormat, new Date())
  );
  const [last, setLast] = useState(
    task.last ? parse(task.last, config.dateFormat, new Date()) : null
  );
  const [next, setNext] = useState(
    task.next ? parse(task.next, config.dateFormat, new Date()) : null
  );
  const [nextExec, setNextExec] = useState(new Date());
  const [displayExec, setDisplayExec] = useState(false);
  const history = useHistory();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const newTask = {
      label,
      period,
      next: format(addDays(last || startDate, period), config.dateFormat),
    };
    onSave({ ...task, ...newTask });
    history.push("/");
  };

  const formDeleteHandler = (event) => {
    event.preventDefault();
    onDelete(id);
    history.push("/");
  };

  const addExecution = (event) => {
    event.preventDefault();
    const newLast = format(nextExec, config.dateFormat);
    const newNext = format(addDays(nextExec, period), config.dateFormat);
    onAddExec(task.id, newLast);
    onSave({ ...task, last: newLast, next: newNext });
    setLast(nextExec);
    setNext(addDays(nextExec, period));
    setDisplayExec(false);
  };

  return (
    <div className="col-4">
      <div className="card">
        <form onSubmit={formSubmitHandler}>
          <h4 className="card-header">Edit Task</h4>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="label" className="form-label">
                Label
              </label>
              <input
                value={label}
                type="text"
                className="form-control"
                id="label"
                placeholder="Ex: pay the bills"
                onChange={(event) => setLabel(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="period" className="form-label">
                Period
              </label>
              <input
                value={period}
                type="number"
                step="1"
                min="1"
                className="form-control"
                id="period"
                placeholder="Ex: 60 (2 months)"
                onChange={(event) => setPeriod(parseInt(event.target.value))}
                required
              />
            </div>
            <div className="mb-3">
              <div className="form-label">Start Date: {task.startDate}</div>
              {last ? (
                <div className="form-label">
                  Last execution: {format(last, config.dateFormat, new Date())}
                </div>
              ) : null}
              {next ? (
                <div className="form-label">
                  Next execution: {format(next, config.dateFormat, new Date())}
                </div>
              ) : null}
            </div>
            {displayExec ? (
              <div className="mb-3">
                <ReactDatePicker
                  selected={nextExec}
                  className="form-control mb-2"
                  dateFormat={config.dateFormat}
                  onChange={(date) => setNextExec(date)}
                  required
                />
                <a onClick={addExecution} className="btn btn-success">
                  Add
                </a>
              </div>
            ) : (
              <div className="mb-3">
                <a
                  onClick={() => setDisplayExec(true)}
                  className="btn btn-success"
                >
                  Execute
                </a>
              </div>
            )}
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button onClick={formDeleteHandler} className="btn btn-danger ml-2">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskForm;
