import FormLogin from "./pages/Login"
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    token: ""
  });

  const [error, setError] = useState("");
  
  const handleLogin = data => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      const { token } = response;
      const { name, username, email, phone } = response.user; 

      if (token != null) {
        setAuth({
          ...auth,
          name,
          username,
          email,
          phone,
          token
        })
      }
      else {
        setError(response);
      }
    })
    .catch(error => console.log(error))
  }

  const handleLogout = () => {
    setAuth({
      name: "",
      username: "",
      email: "",
      phone: "",
      token: ""
    });
  }

  return (
    <div className="App">
      {(auth.name !== "") ? (
        <div className="welcome">
          <h2>Welcome, {auth.name}</h2>
            <ol>
              <li>{auth.name}</li>
              <li>{auth.username}</li>
              <li>{auth.email}</li>
              <li>{auth.phone}</li>
              <li>{auth.token}</li>
            </ol>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <FormLogin handleLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

export default App;
