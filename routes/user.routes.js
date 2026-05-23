import express from 'express';
import { db } from '../db/index.js';
import { usersTable } from '../models/index.js';
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validations/request.validation.js';
import { hashPasswordSalt } from '../utils/hash.js';
import {getUserByEmail, createUser} from "../services/user.service.js";
import { createUserToken } from '../utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.flatten() });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await createUser({ firstName, lastName, email, password });

    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.flatten() });
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const { hashedPassword } = hashPasswordSalt(password, user.salt);

    if(hashedPassword !== user.password) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = await createUserToken({ id: user.id });

    res.json({ token });
});

export default router;