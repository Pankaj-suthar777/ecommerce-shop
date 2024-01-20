import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckOutSteps from "../components/ChechoutSteps";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
      <Row>
        <Col md={8}>Column</Col>
        <Col md={8}>Column</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
