import { Component } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { isAuthentication } from '../config/redux/action';

import Layout from '../components/Layout';

class Profile extends Component {
  componentDidMount()  {
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
    const logout = () => {
      const { history } = this.props;
  
      localStorage.removeItem('currentUser');
  
      history.push('/login');
    }

    const { name, email, username, phone } = this.props.user
    const { isAdmin } = this.props

    return(
      <>
        <Layout />
        <Container>
          <h2 className="text-center">Profile</h2>
          
          <Card>
            <Card.Body>
              <ol>
                <li>Name : {name}</li>
                <li>Email : {email}</li>
                <li>Username : {username}</li>
                <li>Phone : {phone}</li>
                {isAdmin ? <li>Roles : Admin</li> : null}
              </ol>

              <Button onClick={logout}>Logout</Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    )
  }
}

const reduxState = (state) => ({
  user: state.user,
  isAdmin : state.isAdmin
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
});

export default connect(reduxState, reduxDispatch)(Profile);