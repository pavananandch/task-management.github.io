import { getData } from "../utils/storage";
import { baseUrl } from "./auth"

export const getAllTasks = async() => {
    try {
        const {_id} = JSON.parse(getData('user'));
        const response = await fetch(`${baseUrl}/tasks/?userId=${_id}`, {
            headers: {
                Authorization: `Bearer ${getData('token')}`
            }
        });
        if(!response.ok) {
            new Error("something went wrong try again");
        }
        return response;
    } catch (error) {
        return error as Response;
    }
}

export const createTask = async(payload) => {
    try {
        const response = await fetch(`${baseUrl}/tasks`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getData('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok) {
            new Error("something went wrong try again");
        }
        return response;
    } catch (error) {
        return error as Response;
    }
}

export const updateTaskById = async(payload) => {
    try {
        const response = await fetch(`${baseUrl}/tasks/${payload._id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${getData('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok) {
            new Error("something went wrong try again");
        }
        return response;
    } catch (error) {
        return error as Response;
    }
}

export const deleteTaskById = async(id) => {
    try {
        const response = await fetch(`${baseUrl}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${getData('token')}`,
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            new Error("something went wrong try again");
        }
        return response;
    } catch (error) {
        return error as Response;
    }
}