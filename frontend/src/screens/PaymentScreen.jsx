import React, { useEffect, useState } from "react";
import { FormContainer } from "../components/FormContainer";
import { Button, Col, Form } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod());
    navigate("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal or Credit card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
