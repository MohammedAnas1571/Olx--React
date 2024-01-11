import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    // Basic form validation
    if (!email || !password) {
      setErrorMessage('Fill in both email and password');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        setErrorMessage('Email or password is incorrect');     
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img
          onClick={() => {
            history.push('/');
          }}
          style={{ marginLeft: '40px', marginTop: '-30px', cursor: 'pointer' }}
          width="200px"
          height="200px"
          src={Logo}
          alt="Logo"
        />
        <form style={{ marginTop: '-30px' }} onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          {errorMessage && <p style={{ color: 'red',marginTop:'5px',textAlign:'center' }}>{errorMessage}</p>}
          <button>Login</button>
          
        </form>
        <a
          style={{ marginTop: '10px', marginBottom: '10px' }}
          onClick={() => {
            history.push('/signup');
          }}
        >
          Signup
        </a>
      </div>
    </div>
  );
}

export default Login;