import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { isAuthentication, getProductsAPI } from '../config/redux/action';

import Layout from '../components/Layout';
import CardProduct from '../components/CardProduct';
import { Row } from "react-bootstrap";

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount()  {
    const { history } = this.props;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      
      this.props.isAuthentication(currentUser.token)
        .then(response => {
          this.laodProducts(response.token)
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

  async laodProducts(token) {
    const dataProducts = await this.props.getProductsAPI(token)

    this.setState({products: dataProducts});
  }

  render() {
    const { products } = this.state

    return(
      <Layout props={this.props}>
        <h2 className="text-center">Products</h2>
        
        <Row>
          {products.length > 0 ? (
            <Fragment>
              {products.map((product) => {
                return (
                  <CardProduct 
                    id={product.id} 
                    picture={product.picture} 
                    name={product.name} 
                    description={product.description} 
                    />
                )
              })}
            </Fragment>
          ) : null} 
        </Row>
      </Layout>
    )
  }
}

const reduxState = (state) => ({
  user: state.user
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
  getProductsAPI: (data) => dispatch(getProductsAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Home);