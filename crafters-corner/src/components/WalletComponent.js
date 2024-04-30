import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AppContext } from '../AppContext';
import Row from 'react-bootstrap/esm/Row';

const WalletComponent = () => {
  const { balance, setBalance, userID } = useContext(AppContext);

  const fetchUserBalance = async () => {
    const response = await fetch(`http://localhost:4000/users/balance/${userID}`);
    const balance = await response.json();
    setBalance(balance);
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const deposit = async (amount) => {
    const response = await fetch(`http://localhost:4000/users/updateBalance/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: amount }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        alert('Deposit successful!');
        fetchUserBalance();
    }
  };

  return (
    <Card style={{ width: '29rem' }}>
        <Card.Body>
            <Row>
            <Card.Title>Your Balance: £{balance}</Card.Title>
                <Button variant="primary" className="mt-3 mr-2 mb-2" onClick={() => deposit(25)}>Deposit £25</Button>
                <Button variant="primary" className="mr-2 mb-2" onClick={() => deposit(50)}>Deposit £50</Button>
                <Button variant="primary" className="mr-2 mb-2" onClick={() => deposit(100)}>Deposit £100</Button>
                <Button variant="primary" className="mr-2 mb-2" onClick={() => deposit(250)}>Deposit £250</Button>
            </Row>
        </Card.Body>
    </Card>
  );
};

export default WalletComponent;