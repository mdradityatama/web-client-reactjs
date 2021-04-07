import React, { Component } from 'react';
import { Container, Nav, NavDropdown } from "react-bootstrap";

class Layout extends Component {

  render() {
    return (
      <Container>
        <h1 className="text-center mt-5 mb-5">Jasa Titip Layout</h1>

        <Nav 
          className="justify-content-center mb-5" 
          activeKey="link-1"
          >
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/orders">Orders</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Settings" id="nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {this.props.children}
      </Container>
    )
  }
}

export default Layout;