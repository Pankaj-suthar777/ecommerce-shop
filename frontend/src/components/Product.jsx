import React from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const { keyword } = useParams();
  return (
    <Card className="my-3 p-3 rounded">
      {keyword ? (
        <>
          <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top"></Card.Img>
          </Link>
          <Card.Body>
            <Link to={`product/${product._id}`} className="product-title">
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text className="mt-2" as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </Card.Text>

            <Card.Text className="mt-2" as="h3">
              ${product.price}
            </Card.Text>
          </Card.Body>
        </>
      ) : (
        <>
          <Link to={`product/${product._id}`}>
            <Card.Img src={product.image} variant="top"></Card.Img>
          </Link>
          <Card.Body>
            <Link to={`product/${product._id}`} className="product-title">
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text className="mt-2" as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </Card.Text>

            <Card.Text className="mt-2" as="h3">
              ${product.price}
            </Card.Text>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default Product;
