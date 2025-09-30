import React from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { Link, useParams } from "react-router-dom";
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
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Order delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((cartItem, index) => (
                <p>
                  <Row>
                    <Col md={1}>
                      <Image
                        fluid
                        rounded
                        src={cartItem.image}
                        alt={cartItem.name}
                      />
                    </Col>
                    <Col>
                      <Link to={`/products/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>
                    <Col md={4}>{`${cartItem.qty} x ${cartItem.price} = $${
                      cartItem.qty * cartItem.price
                    }`}</Col>
                  </Row>
                </p>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup flush>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
