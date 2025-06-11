import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/checkout/checkout.module.css";
import { cartContext } from "../cartContext";

type PaymentMethod = "card" | "bank";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(cartContext) as {
    cart: any[];
    clearCart: () => void;
  };

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");

  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validación simple pero más realista
  const validateCard = () => {
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      return "Número de tarjeta inválido. Debe tener 16 dígitos.";
    }
    if (cardName.trim().length < 3) {
      return "Nombre en la tarjeta es muy corto.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return "Fecha de expiración inválida. Usa MM/AA.";
    }
    // Validar que la fecha no sea pasada
    const [month, year] = expiry.split("/").map(Number);
    if (month < 1 || month > 12) {
      return "Mes inválido en la fecha de expiración.";
    }
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "La tarjeta está expirada.";
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      return "CVV inválido. Debe tener 3 o 4 dígitos.";
    }
    return null;
  };

  const validateBank = () => {
    if (bankName.trim().length < 3) {
      return "Nombre del banco es muy corto.";
    }
    if (!/^\d{10,12}$/.test(accountNumber)) {
      return "Número de cuenta inválido. Debe tener entre 10 y 12 dígitos.";
    }
    if (!/^\d{9}$/.test(routingNumber)) {
      return "Número de ruta inválido. Debe tener 9 dígitos.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrors("Tu carrito está vacío. No hay nada que pagar.");
      return;
    }

    const error = method === "card" ? validateCard() : validateBank();
    if (error) {
      setErrors(error);
      return;
    }

    setErrors(null);
    setLoading(true);

    // Simula procesamiento (ejemplo: 2 seg)
    await new Promise((r) => setTimeout(r, 2000));

    // Limpia carrito
    clearCart();

    setLoading(false);
    // Redirige a página de confirmación o inicio
    navigate("/checkout-success");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.methodSelector}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            Tarjeta de crédito/débito
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={method === "bank"}
              onChange={() => setMethod("bank")}
            />
            Cuenta bancaria
          </label>
        </div>

        {method === "card" && (
          <div className={styles.cardFields}>
            <label>
              Número de tarjeta
              <input
                type="text"
                inputMode="numeric"
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/(.{4})/g, "$1 ")
                      .trim()
                  )
                }
                required
              />
            </label>
            <label>
              Nombre en la tarjeta
              <input
                type="text"
                placeholder="Juan Pérez"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </label>
            <label>
              Fecha de expiración (MM/AA)
              <input
                type="text"
                placeholder="MM/AA"
                maxLength={5}
                value={expiry}
                onChange={(e) => {
                  let val = e.target.value;
                  if (/^\d{0,2}\/?\d{0,2}$/.test(val)) {
                    if (val.length === 2 && !val.includes("/")) {
                      val = val + "/";
                    }
                    setExpiry(val);
                  }
                }}
                required
              />
            </label>
            <label>
              CVV
              <input
                type="password"
                maxLength={4}
                inputMode="numeric"
                placeholder="123"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                required
              />
            </label>
          </div>
        )}

        {method === "bank" && (
          <div className={styles.bankFields}>
            <label>
              Nombre del banco
              <input
                type="text"
                placeholder="Banco Ejemplo"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </label>
            <label>
              Número de cuenta
              <input
                type="text"
                inputMode="numeric"
                placeholder="1234567890"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value.replace(/\D/g, ""))
                }
                required
              />
            </label>
            <label>
              Número de ruta
              <input
                type="text"
                inputMode="numeric"
                placeholder="123456789"
                value={routingNumber}
                onChange={(e) =>
                  setRoutingNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 9)
                  )
                }
                required
              />
            </label>
          </div>
        )}

        {errors && <p className={styles.error}>{errors}</p>}

        <button
          type="submit"
          className={styles.payButton}
          disabled={loading}
          title={loading ? "Procesando..." : "Pagar ahora"}
        >
          {loading
            ? "Procesando..."
            : `Pagar $${cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}`}
        </button>
      </form>
    </div>
  );
}
