import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Container } from 'react-bootstrap';
import AuthContext from '../store/AuthContext';

const Signup = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const authCtx = useContext(AuthContext);
  const [error, setError] = useState();
  const [user, setUser] = useState(initialValues);
  const navigate = useNavigate();
  const getUserData = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async event => {
    event.preventDefault();

    const response = await fetch('http://192.168.1.241:8000/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const actualData = await response.json();

    if (actualData.status === 'success') {
      authCtx.login(actualData.token);
      navigate('/login');
    } else {
      setError(actualData);
    }
  };

  return (
    <>
      <Container>
        <Form className="m-5 " onSubmit={postData}>
          <h1 className="m-4">Signup Page</h1>
          {error ? (
            <h4 className="m-4 text-danger">{error.error[0].msg}</h4>
          ) : null}
          <Form.Group className="m-4" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Your name"
              value={user.name}
              onChange={getUserData}
            />
          </Form.Group>
          <Form.Group className="m-4 text" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={getUserData}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="m-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={user.password}
              onChange={getUserData}
            />
          </Form.Group>

          <Form.Group className="m-4" controlId="formBasicpasswordConfirm">
            <Form.Label>passwordConfirm</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Enter Your Confirm Password"
              value={user.confirmPassword}
              onChange={getUserData}
            />
          </Form.Group>
          <Button variant="primary" className="m-4" type="submit">
            Signup
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default Signup;
