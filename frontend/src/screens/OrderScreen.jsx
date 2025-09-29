import React, { useEffect } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isError,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log("order", order);

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Message variant="danger">{error.message}</Message>;
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Email:</strong>
                {order.user.email}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>OrdersScreen</Col>
      </Row>
    </>
  );
};

export default OrderScreen;
