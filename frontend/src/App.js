import React from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
