const bcrypt = require("bcryptjs");
const Usuario = require("../model/usuario");

const register = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    nacimiento,
    telefono,
    contraseña,
    confirmarContraseña,
  } = req.body;

  Usuario.findOne({ correo }).then((usuario) => {
    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese correo" });
    } else if (
      !nombre ||
      !apellido ||
      !correo ||
      !nacimiento ||
      !telefono ||
      !contraseña ||
      !confirmarContraseña
    ) {
      return res.json({ mensaje: "Por favor completa todos los campos" });
    } else if (contraseña !== confirmarContraseña) {
      return res.json({ mensaje: "Las contraseñas no coinciden" });
    } else {
      bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
        if (error) res.json({ error });
        else {
          const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            correo,
            nacimiento,
            telefono,
            contraseña: contraseñaHasheada,
          });

          nuevoUsuario
            .save()
            .then((usuario) => {
              res.json({ mensaje: "Usuario creado correctamente", usuario });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
};

module.exports = register;
