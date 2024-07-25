import './App.css';
// import '../node_modules/semantic-ui-react';
// import Navbar from '../node_modules/semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import { AuthProvider } from './context/Auth'; 
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute'
import TaskPage from './components/TaskPage'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/tasks" element={<PrivateRoute><TaskPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
