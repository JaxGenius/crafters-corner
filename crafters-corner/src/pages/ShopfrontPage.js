import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from '../components/ProductComponent';

async function getShopfrontByUserId(userId) {
    // Fetching shopfront data for a specific user
  return fetch(`http://localhost:4000/shopfront/${userId}`).then(response => response.json());
}

async function getProductsByShopfrontId(shopfrontId) {
  // Fetching all products for a specific shopfront
  return fetch(`http://localhost:4000/products/shopfront/${shopfrontId}`).then(response => response.json());
}

function ShopfrontPage() {
  const { userId } = useParams();
  const [shopfront, setShopfront] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getShopfrontByUserId(userId).then(data => {
      setShopfront(data);
      getProductsByShopfrontId(data._id).then(productsData => setProducts(productsData));
    });
  }, [userId]);

  if (!shopfront) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{shopfront.ownerName}'s Shopfront</h1>
          <h2>{shopfront.description}</h2>
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index}>
            <ProductComponent product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ShopfrontPage;