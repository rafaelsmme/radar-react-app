import Task from "./Task";

function TaskList({ tasks }) {
  return (
    <>
      {tasks.map((item) => (
        <div className="col-sm-3" key={item.id}>
          <Task task={item} />
        </div>
      ))}
    </>
  );
}

export default TaskList;
