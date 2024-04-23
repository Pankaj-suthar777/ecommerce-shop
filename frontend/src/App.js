import React from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OhvW7Gr7paNn0fxbC8fWbjyifJHhT5vKdT8IR2oz8X8bAbz0oiJaqHMg8B9bUjNaEwBffNgspnjAR0QlISGQPel00EN3uyBLK"
);

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <ToastContainer></ToastContainer>
        <Header></Header>
        <main className="py-3">
          <Container>
            <Outlet></Outlet>
          </Container>
        </main>
        <Footer></Footer>
      </Elements>
    </>
  );
}

export default App;
