import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"

const Login = () => {
  const [inputs, setInputs] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { correo, contraseña } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (correo !== "" && contraseña !== "") {
      const Usuario = {
        correo,
        contraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/login", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setTimeout(() => {
            setMensaje("");
            localStorage.setItem("token", data?.usuario.token);
            navigate(`/welcome`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Correo u contraseña incorrecta");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });
      setInputs({ correo: "", contraseña: "" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={(e) => onSubmit(e)}>
              <input
                onChange={(e) => HandleChange(e)}
                value={correo}
                name="correo"
                id="correo"
                type="email"
                placeholder="Correo"
                autoComplete="off"
              />
              <input
                onChange={(e) => HandleChange(e)}
                value={contraseña}
                name="contraseña"
                id="contraseña"
                type="password"
                placeholder="Contraseña"
                autoComplete="off"
              />
          <button type="submit">
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          <p>
            Aun no tienes cuenta?{" "}
            <b onClick={() => navigate("/")}>Registrate!</b>
          </p>
        </form>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}
    </>
  );
};

export default Login;