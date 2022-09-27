import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import SignUpPage from "./pages/SignUpPage";
import PrivateRoute from "./helper/PrivateRoute";
import PublicRoute from "./helper/PublicRoute";
function App() {
  const withPrivacy = (component) => {
    return <PrivateRoute component={component} />;
  };

  const withoutPrivacy = (component) => {
    return <PublicRoute component={component} />;
  };

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-left" autoClose="1000" />
      <Routes>
        <Route path="/login" element={withoutPrivacy(LoginPage)} />
        <Route path="/signup" element={withoutPrivacy(SignUpPage)} />
        <Route path="/home" element={withPrivacy(MainLayout)} />
        <Route path="*" element={withPrivacy(MainLayout)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
