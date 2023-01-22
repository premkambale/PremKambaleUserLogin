import './App.css';
import { useMemo, useState , useContext } from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import userContext from "./context/UserContext";

function App() {

  const {user} =useContext(userContext);

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={user !== null ? <Dashboard /> : <Login />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;








