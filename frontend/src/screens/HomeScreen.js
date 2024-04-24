import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCarousal from "../components/ProductCarousal";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function HomeScreen() {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({ keyword });

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const successValue = params.get("success");
    if (successValue === "true") {
      toast.success("Order Paid Successfully");
    } else if (successValue === "false") {
      toast.error("Payment failed");
    } else {
      return;
    }
  }, []);

  return (
    <>
      {!keyword ? (
        <ProductCarousal></ProductCarousal>
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {keyword && products.length === 0 ? (
        <h2>No product found</h2>
      ) : (
        <>
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
      )}
    </>
  );
}
export default HomeScreen;
