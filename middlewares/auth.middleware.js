import { validateToken } from "../utils/token.js";

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return next();
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header should start with "Bearer "' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

   const payload = validateToken(token);

   req.user = payload;

   next();
}