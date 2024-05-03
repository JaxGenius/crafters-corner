import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../AppContext';
import ProductComponent from './ProductComponent';

// Mock product data
const mockProduct = {
  _id: "1",
  name: "Sample Product",
  imgSrc: "sample.jpg",
  price: 20,
  sold: false
};

// Helper function for rendering the component with required context and routing
const renderComponent = (product) => {
  render(
    <AppProvider>
      <Router>
        <ProductComponent product={product} />
      </Router>
    </AppProvider>
  );
};

describe('ProductComponent', () => {
  test('renders product information', () => {
    renderComponent(mockProduct);
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Price: £20')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /sample product/i })).toHaveAttribute('src', 'http://localhost:4000/uploads/sample.jpg');
  });

  test('add to cart button triggers appropriate functionality', () => {
    renderComponent(mockProduct);
    const addToCartButton = screen.getByText(/add to cart/i);
    fireEvent.click(addToCartButton);
    expect(window.alert).toHaveBeenCalledWith('You must be logged in to do that.');
  });

  test('displays sold out message if product is sold', () => {
    const soldProduct = { ...mockProduct, sold: true };
    renderComponent(soldProduct);
    expect(screen.getByText('SOLD')).toBeInTheDocument();
    expect(screen.queryByText(/add to cart/i)).toBeNull();
  });

  test('view product navigates to product detail page', () => {
    renderComponent(mockProduct);
    const viewButton = screen.getByText(/view product/i);
    fireEvent.click(viewButton);
    expect(screen.getByText(/you are viewing/i)).toBeInTheDocument(); // Mock expected text after navigation
  });

  test('remove from cart button triggers functionality', () => {
    const inCartProduct = { ...mockProduct, inCart: true };
    renderComponent(inCartProduct);
    const removeFromCartButton = screen.getByText(/remove from cart/i);
    fireEvent.click(removeFromCartButton);
    expect(window.alert).toHaveBeenCalledWith('Product removed from cart');
  });
});
