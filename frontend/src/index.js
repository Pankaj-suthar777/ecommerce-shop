import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index path="/" element={<HomeScreen></HomeScreen>}></Route>
      <Route
        path="/product/:id"
        element={<ProductScreen></ProductScreen>}
      ></Route>
      <Route path="/cart" element={<CartScreen></CartScreen>}></Route>
      <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
      <Route
        path="/register"
        element={<RegisterScreen></RegisterScreen>}
      ></Route>

      <Route path="" element={<PrivateRoute></PrivateRoute>}>
        <Route
          path="/shipping"
          element={<ShippingScreen></ShippingScreen>}
        ></Route>
        <Route
          path="/payment"
          element={<PaymentScreen></PaymentScreen>}
        ></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
