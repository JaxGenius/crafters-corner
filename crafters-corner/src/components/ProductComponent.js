import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

// async function to add product to cart
async function addToCart(userID, productId, isLoggedIn, setInCart) {
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
    setInCart(true);
  }
}

// async function to check if product is in cart
async function checkInCart(userID, productId) {
  const response = await fetch(`http://localhost:4000/cart/check/${userID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: productId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.inCart;
}

// async function to remove product from cart
async function removeFromCart(userID, productId, setInCart) {
  const response = await fetch(`http://localhost:4000/cart/remove/${userID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product: productId }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    alert('Product removed from cart');
    setInCart(false); // update inCart status
  }
}

function ProductComponent({ product }) {
  const navigate = useNavigate();
  const { isLoggedIn, userID } = useContext(AppContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      checkInCart(userID, product._id)
        .then(setInCart)
        .catch(console.error);
    }
  }, [isLoggedIn, userID, product._id]);

return (
  <Card bg="light" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={"/" + product.imgSrc} alt={product.name} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>
        Price: £{product.price}
      </Card.Text>
      {product.sold ? (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>SOLD</div>
      ) : (
        inCart ? (
          <Button variant="danger" onClick={() => removeFromCart(userID, product._id, setInCart)}>Remove from Cart</Button>
        ) : (
          <Button variant="primary" onClick={() => addToCart(userID, product._id, isLoggedIn, setInCart)}>Add to Cart</Button>
        )
      )}
      <Button variant="secondary" onClick={() => navigate(`/product/${product._id}`)}>View Product</Button>
    </Card.Body>
  </Card>
);
}

ProductComponent.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sold: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductComponent;