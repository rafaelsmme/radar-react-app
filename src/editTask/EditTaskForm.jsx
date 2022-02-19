import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import config from "globalConfig.json";
import taskStorage from "storageService";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react/cjs/react.development";

function EditTaskForm({ onSave, onDelete, onAddExec }) {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [label, setLabel] = useState("");
  const [period, setPeriod] = useState(7);
  const [startDate, setStartDate] = useState(null);
  const [last, setLast] = useState(null);
  const [next, setNext] = useState(null);
  const [nextExec, setNextExec] = useState(new Date());
  const [displayExec, setDisplayExec] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    const t = await taskStorage.getTask(id);
    console.log(t);
    setTask({ ...t });
    setLabel(t.label);
    setPeriod(t.period);
    setStartDate(new Date(t.startDate));
    setLast(t.last ? new Date(t.last) : null);
    setNext(new Date(t.next));
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const newTask = {
      label,
      period,
      // last: format(last || startDate, config.externalDateFormat),
      next: format(
        addDays(last || startDate, period),
        config.externalDateFormat
      ),
      // startDate: format(startDate: )
    };
    await onSave({ ...task, ...newTask });
    navigate("/");
  };

  const formDeleteHandler = async (event) => {
    event.preventDefault();
    await onDelete(id);
    history.push("/");
  };

  const addExecution = async (event) => {
    event.preventDefault();
    const newLast = format(nextExec, config.externalDateFormat);
    const newNext = format(
      addDays(nextExec, period),
      config.externalDateFormat
    );
    onAddExec(id, newLast);
    await onSave({ ...task, last: newLast, next: newNext });
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
              {startDate ? (
                <div className="form-label">
                  Start Date: {format(startDate, config.internalDateFormat)}
                </div>
              ) : null}
              {last ? (
                <div className="form-label">
                  Last execution:
                  {format(last, config.internalDateFormat)}
                </div>
              ) : null}
              {next ? (
                <div className="form-label">
                  Next execution: {format(next, config.internalDateFormat)}
                </div>
              ) : null}
            </div>
            {displayExec ? (
              <div className="mb-3">
                <ReactDatePicker
                  selected={nextExec}
                  className="form-control mb-2"
                  dateFormat={config.internalDateFormat}
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
