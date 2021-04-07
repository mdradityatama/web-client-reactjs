import { Card, Button } from "react-bootstrap";

function CardProduct({ id, name, description, picture }) {

  const addProduct = e => {
    console.log(`add ${e.target.id}`)
  }

  return (
    <Card style={{ width: '18rem' }} id={id} className="mr-3">
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        <Card.Text>
          { description }
        </Card.Text>
        <Button 
          variant="primary"
          onClick={addProduct}
          >Add Product</Button>
      </Card.Body>
    </Card>
  )
}

export default CardProduct;