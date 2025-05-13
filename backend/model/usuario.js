const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true },
  nacimiento: { type: Date, required: true },
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true },
});

module.exports = model("Usuario", UsuarioSchema);