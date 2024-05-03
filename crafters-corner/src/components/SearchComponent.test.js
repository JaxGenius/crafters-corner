
import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from './SearchComponent';
import { BrowserRouter } from 'react-router-dom';

describe('SearchComponent', () => {
  test('renders search input and button', () => {
    render(<BrowserRouter><SearchComponent /></BrowserRouter>);
    expect(screen.getByLabelText('Search:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('handles search submit', () => {
    render(<BrowserRouter><SearchComponent /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Search:'), { target: { value: 'test query' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('No results found!')).toBeInTheDocument();
  });
});
