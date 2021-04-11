import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { addProductToCart } from '../config/redux/action';

function CardProduct({ id, name, description, picture, product }) {

  const addProduct = data => {
    console.log(data);

    // this.props.addProductToCart()
  }

  return (
    <Card id={id} className="mr-3 mb-3">
      <div style={{
        height: '200px', 
        backgroundColor: '#eaeaea',
        backgroundImage: `url(${picture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        <Card.Text>
          { description }
        </Card.Text>
        <Button 
          variant="primary"
          onClick={addProduct(product)}
          >Add Product</Button>
      </Card.Body>
    </Card>
  )
}

const reduxState = (state) => ({
  
});

const reduxDispatch = (dispatch) => ({
  addProductToCart: (data) => dispatch(addProductToCart(data)),
});

export default connect(reduxState, reduxDispatch)(CardProduct);