import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="success"
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/Login">
                <FaUser />
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
