import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Nav, NavDropdown } from "react-bootstrap";

import { isAuthentication } from '../config/redux/action';

class Home extends Component {

  async componentDidMount()  {
    const { history } = this.props;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      
      this.props.isAuthentication(currentUser.token)
        .then()
        .catch(error => {
          localStorage.removeItem('currentUser');
          history.push('/login');
        });
    }
    else {
      history.push('/login');
    }
  }

  render() {
    return(
      <Container>
        <h1 className="text-center mt-5 mb-5">Jasa Titip</h1>

        <Nav className="justify-content-center" activeKey="link-1">
          <Nav.Item>
            <Nav.Link eventKey="">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Orders</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Settings" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.2">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    )
  }
}

const reduxState = (state) => ({
  user: state.user
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
});

export default connect(reduxState, reduxDispatch)(Home);