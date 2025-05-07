import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
        axios
        .get(`http://localhost:4000/user`, {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ estándar
            },
          })
        .then(({ data }) => setName(data.nombre))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div>
      <h3>{name ? `¡Felicitaciones ${name}!` : "¿Que estas haciendo? 🕵️‍♂️"}</h3>
      <h2>
        {name ? "Te pudiste logear correctamente🎉" : "Te estamos viendo..."}
      </h2>
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/")}>Register</button>
      </div>
    </div>
  );
};

export default Welcome;