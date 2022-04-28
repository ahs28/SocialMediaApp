import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AuthContext from '../store/AuthContext';
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <Navbar style={{ display: 'flexBox' }}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Authentication
          </Navbar.Brand>
          <Nav className="me-auto">
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/feed">
                feed
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/messagebox">
                messagebox
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default MainNavigation;
