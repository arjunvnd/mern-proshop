import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useCreateOderMutation } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { clearCart } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
  } = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("paymentMethod", paymentMethod);
    if (!shippingAddress) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, paymentMethod, shippingAddress]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
        shippingAddress,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              {cartItems.length === 0 ? (
                <Message>Cart is empty</Message>
              ) : (
                <ListGroup>
                  {cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
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
                        <Col
                          md={4}
                        >{`${cartItem.qty} x ${cartItem.price}`}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup flush>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
