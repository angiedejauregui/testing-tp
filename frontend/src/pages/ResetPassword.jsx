import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/auth.css";

const ResetPassword = () => {
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (contraseña !== "") {
      setLoading(true);
      await axios
        .post(`http://localhost:4000/reset-password/${token}`, { contraseña })
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            navigate(`/login`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Error al restablecer la contraseña");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setContraseña("");
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setContraseña(e.target.value)}
          value={contraseña}
          name="contraseña"
          id="contraseña"
          type="password"
          placeholder="Contraseña"
          autoComplete="off"
        />
        <button type="submit">{loading ? "Cargando..." : "Restablecer"}</button>
      </form>
      </div>
      {mensaje && <div className="mensaje">{mensaje}</div>}
    </>
  );
};

export default ResetPassword;
