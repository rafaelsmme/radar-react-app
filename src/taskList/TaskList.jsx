import TaskView from "./TaskView";

function TaskList({ tasks }) {
  return (
    <>
      {tasks.map((item) => (
        <div className="col-sm-3" key={item.id}>
          <TaskView task={item} />
        </div>
      ))}
    </>
  );
}

export default TaskList;
