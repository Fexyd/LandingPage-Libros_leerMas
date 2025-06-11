import { useEffect, useState, useRef } from "react";
import genericStyles from "../../styles/genericStyles.module.css";
import styles from "../../styles/header/navBar.module.css";

interface Props {
  count: number;
  content: string[];
  links: string[];
}

function NavBar(props: Props) {
  const { count, content, links } = props;
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  if (content.length !== count || links.length !== count) {
    return (
      <div className={genericStyles.error}>
        <h2>ERROR AL TRATAR DE CREAR EL NAVBAR</h2>
      </div>
    );
  }

  useEffect(() => {
    function handleScroll() {
      if (!navRef.current) return;
      const top = navRef.current.getBoundingClientRect().top;
      setIsSticky(top <= 0);
    }

    window.addEventListener("scroll", handleScroll);
    // Limpieza
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let navElementsLi = [];
  for (let i = 0; i < count; i++) {
    navElementsLi.push(
      <li className={styles.li} key={i}>
        <a className={styles.link} href={links[i]}>
          {content[i]}
        </a>
      </li>
    );
  }

  return (
    <ul
      ref={navRef}
      className={`${styles.ul} ${isSticky ? styles.stickyActive : ""}`}
    >
      {navElementsLi}
    </ul>
  );
}

export default NavBar;
