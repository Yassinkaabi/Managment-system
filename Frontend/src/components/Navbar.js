import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const NavbarExemple = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and isAuth from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    // Redirect to the login page
    navigate('/login');
  };

  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth') || false;
    setIsAuthenticated(isAuth);
  }, [location]);


  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
              </>
            ) : (
              <Button variant="danger" onClick={handleLogout}>Log out</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarExemple;
