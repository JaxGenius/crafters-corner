import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

async function getCartByUserId(userId) {
  // Fetching the cart by user ID
  return fetch(`http://localhost:4000/cart/${userId}`).then(response => response.json());
}

async function getProductById(productId) {
  // Fetching the product by its ID
  return fetch(`http://localhost:4000/products/${productId}`).then(response => response.json());
}

function CartPage() {
    const { id } = useParams();
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      getCartByUserId(id).then(data => {
        setCart(data);
        if (Array.isArray(data.items)) {
          Promise.all(data.items.map(item => getProductById(item.product))).then(productsData => setProducts(productsData));
        }
      });
    }, [id]);
  
    if (!cart) {
      return <div>Loading...</div>;
    }
  
    if (!Array.isArray(cart.items) || cart.items.length === 0) {
      return (
        <Container>
          <Row>
            <Col>
              <h1>Your Cart</h1>
              <p>Your cart is currently empty.</p>
            </Col>
          </Row>
        </Container>
      );
    }
  
    return (
      <Container>
        <Row>
          <Col>
            <h1>Your Cart</h1>
          </Col>
        </Row>
        <Row>
          {products.map((product, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>Quantity: {cart.items[index].quantity}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
}

export default CartPage;