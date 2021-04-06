import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return(
      <h1>Hallo</h1>
    )
  }
}

const reduxState = (state) => 
{
  console.log(state)
};

const reduxDispatch = (dispatch) => ({
});

export default connect(reduxState, reduxDispatch)(Home);