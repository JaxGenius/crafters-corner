import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ProductComponent from '../components/ProductComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SearchResults() {
  const location = useLocation();
  const results = location.state.results;
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col>
          <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
          <div className="mt-5"></div>
          <h1>Search Results</h1>
          <div className="mt-5"></div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </Col>
      </Row>
      <div className="mt-5"></div>
      <Row>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <ProductComponent product={result} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No results found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchResults;