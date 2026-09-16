import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import './Auth.css';

function Login() {
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert('Please provide all required information');
      return;
    }

    try {
      const { data } = await axios.post('/users/login', {
        email: emailValue,
        password: passValue,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.msg || 'Something went wrong!');
      console.log(error.response);
    }
  }

  return (
    <div>
      <nav className="site-nav">
        <div className="logo">EVANGADI<span> FORUM</span></div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">How it Works</a>
          <button className="sign-in-btn" type="button">SIGN IN</button>
        </div>
      </nav>

      <div className="auth-page">
        <div className="auth-card-wrap">
          <form className="auth-card" onSubmit={handleSubmit}>
            <h1>Login to your account</h1>
            <p className="auth-sub">
              Don't have an account? <Link to="/register">Create a new account</Link>
            </p>

            <div className="auth-field">
              <input ref={emailDom} type="email" placeholder="Email address" />
            </div>

            <div className="auth-field" style={{ position: 'relative', marginBottom: 24 }}>
              <input ref={passwordDom} type="password" placeholder="Password" />
              <a href="#" className="auth-forgot">Forgot password?</a>
            </div>

            <button className="auth-submit" type="submit">Login</button>
          </form>
        </div>

        <div className="auth-about">
          <p className="eyebrow">About</p>
          <h2>Evangadi Networks</h2>
          <p>
            Write your own "about" copy here — a sentence or two about
            connecting learners, mentors, and builders in one community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;