import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    //Obtiene el token del header que envía el frontend
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Formato "Bearer <token>"

    //Si no hay token
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    //Token válido
    try {
        const payload = jwt.verify(token, 'PW2PIAMUNDIALCLAVE'); //clave
        req.user = payload; // Guardamos los datos del usuario en la request
        next(); // El token es válido, dejamos pasar a la ruta
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};