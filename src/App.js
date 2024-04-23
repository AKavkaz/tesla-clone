import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu";
import HeaderBlock from "./components/HeaderBlock";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import SignUp from "./components/SignUp";

function App() {
  const user = useSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {isMenuOpen && <Menu />}
                <HeaderBlock />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/teslaaccount" /> : <Login />}
          />
          <Route exact path="/signup" element={<SignUp />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
