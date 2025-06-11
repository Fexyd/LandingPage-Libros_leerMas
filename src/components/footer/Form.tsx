import React, { useState, FormEvent } from "react";
import styles from "../../styles/footer/form.module.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [open, setOpen] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (): boolean => {
    const errs: string[] = [];
    if (formData.name.trim().length < 3)
      errs.push("El nombre debe tener al menos 3 caracteres.");
    if (!validateEmail(formData.email))
      errs.push("El correo electrónico no es válido.");
    if (formData.subject.trim().length < 5)
      errs.push("El asunto debe tener al menos 5 caracteres.");
    if (formData.message.trim().length < 10)
      errs.push("El mensaje debe tener al menos 10 caracteres.");
    setErrors(errs);
    return errs.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mgebjvak", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus("success");
        setStatusMessage("¡Gracias por contactarnos!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors([]);
      } else {
        setStatus("error");
        setStatusMessage("Error al enviar el mensaje. Intenta más tarde.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Error de red. Revisa tu conexión.");
    }
  };

  return (
    <div className={styles.footerFormWrapper}>
      <button
        className={styles.toggleButton}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "Cerrar contacto" : "Contacto"}
      </button>

      <div className={`${styles.formWrapper} ${open ? styles.open : ""}`}>
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <label>
            Nombre
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
            />
          </label>
          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Asunto
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              minLength={5}
            />
          </label>
          <label>
            Mensaje
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
            />
          </label>

          {errors.length > 0 && (
            <div className={styles.errors}>
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}

          {statusMessage && (
            <p className={status === "success" ? styles.success : styles.error}>
              {statusMessage}
            </p>
          )}

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
