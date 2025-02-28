import { Router } from "express";
import { body, validationResult } from "express-validator";
import { writeBook } from "../serverFunctions.js";
export const newBookRouter = Router();
const newBookValidation = [
    body('title').isString(),
    body('writer').isString(),
];
newBookRouter.post('/books/new', newBookValidation, async (req, res, next) => {
    const newBook = req.body;
    try {
        const errors = validationResult(req);
        if (errors.array().length > 0) {
            res.status(400).json({ errors: errors.array() });
            throw new Error('Invalid input');
        }
        await writeBook(newBook);
        res.json({ message: 'Book added', newBook });
    }
    catch (e) {
        next(e);
    }
});
