import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    correo: "",
    nombre: "",
    contraseña: "",
    apellido: "",
    nacimiento: "",
    telefono: "",
    confirmarContraseña: "",
  });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    nombre,
    apellido,
    correo,
    nacimiento,
    telefono,
    contraseña,
    confirmarContraseña,
  } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      nombre !== "" &&
      apellido !== "" &&
      correo !== "" &&
      nacimiento !== "" &&
      telefono !== "" &&
      contraseña !== "" &&
      confirmarContraseña !== ""
    ) {
      const Usuario = {
        nombre,
        apellido,
        correo,
        nacimiento,
        telefono,
        contraseña,
        confirmarContraseña,
      };
      setLoading(true);
      await axios
        .post("http://localhost:4000/register", Usuario)
        .then((res) => {
          const { data } = res;
          setMensaje(data.mensaje);
          setInputs({
            nombre: "",
            contraseña: "",
            correo: "",
            apellido: "",
            nacimiento: "",
            telefono: "",
            confirmarContraseña: "",
          });
          setTimeout(() => {
            setMensaje("");
            navigate("/login");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("Hubo un error");
          setTimeout(() => {
            setMensaje("");
          }, 1500);
        });

      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Registrarse</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => HandleChange(e)}
            value={nombre}
            name="nombre"
            id="nombre"
            type="text"
            placeholder="Nombre"
            autoComplete="off"
          />
          <input
            onChange={(e) => HandleChange(e)}
            value={apellido}
            name="apellido"
            id="apellido"
            type="text"
            placeholder="Apellido"
            autoComplete="off"
          />
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
            value={nacimiento}
            name="nacimiento"
            id="nacimiento"
            type="date"
            placeholder="Fecha de nacimiento"
            autoComplete="off"
          />
          <input
            onChange={(e) => HandleChange(e)}
            value={telefono}
            name="telefono"
            id="telefono"
            type="tel"
            placeholder="Telefono"
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
          <input
            onChange={(e) => HandleChange(e)}
            value={confirmarContraseña}
            name="confirmarContraseña"
            id="confirmarContraseña"
            type="password"
            placeholder="Confirmar contraseña"
            autoComplete="off"
          />

          <button type="submit">
            {loading ? "Cargando..." : "Registrarme"}
          </button>
          <p>
            Ya tienes una cuenta?{" "}
            <b onClick={() => navigate("/login")}>Inicia Sesión!</b>
          </p>
        </form>
      </div>
      {mensaje && <div className="mensaje">{mensaje}</div>}
    </>
  );
};

export default Register;
