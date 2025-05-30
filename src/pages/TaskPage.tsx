import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { createTask, deleteTaskById, getAllTasks, updateTaskById } from "../api/task.service";
import TaskList from "../components/Task/TaskList";
import TaskModal from "../components/Task/TaskModal";
import { getData } from "../utils/storage";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getTasks();
  }, []);

  const handleCreate = () => {
    setIsEdit(false);
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedTask(null);
  };

  const getTasks = async () => {
    try {
      // dispatch({type: TASK_REQUEST});
      const response = await getAllTasks();
      const { tasks } = await response.json();
      console.log(tasks);
      setTasks(tasks);
      // dispatch({type: TASK_SUCCESS, payload: data});
    } catch (error) {
      console.log(error);
      setTasks([]);
      // dispatch({type: TASK_FAILURE, payload: error});
    }
  };

  const handleEdit = (task) => {
    setIsEdit(true);
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (payload) => {
    try {
        console.log({payload});
        
        const response = await deleteTaskById(payload._id);
        await response.json();
        getTasks();
    } catch (error) {
        console.log({error});
        
    }
  }

  const handleSubmit = (payload) => {
    if (isEdit) {
      updateTask(payload);
    } else {
      createNewTask(payload);
    }
  };
  const createNewTask = async (payload) => {
    try {
      const { _id } = JSON.parse(getData("user"));
      const input = {
        ...payload,
        userId: _id,
      };
      const response = await createTask(input);
      if (!response.ok) {
        new Error();
      }
      const data = await response.json();
      console.log({ data });
      getTasks();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (payload) => {
    try {
      const { _id } = JSON.parse(getData("user"));
      const input = {
        ...payload,
        userId: _id,
      };
      const response = await updateTaskById(input);
      if (!response.ok) {
        new Error();
      }
      const data = await response.json();
      console.log({ data });
      getTasks();
      handleCloseModal();
      setIsEdit(false);
      setSelectedTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="task-page">
        <div className="create-container w-100 text-end">
          <Button onClick={handleCreate}>Create +</Button>
        </div>
            <TaskList tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      {showModal && <TaskModal
        showModal={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        selectedTask={selectedTask}
      />}
    </>
  );
};

export default TaskPage;
