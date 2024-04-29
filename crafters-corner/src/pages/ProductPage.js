import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


// async function to get product by id
async function getProduct(id) {
  const response = await fetch(`http://localhost:4000/products/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const product = await response.json();
  return product;
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center" style={{ width: '24rem' }}>
        <Card.Img variant="top" src={"/"+product.imgSrc} alt={product.name} />
        <Card.Body>
          <Card.Title className="display-4">{product.name}</Card.Title>
          <Card.Text className="lead">
            Price: {product.price}
            <br />
            Description: {product.description}
            <br />
            Category: {product.category}
            <br />
            Tags: {product.tags.join(', ')}
          </Card.Text>
          <Button variant="primary" size="lg">Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductPage;