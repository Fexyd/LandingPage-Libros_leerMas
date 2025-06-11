import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/checkout/success.module.css";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Gracias por tu compra!</h1>
      <p className={styles.message}>
        Tu pedido ha sido procesado correctamente.
      </p>
      <button className={styles.button} onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
}
