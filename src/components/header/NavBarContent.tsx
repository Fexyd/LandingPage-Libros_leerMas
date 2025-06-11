import styles from "../../styles/header/navBarContent.module.css";
import NavBar from "./NavBar";
import logo from "../../assets/cart.png";

import stylesForm from "../../styles/footer/form.module.css";
import { useNavigate } from "react-router-dom";
import imagenStyles from "../../styles/imagen.module.css";

function NavBarContent() {
  const navigate = useNavigate();
  const goToCart = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // evita el scroll o recarga que hace href="#"
    navigate("/cart");
  };
  return (
    <div className={styles.navBar_content}>
      <h1>
        <span className={styles.span}>Leer Mas</span> - Tienda
      </h1>
      <NavBar
        count={3}
        content={["Inicio", "Catalogo", "Contacto"]}
        links={["#", "#catalog", "#"]}
      />
      <a onClick={goToCart} className={stylesForm.link} href="#">
        <img className={imagenStyles.logoCarrito} src={logo} alt="" />
      </a>
    </div>
  );
}

export default NavBarContent;
