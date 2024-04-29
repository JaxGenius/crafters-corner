import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from '../components/ProductComponent';

async function getCartByUserId(userId) {
  // Fetching the cart by user ID
  console.log(userId);
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
    console.log(id);
  
    useEffect(() => {
      getCartByUserId(id).then(data => {
        console.log(data);
        setCart(data);
        if (Array.isArray(data.products)) {
          // data.products is an array of product IDs, so you can pass each ID directly to getProductById
          Promise.all(data.products.map(productId => getProductById(productId)))
            .then(productsData => setProducts(productsData));
        }
      });
    }, [id]);
  
    if (!cart) {
      return <div>Loading...</div>;
    }
  
    if (!Array.isArray(cart.products) || cart.products.length === 0) {
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
          {products.map((product, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <ProductComponent product={product} />
            </Col>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;