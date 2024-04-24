import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./components/SignUp";
import TeslaAccount from "./components/TeslaAccount";
import { login, logout, selectUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

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
          <Route
            exact
            path="/teslaaccount"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <>
                  <TeslaAccount
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                  />
                  {isMenuOpen && <Menu />}
                </>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
