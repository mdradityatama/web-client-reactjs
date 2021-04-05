import react, { useState } from "react";
import { Col, Container, Row, Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleSubmit}>
        {(error)}
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
    )
}

export default Login;