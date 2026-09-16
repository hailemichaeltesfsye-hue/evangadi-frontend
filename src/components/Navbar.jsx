import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }

  return (
    <nav className="site-nav">
      <Link to="/" className="logo">EVANGADI<span> FORUM</span></Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#">How it Works</a>
        {token ? (
          <>
            <span style={{ color: 'var(--navy)', fontSize: '15px' }}>Hi, {username}</span>
            <button className="sign-in-btn" type="button" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <Link to="/login">
            <button className="sign-in-btn" type="button">SIGN IN</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
