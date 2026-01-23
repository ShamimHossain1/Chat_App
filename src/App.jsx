import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate.jsx";
import Login from "./pages/Login/login";
import Chat from "./pages/Chat/Chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.js";
import { AppContext } from "./context/AppContext.jsx";

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user);
        await loadUserData(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [loadUserData, navigate]);
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
