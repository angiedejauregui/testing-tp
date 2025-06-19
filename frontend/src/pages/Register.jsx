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

  const validarContraseña = (contraseña) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(contraseña);
  };

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
      if (!/^\d{11}$/.test(telefono)) {
        setMensajeError("El teléfono debe tener 11 dígitos");
        setMensajeSuccess("");
        return;
      }

      if (!validarContraseña(contraseña)) {
        setMensajeError(
          "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
        );
        setMensajeSuccess("");
        return;
      }

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
        const res = await axios.post(
          "https://testing-tp.onrender.com/register",
          Usuario
        );
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
        <form onSubmit={onSubmit}>
          {mensajeSuccess && (
            <div className="mensaje success">{mensajeSuccess}</div>
          )}
          {mensajeError && <div className="mensaje error">{mensajeError}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={HandleChange}
                value={nombre}
                name="nombre"
                id="nombre"
                type="text"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                onChange={HandleChange}
                value={apellido}
                name="apellido"
                id="apellido"
                type="text"
                autoComplete="off"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="correo">Correo</label>
              <input
                onChange={HandleChange}
                value={correo}
                name="correo"
                id="correo"
                type="email"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                onChange={HandleChange}
                value={telefono}
                name="telefono"
                id="telefono"
                type="tel"
                autoComplete="off"
                maxLength={11}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nacimiento">Fecha de nacimiento</label>
              <input
                onChange={HandleChange}
                value={nacimiento}
                name="nacimiento"
                id="nacimiento"
                type="date"
                max={today}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                onChange={HandleChange}
                value={contraseña}
                name="contraseña"
                id="contraseña"
                type="password"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
              <input
                onChange={HandleChange}
                value={confirmarContraseña}
                name="confirmarContraseña"
                id="confirmarContraseña"
                type="password"
                autoComplete="off"
              />
            </div>
          </div>

          <button type="submit">
            {loading ? "Cargando..." : "Registrarme"}
          </button>

          <p>
            ¿Ya tenés una cuenta?{" "}
            <b onClick={() => navigate("/login")}>Iniciá sesión</b>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
