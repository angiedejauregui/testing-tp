import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";

const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`https://testing-tp.onrender.com/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setName(data.nombre))
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2 className="bienvenido">
        {`¡Bienvenido/a a AuraMusic, ${name}! 🎶`}
      </h2>
      <h3>
        {"Iniciaste sesión con éxito. ¡Disfrutá la mejor música sin interrupciones! 🎧"}
      </h3>
      <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Welcome;
