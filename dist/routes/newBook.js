import { Router } from "express";
import { validationResult } from "express-validator";
import { writeBook } from "../serverFunctions.js";
export const newBookRouter = Router();
newBookRouter.post('/books/new', async (req, res, next) => {
    const newBook = req.body;
    try {
        const errors = validationResult(req);
        if (errors.array().length > 0) {
            res.status(400).json({ errors: errors.array() });
            throw new Error('Invalid input');
        }
        await writeBook(newBook);
    }
    catch (e) {
        next(e);
    }
});
