import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensajeSuccess, setMensajeSuccess] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { correo, contraseña } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

 const onSubmit = async (e) => {
  e.preventDefault();

  if (correo !== "" && contraseña !== "") {
    const Usuario = { correo, contraseña };
    setLoading(true);

    try {
      const res = await axios.post("https://testing-tp.onrender.com/login", Usuario);
      const { data } = res;

      if (data?.usuario?.token) {
        setMensajeSuccess(data.mensaje || "Inicio de sesión exitoso");
        setMensajeError("");
        localStorage.setItem("token", data.usuario.token);
        setInputs({ correo: "", contraseña: "" });

        navigate("/welcome");
      } else {
        setMensajeError(data.mensaje || "Credenciales incorrectas");
        setMensajeSuccess("");
      }
    } catch (error) {
      console.error(error);
      setMensajeError("Correo o contraseña incorrecta");
      setMensajeSuccess("");
    }

    setLoading(false);
  } else {
    setMensajeError("Por favor completá todos los campos");
    setMensajeSuccess("");
  }
};


  return (
    <>
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={onSubmit}>
          {mensajeSuccess && <div className="mensaje success">{mensajeSuccess}</div>}
          {mensajeError && <div className="mensaje error">{mensajeError}</div>}
          <input
            onChange={HandleChange}
            value={correo}
            name="correo"
            id="correo"
            type="email"
            placeholder="Correo"
            autoComplete="off"
          />
          <input
            onChange={HandleChange}
            value={contraseña}
            name="contraseña"
            id="contraseña"
            type="password"
            placeholder="Contraseña"
            autoComplete="off"
          />
          <button type="submit">{loading ? "Cargando..." : "Iniciar Sesión"}</button>
          <a onClick={() => navigate("/forgot-password")}>Olvidé mi contraseña</a>
          <p>
            ¿Aún no tienes cuenta? <b onClick={() => navigate("/")}>¡Regístrate!</b>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
