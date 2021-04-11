import React, { Component } from 'react';
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { isAuthentication } from '../config/redux/action';

class Layout extends Component {
  render() {
    const { isAdmin } = this.props

    return (
      <Container>
        <h1 className="text-center mt-5 mb-5">Jasa Titip</h1>

        <Nav 
          className="justify-content-center mb-5" 
          activeKey="link-1"
          >
          <Nav.Item>
            <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              {isAdmin ? 
                <Link to='/orders'>All Orders</Link> 
              : <Link to='/orders'>Orders</Link>}
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title="Settings" id="nav-dropdown">
            <NavDropdown.Item>
              <Link to="/profile">Profile</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    )
  }
}

const reduxState = (state) => ({
  isAdmin: state.isAdmin,
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
});

export default connect(reduxState, reduxDispatch)(Layout);