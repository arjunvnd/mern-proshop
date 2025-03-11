import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Products from "../components/Products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
