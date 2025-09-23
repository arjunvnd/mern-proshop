import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("paymentMethod", paymentMethod);
    if (!shippingAddress) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, paymentMethod, shippingAddress]);

  return (
    <>
      <Row>
        <Col>Column 1</Col>
        <Col>Column 2</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
