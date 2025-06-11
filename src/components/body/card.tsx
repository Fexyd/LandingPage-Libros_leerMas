import { useState, useContext } from "react";
import { cartContext } from "../cartContext";
import cartLogo from "../../assets/cart.png";
import styles from "../../styles/body/card.module.css";
import imagenStyles from "../../styles/imagen.module.css";

interface CardProps {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  text: string;
}

export default function Card({ id, title, price, imageSrc, text }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const { cart, addOneToCart } = useContext(cartContext);

  const cartItem = cart.find((item: any) => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Estado para activar la animación
  const [animarCarrito, setAnimarCarrito] = useState(false);

  // Función para manejar click y activar animación + incrementar carrito
  function handleAddToCart() {
    addOneToCart({ id, imageSRC: imageSrc, title, price, quantity: 1 });

    // Activar animación
    setAnimarCarrito(true);
  }

  // Función que se ejecuta cuando termina la animación para resetear estado
  function onAnimationEnd() {
    setAnimarCarrito(false);
  }

  return (
    <div
      className={expanded ? `${styles.card} ${styles.expanded}` : styles.card}
    >
      <div className={styles.image_wrapper} style={{ pointerEvents: "none" }}>
        <img
          src={imageSrc}
          alt={title}
          style={{
            transform: expanded
              ? "translateX(-45%) translateY(10%) scale(0.9) rotate(-4deg)"
              : "none",
            transition: "transform 0.25s ease-in",
          }}
        />
      </div>

      <div
        className={
          expanded
            ? `${styles.content_wrapper} ${styles.expanded}`
            : styles.content_wrapper
        }
      >
        <div className={styles.content_div}></div>
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.price}>${price}</h4>

        <button
          className={`${styles.button} ${styles.like}`}
          type="button"
          title="Agregar al carrito"
          onClick={handleAddToCart}
        >
          <img
            style={{ width: "24px", height: "24px", margin: "0" }}
            className={`${imagenStyles.logoCarrito} ${
              animarCarrito ? imagenStyles.animarCarrito : ""
            }`}
            src={cartLogo}
            alt="Carrito"
            onAnimationEnd={onAnimationEnd}
          />
          <span>{quantityInCart}</span>
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`${styles.button} ${styles.more}`}
          type="button"
        >
          =
        </button>
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
}
