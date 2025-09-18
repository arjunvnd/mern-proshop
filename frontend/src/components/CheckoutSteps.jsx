import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      {step1 ? (
        <LinkContainer to="/login">
          <Nav.Item>
            <Nav.Link as="span">Sign in</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      ) : (
        <Nav.Item>
          <Nav.Link as="span" disabled>
            Sign in
          </Nav.Link>
        </Nav.Item>
      )}
      {step2 ? (
        <LinkContainer to="/shipping">
          <Nav.Item>
            <Nav.Link as="span">Shipping</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      ) : (
        <Nav.Item>
          <Nav.Link as="span" disabled>
            Shipping
          </Nav.Link>
        </Nav.Item>
      )}
      {step3 ? (
        <LinkContainer to="/payment">
          <Nav.Item>
            <Nav.Link as="span">Payment</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      ) : (
        <Nav.Item>
          <Nav.Link as="span" disabled>
            Payment
          </Nav.Link>
        </Nav.Item>
      )}
      {step4 ? (
        <LinkContainer to="/place-order">
          <Nav.Item>
            <Nav.Link as="span">Place order</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      ) : (
        <Nav.Item>
          <Nav.Link as="span" disabled>
            Place order
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default CheckoutSteps;
