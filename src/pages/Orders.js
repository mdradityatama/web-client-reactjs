import { Component, Fragment } from "react";
import { Container, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { isAuthentication, getOrderByUserAPI, getAllOrdersAPI } from '../config/redux/action';

import Layout from '../components/Layout';

class Orders extends Component {
  state = {
    orders: [],
  }

  async componentDidMount()  {
    const { history } = this.props;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      
      this.props.isAuthentication(currentUser.token)
        .then(response => {
          if (this.props.isAdmin) {
            this.laodAllOrders(response.token)
          } else {
            this.laodOrderByUser(response.token)
          }
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

  async laodOrderByUser(token) {
    const dataOrders = await this.props.getOrderByUserAPI(token)

    this.setState({orders: dataOrders});
  }

  async laodAllOrders(token) {
    const dataOrders = await this.props.getAllOrdersAPI(token)

    this.setState({orders: dataOrders});
  }

  render() {
    const { orders } = this.state

    return(
      <>
        <Layout />
        <Container>
          <h2 className="text-center">Orders</h2>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Order #Id</th>
                <th>User (email)</th>
                <th>Phone</th>
                <th>Products (jumlah)</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                <Fragment>
                  {orders.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.user.name} ({order.user.email})</td>
                        <td>{order.user.phone}</td>
                        <td>
                          {order.order_products.length > 0 ? (
                            <Fragment>
                              <ul>
                                {order.order_products.map((orderProduct) => {
                                  return (
                                      <li>{orderProduct.product.name} ({orderProduct.amount})</li>
                                  )
                                })}
                              </ul>
                            </Fragment>
                          ) : null}
                        </td>
                      </tr>
                    )
                  })}
                </Fragment>
              ) : (     
                <tr>
                  <td colSpan="4" className="text-center">Tidak ada data</td>
                </tr>
              )} 
            </tbody>
          </Table>
        </Container>
      </>
    )
  }
}

const reduxState = (state) => ({
  isAdmin : state.isAdmin,
});

const reduxDispatch = (dispatch) => ({
  isAuthentication: (data) => dispatch(isAuthentication(data)),
  getOrderByUserAPI: (data) => dispatch(getOrderByUserAPI(data)),
  getAllOrdersAPI: (data) => dispatch(getAllOrdersAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Orders);