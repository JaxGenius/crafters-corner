import React, { useState, useEffect } from 'react'; // Importing necessary modules from React
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import Card from 'react-bootstrap/Card'; // Importing the Card component from react-bootstrap
import Button from 'react-bootstrap/Button'; // Importing the Button component from react-bootstrap
import Container from 'react-bootstrap/Container'; // Importing the Container component from react-bootstrap
import Row from 'react-bootstrap/Row'; // Importing the Row component from react-bootstrap
import Col from 'react-bootstrap/Col'; // Importing the Col component from react-bootstrap

function CategoryComponent() {
  const [categories, setCategories] = useState([]); // Initializing a state variable 'categories' using useState hook
  const navigate = useNavigate(); // Initializing the navigate function using useNavigate hook

  useEffect(() => {
    // useEffect hook to fetch categories from the server when the component mounts
    fetch('http://localhost:4000/categories') // Sending a GET request to 'http://localhost:4000/categories'
      .then(response => response.json()) // Parsing the response as JSON
      .then(setCategories) // Updating the 'categories' state with the fetched data
      .catch(console.error); // Handling any errors that occur during the fetch
  }, []);

  const handleCategoryClick = async (category) => {
    // Function to handle category click event
    const response = await fetch(`http://localhost:4000/search/${category}`, {
      // Sending a GET request to 'http://localhost:4000/search/{category}'
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // If the response is successful (status code 200)
      const data = await response.json(); // Parsing the response as JSON
      navigate('/results', { state: { results: data } }); // Navigating to '/results' page with the fetched data
    } else {
      if (response.status === 404) {
        // If the response status is 404 (Not Found)
        alert('No results found for this category!'); // Displaying an alert message
      } else {
        console.log('Search failed!'); // Logging an error message to the console
      }
    }
  }

  return (
    <Container>
      <h1>Categories</h1> {/* Heading */}
      <Row>
        {categories.map((category, index) => (
          // Mapping over the 'categories' array and rendering a Card component for each category
          <Col sm={6} md={4} lg={3} key={index}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{category}</Card.Title> {/* Displaying the category name */}
                <Button variant="primary" onClick={() => handleCategoryClick(category)}>View Products</Button> {/* Button to view products */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryComponent; // Exporting the CategoryComponent as the default export
