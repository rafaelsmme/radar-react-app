import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import config from "globalConfig.json";
import addDays from "date-fns/addDays";

function NewTaskForm({ onSubmit }) {
  const [label, setLabel] = useState("");
  const [period, setPeriod] = useState(7);
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();

  const changeStartDateChangeHandler = (date) => {
    setStartDate(date);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const newTask = {
      label,
      period,
      startDate: format(startDate, config.dateFormat),
      last: null,
      next: format(addDays(startDate, period), config.dateFormat),
    };
    onSubmit(newTask);
    history.push("/");
  };

  return (
    <div className="col-4">
      <div className="card">
        <form onSubmit={formSubmitHandler}>
          <h4 className="card-header">New Task</h4>
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
              <label htmlFor="label" className="form-label">
                Start Date
              </label>
              <ReactDatePicker
                selected={startDate}
                className="form-control"
                dateFormat={config.dateFormat}
                onChange={changeStartDateChangeHandler}
                required
              />
              <div
                className="form-text text-muted"
                style={{ fontSize: "12px" }}
              >
                The last day you executed this task
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskForm;
