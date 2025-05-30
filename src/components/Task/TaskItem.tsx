import { Card } from "react-bootstrap";

const TaskItem = ({ title, description, priority, dueDate, status, handleEdit, handleDelete }) => {
  return (
    <>
      <Card className="text-start w-25">
        <Card.Title className="w-100">{title}</Card.Title>
        <Card.Text>
          <span className="material-symbols-outlined edit-icon" onClick={handleEdit}>edit</span>
          <span className="material-symbols-outlined remove-icon" onClick={handleDelete}>delete</span>
          {description}
          <div className="d-line flex-start">{priority}</div>
          <div className="d-line flex-end">{dueDate}</div>
          <div>{status}</div>
        </Card.Text>
      </Card>
    </>
  );
};

export default TaskItem;
