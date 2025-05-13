const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  // Usar Authorization como el nombre estándar del header
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      if (error) {
        return res.status(401).json({ mensaje: "Token inválido" });
      } else {
        req.user = data; // Almacena los datos del token en la solicitud
        next(); // Continúa con la siguiente función en el pipeline
      }
    });
  } else {
    res.status(400).json({ mensaje: "Debes enviar un token de autorización" });
  }
};

module.exports = verifyToken;
