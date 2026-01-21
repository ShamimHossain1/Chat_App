import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate.jsx';
import Login from './pages/Login/login';
import Chat from './pages/Chat/Chat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <ToastContainer autoClose={1500} position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/logout" element={<Logout />} /> */}


      </Routes>
    </>
  );
};

export default App;