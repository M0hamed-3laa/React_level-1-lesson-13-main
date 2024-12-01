import React from "react";
import { Link, NavLink } from "react-router-dom";

// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);

  if (user) {
    return (
      <div>
        <header
          className="hide-when-mobile"
          style={{
            background: "teal",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <h1 style={{ width: "5%" }}>
            <Link to={"/"} className="logo">
              c4a.dev
            </Link>
          </h1>

          {/* <button
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="theme-btn">
          {theme}
        </button> */}
          {theme === "Light" ? (
            <>
              <i
                onClick={() => {
                  toggleTheme(theme === "Light" ? "Dark" : "Light");
                }}
                className="fa-solid fa-moon"></i>
            </>
          ) : (
            <>
              <i
                onClick={() => {
                  toggleTheme(theme === "Light" ? "Dark" : "Light");
                }}
                className="fa-solid fa-sun"></i>{" "}
            </>
          )}
          <ul className="flex">
            {!user && (
              <>
                <li className="main-list">
                  <NavLink className="main-link" to="/signin">
                    Sign-in
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/signup">
                    Sign-up
                  </NavLink>
                </li>
              </>
            )}

            {user && (
              <>
                <li
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        console.log("Sign-out successful.");
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                  className="main-list">
                  <button className="main-link signout">Sign-out</button>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/about">
                    About
                  </NavLink>
                </li>

                <li className="main-list">
                  <NavLink className="main-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </header>
      </div>
    );
  }
};

export default Header;
