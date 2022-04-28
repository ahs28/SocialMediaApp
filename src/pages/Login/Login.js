import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import React from 'react';
import { Container } from 'react-bootstrap';
import AuthContext from '../../store/AuthContext';
import io from 'socket.io-client';
// import { doc, updateDoc, collection, getDocs } from 'firebase/firestore';
// import { db } from '../../store/firebase-config';
const socket = io.connect('http://192.168.1.241:8000');
const Login = props => {
  const initialValues = {
    email: '',
    password: '',
  };

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, setUser] = useState(initialValues);
  // const postCollectionRef = collection(db, 'users');
  // const [displayPost, setDisplayPost] = useState([]);
  const getUserData = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postCollectionRef);
  //     setDisplayPost(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getPosts();
  // });

  const postData = async event => {
    event.preventDefault();
    const response = await fetch('http://192.168.1.241:8000/api/login', {
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
      socket.emit('isOnline', actualData.data._id);
      navigate('/home/feed');
    } else {
      setError(actualData.message);
    }
    // const loadPost = () => {
    //   fetch(
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyaKdst6uSi62yoOavHVu9sdV5klv1rqg',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: user.email,
    //         password: user.password,
    //         returnSecureToken: true,
    //       }),
    //     }
    //   )
    //     .then(async response => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         const data = await response.json();
    //         if (data && data.error && data.error.message) {
    //           setError(data.error.message);
    //         } else {
    //           setError('Authentication Fail');
    //         }
    //       }
    //     })
    //     .then(data => {
    //       authCtx.login(data.idToken);
    //       navigate.push('/feed');
    //     });
    // };
    // loadPost();
  };

  return (
    <>
      <Container>
        <Form className="m-5 " onSubmit={postData}>
          <h1 className="m-4">Login Page</h1>
          {error ? <h4 className="m-4 text-danger">{error}</h4> : null}
          <Form.Group className="m-4 text" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={e => getUserData(e)}
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
              onChange={e => getUserData(e)}
            />
          </Form.Group>

          <Button variant="primary" className="m-4" type="submit">
            Login
          </Button>
          <Form.Group className="m-4">
            <Form.Label>
              Not Registerd <Link to="/signup">Signup</Link> here
            </Form.Label>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
export default Login;
