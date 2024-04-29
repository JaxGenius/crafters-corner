import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from '../components/ProductComponent';
import { AppContext } from '../AppContext';

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
  const { balance } = useContext(AppContext);
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
    return (
      <div className="position-relative">
        <Link to="/" className="position-absolute top-0 start-0 p-3"><img src="/logo.png" alt="Logo" /></Link>
        <div>Loading...</div>
      </div>
    );
  }

  if (!Array.isArray(cart.products) || cart.products.length === 0) {
    return (
      <div className="position-relative">
        <Link to="/" className="position-absolute top-0 start-0 p-3"><img src="/logo.png" alt="Logo" /></Link>
        <div className="card text-center ml-3">
          <div className="card-body">
            <h5 className="card-title">Balance</h5>
            <p className="card-text">£{balance}</p>
          </div>
        </div>
        <Container>
          <Row>
            <Col>
              <h1>Your Cart</h1>
              <p>Your cart is currently empty.</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="position-relative">
        <div className="card text-center ml-3">
          <div className="card-body">
            <h5 className="card-title">Balance</h5>
            <p className="card-text">£{balance}</p>
          </div>
        </div>
    <Link to="/" className="position-absolute top-0 start-0 p-3"><img src="/logo.png" alt="Logo" /></Link>
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
    </div>
  );
}

export default CartPage;