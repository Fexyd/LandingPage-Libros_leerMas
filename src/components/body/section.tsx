import { ReactNode } from "react";
import styles from "../../styles/body/section.module.css";
import stylesDes from "../../styles/body/sectionDestacado.module.css";

interface Props {
  id: string;
  children?: ReactNode;
  title: string;
  bg_color?: string;
  isDestacado?: boolean;
}

function Section(props: Props) {
  if (!props.isDestacado) {
    return (
      <div id={props.id} style={{ backgroundColor: props.bg_color }}>
        <h1 className={styles.title}>{props.title}</h1>
        <div className={styles.section}>{props.children}</div>
      </div>
    );
  } else {
    return (
      <div id={props.id} style={{ backgroundColor: props.bg_color }}>
        <h1 className={stylesDes.title}>{props.title}</h1>
        <div className={stylesDes.section}>{props.children}</div>
      </div>
    );
  }
}

export default Section;
