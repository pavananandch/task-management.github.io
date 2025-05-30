import { useEffect } from "react";
import { Task } from "../../types/tasks";
import TaskItem from "./TaskItem";

const TaskList = ({tasks, handleEdit, handleDelete}) => {
    useEffect(() => {
        console.log({tasks})
    })
    return (
        <>
            {
                tasks.map((task: Task) => (
                    <TaskItem key={task._id} {...task}  handleDelete={() => handleDelete(task)}  handleEdit={() => handleEdit(task)} />
                ))
            }
        </>
    )
}

export default TaskList;