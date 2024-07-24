import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Forget from "./components/Authentication/Forget";
import Home from "./components/Home";
import Search from "./components/Search";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Authentication />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
