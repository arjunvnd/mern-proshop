import React from "react";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || "Something went wrong"}
      </Message>
    );
  }

  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
