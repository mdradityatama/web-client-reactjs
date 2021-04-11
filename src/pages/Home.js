import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

import { isAuthentication, getProductsAPI } from '../config/redux/action';

import Layout from '../components/Layout';
import CardProduct from '../components/CardProduct';

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
      <>
        <Layout />
        <Container>
          <h2 className="text-center mb-5">Products</h2>
          
          <Row>
            {products.length > 0 ? (
              <>
                {products.map((product) => {
                  return (
                    <Col lg={3} md={4} className="flex-wrap">
                      <CardProduct 
                        id={product.id} 
                        picture={product.picture} 
                        name={product.name} 
                        description={product.description} 
                        product={product}
                        />
                    </Col>
                  )
                })}
              </>
            ) : null} 
          </Row>
      </Container>
      </>
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