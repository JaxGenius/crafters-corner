
import { render, screen, fireEvent } from '@testing-library/react';
import LoginComponent from './LoginComponent';
import { BrowserRouter } from 'react-router-dom';

describe('LoginComponent', () => {
  test('renders login form inputs', () => {
    render(<BrowserRouter><LoginComponent /></BrowserRouter>);
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('handles login submit', () => {
    render(<BrowserRouter><LoginComponent /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
