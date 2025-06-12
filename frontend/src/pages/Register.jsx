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
  const [mensajeSuccess, setMensajeSuccess] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

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

    try {
      const res = await axios.post("https://testing-tp.onrender.com/register", Usuario);
      const { data } = res;

      if (data.mensaje === "Usuario creado correctamente") {
        setMensajeSuccess(data.mensaje);
        setMensajeError("");
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
          setMensajeSuccess("");
          navigate("/login");
        }, 1500);
      } else {
        setMensajeError(data.mensaje || "No se pudo registrar");
        setMensajeSuccess("");
      }

    } catch (error) {
      console.error(error);
      setMensajeError("Hubo un error en el servidor");
      setMensajeSuccess("");
    }

    setLoading(false);
  } else {
      setMensajeError("Por favor completá todos los campos");
    }
};


  return (
    <>
      <div className="container">
        <h2>Registrarse</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          {mensajeSuccess && (
            <div className="mensaje success">{mensajeSuccess}</div>
          )}
          {mensajeError && <div className="mensaje error">{mensajeError}</div>}
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
            max={today}
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
    </>
  );
};

export default Register;
