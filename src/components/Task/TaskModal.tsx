import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getData } from "../../utils/storage";
import moment from "moment";

const TaskModal = ({
  showModal,
  handleClose,
  handleSubmit,
  isEdit,
  selectedTask
}) => {
  useEffect(() => {
    console.log(selectedTask, isEdit)
    if(selectedTask && isEdit) {
      console.log("inside udpate");
      updateForm();
    }
    return () => {
      console.log("modal unmounted");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(0);
  const [dueDate, setDuedate] = useState("");
  
  const updateForm = () => {
    setTitle(selectedTask.title);
    setDescription(selectedTask.description);
    setStatus(selectedTask.status);    
    const formattedDate = moment(selectedTask.dueDate).format('YYYY-MM-DD');    
    setDuedate(formattedDate);
    setPriority(selectedTask.priority);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleDueDateChange = (event) => {
    setDuedate(event.target.value);
  };

  const handleSave = () => {
    const { _id } = JSON.parse(getData("user"));
    const payload = {
      title,
      description,
      status,
      priority: Number(priority),
      dueDate,
      userId: _id,
    };
    if(selectedTask && isEdit) {
      payload['_id'] = selectedTask._id;
    }
    handleSubmit(payload);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Task" : "Create Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task Title"
                onChange={handleTitleChange}
                value={title}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={handleDescriptionChange}
                value={description}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 w-50 d-line float-start"
              controlId="status"
            >
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={handleStatusChange} value={status}>
                <option value="ToDo">ToDo</option>
                <option value="Inprogress">Inprogress</option>
                <option value="OnHold">OnHold</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3 w-40 d-line float-end"
              controlId="priority"
            >
              <Form.Label>Priority</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter priority"
                onChange={handlePriorityChange}
                value={priority}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="enter due date"
                onChange={handleDueDateChange}
                value={dueDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskModal;
