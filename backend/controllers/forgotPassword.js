const Usuario = require("../model/usuario");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const forgotPassword = async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ message: "Por favor ingresa tu correo" });
  }

  Usuario.findOne({ correo: correo.toLowerCase() }).then((usuario) => {
    if (!usuario) {
      return res
        .status(404)
        .json({ message: "No se encontro ningun usuario con ese correo" });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; 

    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo,
      subject: "Recuperación de contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({
          mensaje: "Correo enviado",
          usuario: { token },
        });
      }
    });
  });
};

module.exports = forgotPassword;
