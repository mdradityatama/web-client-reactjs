import { useState } from "react";
import { Form, Button } from 'react-bootstrap'

import "./Login.css"

import AlertMessage from "../components/AlertMessage"

function Login({ handleLogin, error}) {
  const [credential, setCredential] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredential({...credential, [e.target.name]: e.target.value})
  }

  const handleSubmit = e =>  {
    e.preventDefault()
    
    handleLogin(credential)
  }

    return (
      <div className="container">
        <div className="form-login">
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>

            {(error !== "" ? (
              <AlertMessage message={error} variant={'danger'} />
            ) : "")}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                name="username"
                type="text" 
                placeholder="username" 
                onChange={handleChange}
                value={credential.username}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                name="password"
                type="password" 
                placeholder="Password" 
                onChange={handleChange}
                value={credential.password}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </div>
      </div>
    )
}

export default Login;