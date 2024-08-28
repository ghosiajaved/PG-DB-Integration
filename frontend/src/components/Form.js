/* import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', { email, password });
      // Add your login logic here
    } else {
      console.log('Signing up with:', { email, password });
      // Add your signup logic here
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email address</label>
          <input
            type="email"
            id="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <small id="emailHelp" style={styles.small}>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isLogin ? (
          <div style={styles.formCheck}>
            <input
              type="checkbox"
              id="check"
              style={styles.checkbox}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="check" style={styles.checkLabel}>
              Remember me
            </label>
          </div>
        ) : null} <br/>
        <button type="submit" style={styles.submitButton}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button type="button" style={styles.switchButton} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  small: {
    color: '#6c757d',
  },
  formCheck: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
  },
  checkLabel: {
    marginBottom: '0',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  switchButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  switchButtonHover: {
    backgroundColor: '#5a6268',
  },
};

export default Form;
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = ({ isSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignup ? '/api/users/signup' : '/api/users/login';
        const data = isSignup ? { name, email, password } : { email, password };

        try {
            const response = await axios.post(`http://localhost:3000${endpoint}`, data);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred during authentication. Please try again.');
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                {isSignup && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
                {error && <div style={errorStyle}>{error}</div>}
            </form>
            {!isSignup && (
                <div style={linkContainerStyle}>
                    <span>New user?</span>
                    <button style={linkStyle} onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </div>
            )}
        </div>
    );
};


// Inline styles
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
};

const linkContainerStyle = {
    marginTop: '10px',
    textAlign: 'center',
};

const linkStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '16px',
};

const errorStyle = {
    color: 'red',
    marginTop: '10px',
};

export default Form;
