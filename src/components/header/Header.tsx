import React from "react";
import styles from "../../styles/header/header.module.css"; // Ajusta la ruta si es necesario
import heroLibro from "../../assets/Header/Libro-HeroImage.webp";

import img1 from "../../assets/body/stickers/WhatsApp_Image_2025-06-02_at_4.13.05_PM-removebg-preview.png";
import img2 from "../../assets/body/stickers/WhatsApp_Image_2025-06-02_at_4.13.05_PM__1_-removebg-preview.png";

import stickerStyles from "../../styles/body/stickers.module.css";

const HeroHeader: React.FC = () => {
  return (
    <header className={styles.heroImage_bg}>
      <div className={styles.content}>
        <div className={styles.titles} style={{ userSelect: "text" }}>
          <img className={stickerStyles.img1} src={img1} alt="" />
          <img className={stickerStyles.img2} src={img2} alt="" />
          <h2 className={styles.title_1}>
            Un <span className={styles.span}>Libro</span>
          </h2>
          <h2 className={styles.title_2}>
            Una <span className={styles.span}>Historia</span>
          </h2>
        </div>
        <img
          className={styles.heroImage}
          src={heroLibro}
          alt="Portada del libro"
          draggable={false}
        />
      </div>
    </header>
  );
};

export default HeroHeader;
