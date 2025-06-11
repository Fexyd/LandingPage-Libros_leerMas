import { useNavigate } from "react-router-dom";
import logo from "../../assets/cart.png";
import { useContext } from "react";
import { cartContext } from "../cartContext";
import styles from "../../styles/pages/cart/cart.module.css";
import imagenStyles from "../../styles/imagen.module.css";

type CartItem = {
  id: number;
  imageSRC: string;
  title: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const navigate = useNavigate();

  const { cart, removeToCart, changeQuantity } = useContext(cartContext) as {
    cart: CartItem[];
    removeToCart: (id: number) => void;
    changeQuantity: (id: number, quantity: number) => void;
  };

  const back = () => {
    navigate("/");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío, no se puede pagar.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        carrito{" "}
        <img className={imagenStyles.logoMarca} src={logo} alt="carrito" />
      </h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>El carrito está vacío.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.map(({ id, imageSRC, title, price, quantity }) => (
              <li key={id} className={styles.listItem}>
                <img src={imageSRC} alt={title} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <strong>{title}</strong> <br />
                  Precio: ${price} <br />
                  Cantidad:{" "}
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => changeQuantity(id, Number(e.target.value))}
                    className={styles.quantityInput}
                  />
                </div>
                <button
                  onClick={() => removeToCart(id)}
                  className={styles.removeButton}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.totalSection}>
            <strong>Total: </strong>${total.toFixed(2)}
          </div>

          <button onClick={handlePay} className={styles.payButton}>
            Pagar
          </button>
        </>
      )}

      <button onClick={back} className={styles.backButton}>
        Volver
      </button>
    </div>
  );
}
