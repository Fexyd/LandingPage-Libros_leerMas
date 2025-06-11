import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/cart";
import Layout from "./components/layout";
import CartContext from "./components/cartContext";
import Checkout from "./components/pages/checkout";
import CheckoutSuccess from "./components/pages/checkoutSucces";

function App() {
  return (
    <CartContext>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Layout></Layout>
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/checkout-success"
          element={<CheckoutSuccess></CheckoutSuccess>}
        />
      </Routes>
    </CartContext>
  );
}

export default App;
