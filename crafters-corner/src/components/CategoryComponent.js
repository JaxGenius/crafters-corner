import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then(response => response.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleCategoryClick = async (category) => {
    const response = await fetch(`http://localhost:4000/search/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      navigate('/results', { state: { results: data } });
    } else {
      if (response.status === 404) {
        alert('No results found for this category!');
      } else {
        console.log('Search failed!');
      }
    }
  }

  return (
    <Container>
      <h1>Categories</h1>
      <Row>
        {categories.map((category, index) => (
          <Col sm={6} md={4} lg={3} key={index}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{category}</Card.Title>
                <Button variant="primary" onClick={() => handleCategoryClick(category)}>View Products</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryComponent;