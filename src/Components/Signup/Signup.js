import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const handleSumbit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !phone || !password) {
      setErrorMessage('Fill in all fields');
      return;
    }

    // Password length validation
    if (phone.length !== 10) {
      setErrorMessage('Phone number should be 10 digits');
      return;
    }

    // Password length validation
    if (password.length < 8) {
      setErrorMessage('Password should be at least 8 characters');
      return;
    }

    // Clear any previous error messages
    setErrorMessage('');

    // Check if the email already exists
    firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {
      if (methods.length > 0) {
        // Email already exists
        setErrorMessage('Email already exists');
      } else {
        // Email doesn't exist, proceed with user creation
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
          result.user.updateProfile({ displayName: username }).then(() => {
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: username,
              phone: phone
            }).then(() => {
              history.push('/login');
            });
          });
        }).catch(error => {
          console.error('Error creating user:', error.message);
          setErrorMessage(error.message);
        });
      }
    }).catch(error => {
      console.error('Error checking email existence:', error.message);
      setErrorMessage(error.message);
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img onClick={() => {
          history.push('/')
        }} style={{ marginLeft: '40px', marginTop: '-30px', cursor: 'pointer' }} width="200px" height="200px" src={Logo} alt="Logo" />        <form style={{ marginTop: '-30px' }} onSubmit={handleSumbit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder="Enter your username"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            placeholder="Enter your Phone number"
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
          <button type="submit">Signup</button>
        </form>
        <a style={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => { history.push('/login'); }}>Login</a>
      </div>
    </div>
  );
}
