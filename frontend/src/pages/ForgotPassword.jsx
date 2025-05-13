import React, { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ForgotPassword = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSbmit = async (e) => {
    e.preventDefault();
    if (correo !== "") {
      setLoading(true);
      await axios
        .post("http://localhost:4000/forgot-password", { correo })
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo no encontrado");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setCorreo("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Recuperar contraseña</h2>
        <form onSubmit={(e) => handleSbmit(e)}>
          <input
            type="email"
            placeholder="Correo"
            autoComplete="off"
            onChange={(e) => setCorreo(e.target.value)}
            name="correo"
            id="correo"
            value={correo}
          />
          <button>{loading ? "Cargando..." : "Enviar"}</button>
        </form>
      </div>
      {mensaje && <div className="mensaje">{mensaje}</div>}
    </>
  );
};

export default ForgotPassword;
