// src/App.js
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './pages/NavBar';
import Footer from './pages/Footer';
import Home from './pages/opening/Opening';
import Plus from './pages/plus/Plus';
import AboutPage from './pages/about/AboutPage';
import SignUp from './pages/signup/SignUp';
import PageNotFound from './pages/PageNotFound';
import SupportPage from './pages/support/SupportPage';
import HomePage from './pages/home/HomePage';
import PostDetails from './pages/Post/PostDetails';
import AddNewPost from './pages/Post/AddNewPost';
import Profile from './pages/userProfile/Profile';
import { AuthProvider } from './pages/signup/AuthContext';

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/signup';

  return (
    <AuthProvider>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<AboutPage />} />
        <Route path="/plus" element={<Plus />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/create" element={<AddNewPost />} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>

      {!hideNavAndFooter && <Footer />}
      <ToastContainer position="top-center" />
    </AuthProvider>
  );
}

export default App;
