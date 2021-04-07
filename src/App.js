import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./config/redux/store";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/register" exact component={RegisterPage}/>
          <Route path="/orders" exact component={Orders}/>
          <Route path="/profile" exact component={Profile}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
