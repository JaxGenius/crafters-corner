
import { render, screen, fireEvent } from '@testing-library/react';
import WalletComponent from './WalletComponent';
import { BrowserRouter } from 'react-router-dom';

describe('WalletComponent', () => {
  test('renders balance and buttons', () => {
    render(<BrowserRouter><WalletComponent /></BrowserRouter>);
    expect(screen.getByText('Your Balance: £0')).toBeInTheDocument();
    expect(screen.getByText('Deposit £25')).toBeInTheDocument();
  });

  test('handles deposit', () => {
    render(<BrowserRouter><WalletComponent /></BrowserRouter>);
    fireEvent.click(screen.getByText('Deposit £25'));
    expect(screen.getByText('Deposit successful!')).toBeInTheDocument();
  });
});
