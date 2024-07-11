import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Admin_home from "./Pages/Admin_home";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <PersistGate loading={null} persistStore={persist}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Admin_home" element={<Admin_home />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
