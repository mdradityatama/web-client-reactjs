import { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { registerUserAPI } from '../config/redux/action';

class Register extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    message: "",
    error: null
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
    const {name, username, password} = this.state;
    const { history } = this.props;

    try {
      const response = await this.props.registerUserAPI({name, username, password});

      this.setState({
        name: "",
        username: "",
        password: ""
      })

      setTimeout(() => this.setState({message: response}), 3000);
    } catch (error) {
      this.setState({error: Object.values(error.message)});
    }
  }

  render() {
    const {name, username, password, message, error} = this.state;

    return(
      <div className="container">
        <div className="form-login">
          <h2 className="text-center">Register</h2>

          { message !== "" ? (
              <Alert variant={'success'}> {message} </Alert>
            ) : "" }

          { error !== null ? (
              <Alert variant={'danger'}> {error.map(value => (
                <ul>
                  <li>{value}</li>
                </ul>
              ))} </Alert>
            ) : "" }

          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                name="name"
                type="text" 
                placeholder="Name" 
                onChange={this.handleInputChange}
                value={name}
                />
            </Form.Group>

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
            <Link to="/login">Login</Link>
          </div>

        </div>
      </div>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading
});

const reduxDispatch = (dispatch) => ({
  registerUserAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);