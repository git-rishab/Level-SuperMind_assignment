import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notifications } from '@mantine/notifications';
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Dashboard from "./components/Post";

function App() {

  return (
    <>
      <BrowserRouter>
        <Notifications position='bottom-center' />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
