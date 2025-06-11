import { useState, useContext } from "react";
import { cartContext } from "../cartContext";
import cartLogo from "../../assets/cart.png";
import styles from "../../styles/body/cardPro.module.css";
import imagenStyles from "../../styles/imagen.module.css";

interface CardProps {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  text: string;
}

export default function CardPro({
  id,
  title,
  price,
  imageSrc,
  text,
}: CardProps) {
  const { cart, addOneToCart } = useContext(cartContext);

  const cartItem = cart.find((item: any) => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const [animarCarrito, setAnimarCarrito] = useState(false);

  function handleAddToCart() {
    addOneToCart({ id, imageSRC: imageSrc, title, price, quantity: 1 });
    setAnimarCarrito(true);
  }

  function onAnimationEnd() {
    setAnimarCarrito(false);
  }

  return (
    <div className={styles.card}>
      <div className={styles.content_wrapper}>
        <img className={styles.image} src={imageSrc} alt={title} />
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.price}>${price}</h4>

        <button
          className={`${styles.button} ${styles.like}`}
          type="button"
          title="Agregar al carrito"
          onClick={handleAddToCart}
        >
          <img
            style={{ width: "32px", height: "32px", margin: "0" }}
            className={`${imagenStyles.logoCarrito} ${
              animarCarrito ? imagenStyles.animarCarrito : ""
            }`}
            src={cartLogo}
            alt="Carrito"
            onAnimationEnd={onAnimationEnd}
          />
          <span>{quantityInCart}</span>
        </button>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
