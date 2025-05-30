import { Navigate, Outlet, Route, Routes } from 'react-router';
import './App.css'
import RegisterPage from './pages/RegisterPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import Layout from './components/Layout/Layout';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {state, setState} = useContext(AuthContext);
  const isAuthenticated = state.isAuthenticated;
  const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }
  return (
    <>
    <Layout>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
      </Layout>
    </>
  )
}

export default App
