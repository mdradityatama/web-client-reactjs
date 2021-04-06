import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./config/redux/store";

import Auth from "./Auth/AuthApp";
import Unauth from "./Auth/UnauthApp";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {

  const [user, setUser] = useState({
    auth: false,
    name: "",
    username: "",
    email: "",
    phone: "",
    token: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = localStorage.getItem('currentUser');

    if (getUser != null) {
      setUser(JSON.parse(getUser))
    }

    console.log('currentUser: ', user);
  }, [])

  const handleLogin = data => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      const { token } = response;

      if (token != null) {
        const { name, username, email, phone } = response.user; 

        setUser({
          ...user,
          auth: true,
          name,
          username,
          email,
          phone,
          token
        })

        localStorage.setItem('currentUser', JSON.stringify({
          auth: true,
          name,
          username,
          email,
          phone,
          token
        }));
      }
      else {
        setError(response);
      }
    })
    .catch(error => console.log(error))
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
  }

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
