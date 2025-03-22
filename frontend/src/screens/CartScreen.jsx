import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Row } from "react-bootstrap";

const CartScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <FaTrash />
      </Row>
    </div>
  );
};

export default CartScreen;
