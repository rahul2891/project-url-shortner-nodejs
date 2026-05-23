import { randomBytes, createHmac } from 'node:crypto';

export function hashPasswordSalt(password, userSalt = undefined) {
    const salt = userSalt ?? randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
    return { hashedPassword, salt };
}