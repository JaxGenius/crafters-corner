
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryComponent from './CategoryComponent';
import { BrowserRouter } from 'react-router-dom';

describe('CategoryComponent', () => {
  test('renders categories', () => {
    render(<BrowserRouter><CategoryComponent /></BrowserRouter>);
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  test('handles category click', () => {
    render(<BrowserRouter><CategoryComponent /></BrowserRouter>);
    fireEvent.click(screen.getAllByText('View Products')[0]);
    expect(screen.getByText('No results found for this category!')).toBeInTheDocument();
  });
});
