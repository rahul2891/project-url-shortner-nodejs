import express from "express";
import { shortenUrlPostRequestBodySchema } from "../validations/request.validation.js";
import {db} from "../db/index.js";
import {urlTable} from "../models/index.js";
import { nanoid } from "nanoid";
import { id } from "zod/locales";
import { eq } from "drizzle-orm";


const router = express.Router();

router.post('/shorten', async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'You must be logged in to shorten URLs' });
    }

    const validationResult = await shortenUrlPostRequestBodySchema.safeParseAsync(req.body);
    
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.flatten() });
    }

    const {url} = validationResult.data;

        const [result] = await db.insert(urlTable).values({
            shortCode: nanoid(8),
            targetUrl: url,
            userId: req.user.id
        }).returning({id: urlTable.id, shortCode: urlTable.shortCode, targetUrl: urlTable.targetUrl});

    res.status(201).json({ id: result.id, shortCode: result.shortCode, targetUrl: result.targetUrl });
});

router.get('/:shortCode', async (req, res) => {
    const code = req.params.shortCode;
    
    const [url] = await db.select({
        targetUrl: urlTable.targetUrl
    }).from(urlTable).where(eq(urlTable.shortCode, code));
    
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(url.targetUrl);
});

export default router;