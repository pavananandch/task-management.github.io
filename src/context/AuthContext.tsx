import { createContext, useReducer, ReactNode } from "react";
import { getData } from "../utils/storage";
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_FAILURE, REGISTER_SUCCESS, TASK_FAILURE, TASK_REQUEST, TASK_SUCCESS, LOGOUT_REQUEST } from "../utils/constants";
import { AuthAction, AuthContextType, AuthState } from "../types/tasks";

// Initial state
const initialState: AuthState = {
  isAuthenticated: !!getData("token"),
  user: null,
  token: getData("token"),
  loading: false,
  error: null,
  tasks: [],
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case TASK_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, token: action.payload.token, user: action.payload.user };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };
    case TASK_SUCCESS:
      return { ...state, loading: false, tasks: action.payload.tasks };
    case LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
