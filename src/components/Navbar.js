// import React from "react";
// import { NavLink, useHistory } from "react-router-dom";

// const linkStyles = {
//   width: "100px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "blue",
//   textDecoration: "none",
//   color: "white",
// };

// function Navbar({ setIsLoggedIn }) {
//   const history = useHistory();

//   function handleLogout() {
//     setIsLoggedIn(false);
//     history.push("/login");
//   }

//   return (
//     <div>
//       <NavLink
//         to="/"
//         /* set exact so it knows to only set activeStyle when route is deeply equal to link */
//         exact
//         /* add styling to Navlink */
//         style={linkStyles}
//         /* add prop for activeStyle */
//         activeStyle={{
//           background: "darkblue",
//         }}
//       >
//         Home
//       </NavLink>
//       <NavLink
//         to="/about"
//         exact
//         style={linkStyles}
//         activeStyle={{
//           background: "darkblue",
//         }}
//       >
//         About
//       </NavLink>
//       <NavLink
//         to="/login"
//         exact
//         style={linkStyles}
//         activeStyle={{
//           background: "darkblue",
//         }}
//       >
//         Login
//       </NavLink>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Navbar;

import { useHistory, Redirect } from "react-router-dom";
import {useState} from 'react'

function NavBar({ onLogout }) {
  const history = useHistory();

  function handleClick() {
    // logout the user
    onLogout();
    // then navigate them to the login page
    history.push("/login");
  }

  function Login({ onLogin }) {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    function handleChange(e) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((user) => {
          onLogin(user);
          // after logging the user in, redirect to the home page!
          history.push("/home");
        });
    }

    function Home({ isSignedIn }) {
      // if the user isn't signed in, redirect them to the login page
      if (!isSignedIn) return <Redirect to="/login" />;

      // otherwise, return the home page
      return (
        <div>
          <h1>Home!</h1>
        </div>
      );
    }

  return (
    <div>
      <nav>
      <button onClick={handleClick}>Logout</button>
    </nav>
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />
    <button type="submit">Login</button>
  </form>


    </div>
  )

}
}

export default NavBar
