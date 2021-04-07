import { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import { isAuthentication } from '../config/redux/action';

import Layout from '../components/Layout';

class Profile extends Component {
  state = {
    user: []
  }

  async componentDidMount()  {
    const { history } = this.props;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      
      this.props.isAuthentication(currentUser.token)
        .then(response => {
          this.loadProfile(response)
        })
        .catch(error => {
          localStorage.removeItem('currentUser');
          history.push('/login');
        });
    }
    else {
      history.push('/login');
    }
  }

  loadProfile(data) {
    this.setState({user: data})
  }

  render() {
    const { name, email, username, phone } = this.state.user
    return(
      <Layout>
        <h2 className="text-center">Profile</h2>
        <Card>
          <Card.Body>
            <ol>
              <li>Name : {name}</li>
              <li>Email : {email}</li>
              <li>Username : {username}</li>
              <li>Phone : {phone}</li>
            </ol>
          </Card.Body>
        </Card>
      </Layout>
    )
  }
}

const reduxState = (state) => ({
  user: state.user
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
});

export default connect(reduxState, reduxDispatch)(Profile);