import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const [contraseña, setContraseña] = useState("");
  const [mensajeSuccess, setMensajeSuccess] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== "") {
      setLoading(true);

      try {
        const res = await axios.post(
          `https://testing-tp.onrender.com/reset-password/${token}`,
          {
            contraseña,
          }
        );

        const { data } = res;

        setMensajeSuccess(data.mensaje || "Contraseña restablecida con éxito");
        setMensajeError("");

        setContraseña("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error(error);
        setMensajeError("Error al restablecer la contraseña");
        setMensajeSuccess("");
        // No vaciamos la contraseña si hubo error
      }

      setLoading(false);
    } else {
      setMensajeError("Por favor completá el campo de contraseña");
      setMensajeSuccess("");
    }
  };

  return (
    <div className="container">
      <h2>Restablecer Contraseña</h2>

      <form onSubmit={handleSubmit}>
        {mensajeSuccess && (
          <div className="mensaje success">{mensajeSuccess}</div>
        )}
        {mensajeError && <div className="mensaje error">{mensajeError}</div>}
        <label htmlFor="Contraseña">Contraseña</label>

        <input
          onChange={(e) => setContraseña(e.target.value)}
          value={contraseña}
          name="contraseña"
          id="contraseña"
          type="password"
          autoComplete="off"
        />
        <button type="submit">{loading ? "Cargando..." : "Restablecer"}</button>
      </form>
    </div>
  );
};

export default ResetPassword;
