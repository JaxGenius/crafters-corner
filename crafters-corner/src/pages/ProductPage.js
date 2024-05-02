import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { AppContext } from '../AppContext';
import ImageUploadComponent from '../components/ImageUploadComponent';
import { Modal, Button, Form } from 'react-bootstrap';

// async function to get product by id
async function getProduct(id) {
  const response = await fetch(`http://localhost:4000/products/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const product = await response.json();
  return product;
}

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

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const { userID: currentUser, isLoggedIn } = useContext(AppContext); // use for checking if the current user is the owner of the product

  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    if (isLoggedIn && product) {
      checkInCart(currentUser, product._id)
        .then(setInCart)
        .catch(console.error);
    }
  }, [isLoggedIn, currentUser, product]);


  useEffect(() => {
    getProduct(id)
      .then(product => {
        setProduct(product);
        setEditedProduct({ ...product });
      })
      .catch(console.error);
  }, [id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (event) => {
    setEditedProduct({ ...editedProduct, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/products/update/name/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editedProduct.name }),
    });
    await fetch(`http://localhost:4000/products/update/description/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: editedProduct.description }),
    });
    await fetch(`http://localhost:4000/products/update/price/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: editedProduct.price }),
    });
    await fetch(`http://localhost:4000/products/update/category/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: editedProduct.category }),
    });
    await fetch(`http://localhost:4000/products/update/tags/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: editedProduct.tags }),
    });

    handleCloseModal();

  };

  const handleImageUpload = async (filename) => {
    const response = await fetch(`http://localhost:4000/products/update/image/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imgSrc: filename }),
    });

    if (response.ok) {
      setProduct((prevProduct) => ({ ...prevProduct, imgSrc: filename }));
      alert('Image updated successfully!');
    } else {
      console.log('Image update failed');
    }
  };

  if (!product || !editedProduct) {
    return null;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
    <Card className="text-center mt-3" style={{ width: '24rem' }}>
      <Card.Img variant="top" src={"http://localhost:4000/uploads/" + product.imgSrc} alt={product.name} />
      <Card.Body>
        <Card.Title className="display-4">{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="font-weight-bold">£{product.price}</Card.Text>
        {product.sold ? (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>SOLD</div>
      ) : (
        inCart ? (
          <Button variant="danger" onClick={() => removeFromCart(currentUser, product._id, setInCart)}>Remove from Cart</Button>
        ) : (
          <Button variant="primary" onClick={() => addToCart(currentUser, product._id, isLoggedIn, setInCart)}>Add to Cart</Button>
        )
      )}
        {currentUser === product.owner && (
          <>
            <Button variant="primary" onClick={handleShowModal}>
              Edit Item
            </Button>
          </>
        )}
      </Card.Body>
    </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={editedProduct.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={editedProduct.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={editedProduct.category} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name="tags" value={editedProduct.tags} onChange={handleInputChange} />
            </Form.Group>
          </Form>
          <div className="mt-3 mb-3">Change Image</div>
          <ImageUploadComponent onUpload={handleImageUpload} />
          <div className="mt-3"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductPage;