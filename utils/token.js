import jwt from 'jsonwebtoken';
import {userTokenSchema} from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {
    const validationResult = await userTokenSchema.safeParseAsync(payload);
    if (!validationResult.success) {
        throw new Error('Invalid token payload');
    }

    const payloadValidatedData = validationResult.data;
    const token = jwt.sign(payloadValidatedData, JWT_SECRET, { expiresIn: '1h' });
    return token;
} 

export function validateToken(token) {
   try {
     const payload = jwt.verify(token, JWT_SECRET);
     return payload;
    
   } catch (error) {
    return null;
   }
}