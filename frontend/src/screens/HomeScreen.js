import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousal from "../components/ProductCarousal";
import Loader from "../components/Loader";
import Message from "../components/Message";
function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <ProductCarousal></ProductCarousal>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error?.data?.message || error.error} </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={3} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}
export default HomeScreen;
