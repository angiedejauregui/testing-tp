import React, { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [mensajeSuccess, setMensajeSuccess] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSbmit = async (e) => {
    e.preventDefault();

    if (correo !== "") {
      setLoading(true);

      try {
        const res = await axios.post(
          "https://testing-tp.onrender.com/forgot-password",
          { correo }
        );
        const { data } = res;

        setMensajeSuccess(data.mensaje || "Correo enviado correctamente");
        setMensajeError("");

        localStorage.setItem("token", data?.usuario?.token || "");
        setCorreo(""); // ✅ Vaciar solo si todo fue bien
      } catch (error) {
        console.error(error);
        setMensajeError("Correo no encontrado");
        setMensajeSuccess("");
        // ❌ No vaciamos el correo
      }

      setLoading(false);
    } else {
      setMensajeError("Por favor completá con tu correo electrónico");
      setMensajeSuccess("");
    }
  };

  return (
    <div className="container">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSbmit}>
        {mensajeSuccess && (
          <div className="mensaje success">{mensajeSuccess}</div>
        )}
        {mensajeError && <div className="mensaje error">{mensajeError}</div>}
        <label htmlFor="correo">Correo</label>

        <input
          type="email"
          autoComplete="off"
          onChange={(e) => setCorreo(e.target.value)}
          name="correo"
          id="correo"
          value={correo}
        />

        <button type="submit">{loading ? "Cargando..." : "Enviar"}</button>
        <p>
          ¿Ya recordaste tu contraseña?{" "}
          <b onClick={() => navigate("/login")}>Iniciar sesión</b>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
