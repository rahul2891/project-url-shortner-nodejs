import express from 'express';
import { db } from '../db/index.js';
import { usersTable } from '../models/index.js';
import { signupPostRequestBodySchema } from '../validations/request.validation.js';
import { hashPasswordSalt } from '../utils/hash.js';
import {getUserByEmail, createUser} from "./services/user.service.js";

const router = express.Router();

// Define your user-related routes here
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

export default router;