import { Dispatch } from "react";

export interface Task {
    _id: string,
    title: string,
    description: string,
    status: string,
    priority: number,
    dueDate: string,
    userId: string
}

// Define types for authentication state
export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  tasks: Task[];
}

// Define action types
export type AuthAction =
  | { type: "LOGOUT_REQUEST" }
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: {token: string, user: any} }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS" }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "TASK_REQUEST" }
  | { type: "TASK_SUCCESS"; payload: { tasks: any[] } } // Replace `any[]` with `Task[]`
  | { type: "TASK_FAILURE"; payload: string };

  export interface AuthContextType {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
  }
  