const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { contraseña } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ mensaje: 'Token inválido o expirado' });
        } else {
            bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
                if (error) {
                    return res.status(500).json({ error });
                } else {
                    Usuario.findByIdAndUpdate(decoded.id, { contraseña: contraseñaHasheada })
                        .then(() => {
                            res.json({ mensaje: 'Contraseña actualizada correctamente' });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
                        });
                }
            }); 
        }

    })
}

module.exports = resetPassword;