import NavBarContent from "./header/NavBarContent";
import HeroHeader from "./header/Header";
import Form from "./footer/Form";
import Section from "../components/body/section";
import Card from "../components/body/card";
import CardPro from "./body/cardPro";
import libros from "../assets/body/libros/indexLibros";
export default function Layout() {
  return (
    <div>
      <NavBarContent />
      <HeroHeader />
      <main>
        <Section id="catalog" title="CATÁLOGO" bg_color="#FFF0ED">
          <Card
            id={1}
            title="El chico de arriba"
            price={279}
            imageSrc={libros.elChicoDeArriba}
            text="Una historia romántica entre vecinos que descubren que el amor puede estar más cerca de lo que imaginan."
          />
          <Card
            id={2}
            title="Antes de diciembre"
            price={349}
            imageSrc={libros.despuesDiciembre}
            text="Jenna tiene hasta diciembre para enamorarse, pero el amor no siempre sigue las reglas establecidas."
          />
          <Card
            id={3}
            title="Acelerando en rojo"
            price={319}
            imageSrc={libros.acelerandoEnRojo}
            text="Una apasionante historia de amor y velocidad que desafía los límites y las normas establecidas."
          />
          <Card
            id={4}
            title="Un beso bajo la lluvia"
            price={289}
            imageSrc={libros.unBesoBajoLaLluvia}
            text="Un encuentro inesperado bajo la lluvia desencadena una serie de eventos que cambiarán la vida de los protagonistas."
          />
          <Card
            id={5}
            title="El arte de ser nosotros"
            price={348}
            imageSrc={libros.elArteDeSerNosotros}
            text="Una exploración del amor joven y la importancia de ser uno mismo en una relación."
          />
          <Card
            id={6}
            title="Romper el hielo"
            price={359}
            imageSrc={libros.romperElHielo}
            text="Una historia de amor entre dos personas que, a pesar de sus diferencias, encuentran calidez en medio del frío."
          />
        </Section>

        <Section
          id="best"
          title="DESTACADO"
          bg_color="#ffc8a2"
          isDestacado={true}
        >
          <CardPro
            id={7}
            title="Demian: Secreto oscuro"
            price={299}
            imageSrc={libros.demian}
            text="Una historia intensa que explora los límites del deseo y la oscuridad humana."
          />
          <CardPro
            id={8}
            title="Romper el círculo"
            price={348}
            imageSrc={libros.romperElCirculo}
            text="Lily enfrenta un ciclo de violencia similar al que vivió su madre, cuestionando el amor y la resiliencia."
          />
          <CardPro
            id={9}
            title="Nosotros en la luna"
            price={298}
            imageSrc={libros.nosotrosEnLaLuna}
            text="Un encuentro fugaz en París une a dos almas perdidas que, a través de correos electrónicos, descubren el amor y el destino."
          />
          <CardPro
            id={10}
            title="El faro dormido"
            price={448}
            imageSrc={libros.elFaroDeLosAmoresDormidos}
            text="Alba regresa a su pueblo natal, enfrentando recuerdos y secretos en un faro que guarda historias inacabadas."
          />
          <CardPro
            id={11}
            title="Invisible"
            price={329}
            imageSrc={libros.invisible}
            text="Una conmovedora narración sobre un niño que se siente invisible para el mundo, abordando temas de acoso escolar y autoaceptación."
          />
          <CardPro
            id={12}
            title="Lugares secretos"
            price={398}
            imageSrc={libros.todosLosLugares}
            text="Maeve y Connor se reencuentran en su pueblo de infancia, reviviendo recuerdos y creando una lista de deseos por cumplir juntos."
          />
        </Section>
      </main>

      <footer
        style={{
          backgroundColor: "#111",
          padding: "2rem 0",
          textAlign: "center",
          color: "#ccc",
          fontSize: "0.9rem",
          position: "relative",
        }}
      >
        <Form />
        <div style={{ marginTop: "2rem", opacity: 0.6 }}>
          <p>
            © {new Date().getFullYear()} Diseñado por <strong>Karol</strong> con
            mucho cariño.
          </p>
        </div>

        <span
          style={{
            fontSize: "0.5rem",
            opacity: 0.01,
            position: "absolute",
            bottom: "0.3rem",
            right: "0.7rem",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Hecho por Fexyd y ayudita del gpt
        </span>
      </footer>
    </div>
  );
}
