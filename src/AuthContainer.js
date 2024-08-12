import React, { useState, useEffect } from 'react';
import './AuthContainer.css'; 
import { useNavigate } from 'react-router-dom';

const AuthContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setFormError('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required.');
    }
    if (!email) {
      setEmailError('Email is required.');
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
    }
    if (!password) {
      setPasswordError('Password is required.');
    }
    if (!confirmPassword) {
      setPasswordError('Please confirm your password.');
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    }

    if (username && isValidEmail(email) && password && confirmPassword && password === confirmPassword) {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (response.ok) {
          // Registration successful
          toggle();
        } else {
          const errorData = await response.json();
          setFormError(errorData.message || 'Sign up failed.');
        }
      } catch (error) {
        setFormError('An error occurred. Please try again.');
      }
    } else {
      setFormError('Please correct the errors above.');
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setFormError('');
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required.');
    }
    if (!password) {
      setPasswordError('Password is required.');
    }

    if (username && password) {
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming you receive a JWT token in response, store it and navigate
          localStorage.setItem('token', data.token);
          navigate('/insurance-types');
        } else {
          const errorData = await response.json();
          setFormError(errorData.message || 'Sign in failed.');
        }
      } catch (error) {
        setFormError('An error occurred. Please try again.');
      }
    } else {
      setFormError('Please correct the errors above.');
    }
  };

  return (
    <div id="container" className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <div className="row">
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <form className="form sign-up" onSubmit={handleSignUp}>
              <div className="input-group">
                <i className='bx bxs-user'></i>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
                {usernameError && <p className="error-message">{usernameError}</p>}
              </div>
              <div className="input-group">
                <i className='bx bx-mail-send'></i>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                {passwordError && !confirmPassword && <p className="error-message">{passwordError}</p>}
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
                {passwordError && confirmPassword && <p className="error-message">{passwordError}</p>}
              </div>
              {formError && <p className="error-message">{formError}</p>}
              <button type="submit">
                Sign up
              </button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </form>
          </div>
        </div>

        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <form className="form sign-in" onSubmit={handleSignIn}>
              <div className="input-group">
                <i className='bx bxs-user'></i>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
                {usernameError && <p className="error-message">{usernameError}</p>}
              </div>
              <div className="input-group">
                <i className='bx bxs-lock-alt'></i>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
              {formError && <p className="error-message">{formError}</p>}
              <button type="submit">
                Sign in
              </button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>

        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
