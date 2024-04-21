import { Link } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';

function Homepage({ isLoggedIn, username }) {
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px', border: '1px solid black' }}>
  <h1>Crafters Corner</h1>
  <div>
    {isLoggedIn ? (
      <>
        <p>Welcome, {username}!</p>
        <Link to="/logout" style={{ marginRight: '20px', padding: '10px', fontWeight: 'bold', fontSize: '2.2em' }}>Logout</Link>
      </>
    ) : (
      <>
        <Link to="/login" style={{ marginRight: '20px', padding: '10px', fontWeight: 'bold', fontSize: '2.2em' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '20px', padding: '10px', fontWeight: 'bold', fontSize: '2.2em' }}>Register</Link>
      </>
    )}
    <Link to="/cart" style={{ padding: '10px', fontWeight: 'bold', fontSize: '2.2em' }}>Cart</Link>
  </div>
</header>
      <div style={{ flex: '1', margin: '50px', padding: '20px', border: '1px solid black' }}>
        <p>Your paragraph text goes here...</p>
      </div>
      <div id="search" style={{ marginBottom: '20px' }}>
        <SearchComponent />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 1</div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 2</div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid black' }}>Category 3</div>
      </div>
    </div>
  );
}

export default Homepage;