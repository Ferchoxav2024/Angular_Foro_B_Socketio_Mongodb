const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
    // Obtener el token del encabezado de la solicitud
    const token = req.header('x-auth-token');
    
    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verificar token
    try {
        const decoded = jwt.verify(token, config.secretOrKey);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
