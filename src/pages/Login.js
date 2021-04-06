import React, { Component } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { loginUserAPI } from '../config/redux/action';

import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  }

  componentDidMount() {
    const { history } = this.props;

    if (localStorage.getItem('currentUser') != null) {
      history.push('/');
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async e =>  {
    e.preventDefault()
    const {username, password} = this.state;
    const { history } = this.props;

    try {
      await this.props.loginAPI({username, password});

      this.setState({
        username: "",
        password: ""
      })

      history.push('/');
    } catch (error) {
      this.setState({ error });

      setTimeout(() => this.setState({error : ""}), 3000);
    }
  }

  render() {
    const {username, password, error} = this.state;

    return (
      <div className="container-unauth">
        <div className="form-login">
          <h2 className="text-center">Login</h2>
          <Form onSubmit={this.handleSubmit}>

            { error !== "" ? (
              <Alert variant={'danger'}> {error} </Alert>
            ) : ""}

            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                name="username"
                type="text" 
                placeholder="username" 
                onChange={this.handleInputChange}
                value={username}
                />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                name="password"
                type="password" 
                placeholder="Password" 
                onChange={this.handleInputChange}
                value={password}
                />
            </Form.Group>
             
            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
          
          <hr />

          <div className="register">
            <Link to="/register">Register</Link>
          </div>

        </div>
      </div>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
  isLogin: state.isLogin
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);