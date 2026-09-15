import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import './Auth.css';

function Register() {
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!usernameValue || !firstValue || !lastValue || !emailValue || !passValue) {
      alert('Please provide all required information');
      return;
    }

    try {
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert('Register successful. Please login');
      navigate('/login');
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
          <Link to="/login">
            <button className="sign-in-btn">SIGN IN</button>
          </Link>
        </div>
      </nav>

      <div className="auth-page">
        <div className="auth-card-wrap">
          <form className="auth-card" onSubmit={handleSubmit}>
            <h1>Join the network</h1>
            <p className="auth-sub">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>

            <div className="auth-field">
              <input ref={usernameDom} type="text" placeholder="Username" />
            </div>

            <div className="auth-row2">
              <div className="auth-field">
                <input ref={firstnameDom} type="text" placeholder="First name" />
              </div>
              <div className="auth-field">
                <input ref={lastnameDom} type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="auth-field">
              <input ref={emailDom} type="email" placeholder="Email address" />
            </div>

            <div className="auth-field">
              <input ref={passwordDom} type="password" placeholder="Password" />
            </div>

            <p className="auth-terms">
              I agree to the <a href="#">privacy policy</a> and{' '}
              <a href="#">terms of service</a>
            </p>

            <button className="auth-submit" type="submit">Register</button>
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

export default Register;