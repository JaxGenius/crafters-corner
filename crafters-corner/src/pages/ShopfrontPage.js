import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import ProductComponent from '../components/ProductComponent';
import { AppContext } from '../AppContext';

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
  const { userID: currentUser } = useContext(AppContext); // use for checking if the current user is the owner of the shopfront
  const [shopfront, setShopfront] = useState(null);
  const [products, setProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const handleShowAddProductModal = () => setShowAddProductModal(true);
  const handleCloseAddProductModal = () => setShowAddProductModal(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', tags: '' });

  const handleNewProductChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleCreateProduct = async () => {
    await fetch('http://localhost:4000/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopfrontID: shopfront._id,
        owner: userId,
        ...newProduct,
      }),
    });
    alert('Product created successfully');
    getProductsByShopfrontId(shopfront._id).then(productsData => setProducts(productsData));
    handleCloseAddProductModal();
    setNewProduct({ name: '', description: '', price: '', category: '', tags: '' });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/shopfront/update/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: editedDescription }),
    });
    alert('Description updated successfully');
    getShopfrontByUserId(userId).then(data => {
      setShopfront(data);
      getProductsByShopfrontId(data._id).then(productsData => setProducts(productsData));
    });
    handleCloseModal();
  };

  useEffect(() => {
    getShopfrontByUserId(userId).then(data => {
      setShopfront(data);
      getProductsByShopfrontId(data._id).then(productsData => setProducts(productsData));
    });
  }, [userId]);

  if (!shopfront) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (event) => {
    setEditedDescription(event.target.value);
  };

  return (
    <Container>
      <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
      <Row>
        <Col>
          <h1>{shopfront.ownerName}'s Shopfront</h1>
          <h2>{shopfront.description}</h2>
          {currentUser === userId && (
          <>
            <div className="mb-3"/>
            <Button variant="primary" onClick={handleShowModal}>Edit Description</Button>
            <div className="mb-3"/>
            <Button variant="primary" onClick={handleShowAddProductModal}>Add Product</Button>
            <div className="mb-3"/>
          </>
        )}
        </Col>
      </Row>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index}>
            <ProductComponent product={product} />
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={editedDescription || ''} onChange={handleInputChange} />
            </Form.Group>
          </Form>
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

      <Modal show={showAddProductModal} onHide={handleCloseAddProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price (£)</Form.Label>
              <Form.Control type="text" name="price" value={newProduct.price} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={newProduct.category} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="productTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name="tags" value={newProduct.tags} onChange={handleNewProductChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddProductModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default ShopfrontPage;