import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../helper";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  async function deliverOrderHandler() {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  const stripe = useStripe();
  console.log(order);
  const handleCheckout = async (e) => {
    e.preventDefault();
    const line_items = order.orderItems.map((item) => {
      return {
        quantity: item.qty,
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            description: "Product",
          },
        },
      };
    });

    const response = await fetchFromAPI("create-checkout-session", {
      body: { line_items, customer_email: userInfo.email, orderId },
    });

    const { sessionId } = response;
    console.log(response);
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">Error occured</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
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
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
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
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2} xs={5}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4} xs={7}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader></Loader>}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark as Deliverd
                    </Button>
                  </ListGroup.Item>
                )}
              {
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={handleCheckout}
                  >
                    Pay now
                  </Button>
                </ListGroup.Item>
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
