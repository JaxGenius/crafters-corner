import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

// async function to add product to cart
async function addToCart(userID, productId, isLoggedIn) {
  if (!isLoggedIn) {
    alert('You must be logged in to do that.');
    return;
  }

  const response = await fetch(`http://localhost:4000/cart/update/${userID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: productId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    alert('Product added to cart');
  }
}

function ProductComponent({ product }) {
  const navigate = useNavigate();
  const { isLoggedIn, userID } = useContext(AppContext);

  return (
    <Card bg="light" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.imgSrc} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Price: {product.price}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/product/${product._id}`)}>View Product</Button> {/* need to add product page functionality */}
        <Button variant="secondary" onClick={() => {addToCart(userID, product._id, isLoggedIn)}}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

ProductComponent.propTypes = {
  product: PropTypes.shape({
    sold: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductComponent;